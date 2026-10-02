import { spawn } from 'child_process'
import path from 'path'
import { loadAgent } from './agents'
import { appendTurn, getThread, setSession } from './store'
import type { AgentLiveState, ChatTurn, HqAgentId, StreamEvent } from './types'

/**
 * Fait tourner un agent Claude Code (`.claude/agents/<id>.md`) en mode non interactif
 * et relaie son activité. HQ doit donc tourner en local (`npm run dev`) sur une machine
 * où Claude Code est installé et connecté.
 */

const CLAUDE_BIN = process.env.HQ_CLAUDE_BIN?.trim() || 'claude'
const MAX_RUN_MS = 45 * 60 * 1000

/** Écriture limitée au dossier de prospection ; pas de shell, pas de secrets. */
const WRITE_SCOPE = 'data/prospection/**'
const DISALLOWED = ['Bash', 'Read(./.env*)', 'Read(./.env)']

type Live = Record<string, AgentLiveState>
const globalLive = globalThis as unknown as { __hqLive?: Live }
const live: Live = (globalLive.__hqLive ??= {})

export function getLiveState(agentId: HqAgentId): AgentLiveState {
  return live[agentId] ?? { running: false, steps: [] }
}

function allowedTools(tools: string[]): string {
  return tools
    .flatMap((t) => (t === 'Write' || t === 'Edit' ? [`${t}(${WRITE_SCOPE})`] : [t]))
    .join(',')
}

function describeTool(name: string, input: Record<string, unknown>): string {
  const file = typeof input.file_path === 'string' ? path.basename(input.file_path) : ''
  switch (name) {
    case 'WebSearch':
      return `Recherche web : ${String(input.query ?? '')}`
    case 'WebFetch':
      try {
        return `Lit la page ${new URL(String(input.url)).hostname}`
      } catch {
        return 'Lit une page web'
      }
    case 'Read':
      return `Lit ${file}`
    case 'Write':
      return `Écrit ${file}`
    case 'Edit':
      return `Met à jour ${file}`
    case 'Grep':
      return `Cherche « ${String(input.pattern ?? '')} »`
    case 'Glob':
      return `Parcourt ${String(input.pattern ?? '')}`
    default:
      return `Utilise ${name}`
  }
}

type RunResult = { text: string; steps: string[]; sessionId?: string; costUsd?: number; isError: boolean; raw: string }

function runOnce(
  agentId: HqAgentId,
  tools: string[],
  message: string,
  resume: string | undefined,
  emit: (e: StreamEvent) => void
): Promise<RunResult> {
  return new Promise((resolve) => {
    const args = [
      '-p',
      '--agent',
      agentId,
      '--output-format',
      'stream-json',
      '--verbose',
      '--permission-mode',
      'default',
      '--allowedTools',
      allowedTools(tools),
      '--disallowedTools',
      DISALLOWED.join(','),
    ]
    if (resume) args.push('--resume', resume)

    const child = spawn(CLAUDE_BIN, args, { cwd: process.cwd(), windowsHide: true })
    const texts: string[] = []
    const steps: string[] = []
    let sessionId: string | undefined
    let costUsd: number | undefined
    let finalText = ''
    let isError = false
    let buffer = ''
    let stderr = ''

    const timer = setTimeout(() => child.kill(), MAX_RUN_MS)

    child.stdout.on('data', (chunk: Buffer) => {
      buffer += chunk.toString('utf-8')
      let nl: number
      while ((nl = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, nl).trim()
        buffer = buffer.slice(nl + 1)
        if (!line) continue
        let evt: Record<string, unknown>
        try {
          evt = JSON.parse(line)
        } catch {
          continue
        }
        if (evt.type === 'system' && evt.subtype === 'init' && typeof evt.session_id === 'string') {
          sessionId = evt.session_id
        } else if (evt.type === 'assistant') {
          const content = (evt.message as { content?: Record<string, unknown>[] })?.content ?? []
          for (const block of content) {
            if (block.type === 'text' && typeof block.text === 'string' && block.text.trim()) {
              texts.push(block.text)
              emit({ type: 'text', text: block.text })
            } else if (block.type === 'tool_use') {
              const label = describeTool(String(block.name), (block.input ?? {}) as Record<string, unknown>)
              steps.push(label)
              live[agentId] = { ...getLiveState(agentId), steps: [...getLiveState(agentId).steps, label].slice(-30) }
              emit({ type: 'step', label })
            }
          }
        } else if (evt.type === 'result') {
          if (typeof evt.session_id === 'string') sessionId = evt.session_id
          if (typeof evt.total_cost_usd === 'number') costUsd = evt.total_cost_usd
          if (typeof evt.result === 'string') finalText = evt.result
          isError = evt.is_error === true || evt.subtype !== 'success'
        }
      }
    })
    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString('utf-8')
    })
    child.on('error', (err: NodeJS.ErrnoException) => {
      clearTimeout(timer)
      const hint =
        err.code === 'ENOENT'
          ? 'Claude Code est introuvable. Lance HQ en local (npm run dev) sur la machine où Claude Code est installé, ou renseigne HQ_CLAUDE_BIN.'
          : err.message
      resolve({ text: hint, steps, isError: true, raw: hint })
    })
    child.on('close', () => {
      clearTimeout(timer)
      const text = texts.join('\n\n').trim() || finalText.trim()
      resolve({
        text: text || stderr.trim().slice(0, 600) || 'Aucune réponse de l’agent.',
        steps,
        sessionId,
        costUsd,
        isError: isError || (!text && !finalText),
        raw: `${finalText}\n${stderr}`,
      })
    })

    child.stdin.write(message)
    child.stdin.end()
  })
}

/** Envoie un message d'Adams à un agent et renvoie la réponse enregistrée. */
export async function runAgent(
  agentId: HqAgentId,
  message: string,
  emit: (e: StreamEvent) => void
): Promise<ChatTurn> {
  if (getLiveState(agentId).running) {
    throw new Error('Cet agent travaille déjà sur une demande. Attends sa réponse.')
  }
  live[agentId] = { running: true, startedAt: new Date().toISOString(), steps: [] }
  try {
    const agent = await loadAgent(agentId)
    await appendTurn(agentId, { role: 'adams', content: message })
    emit({ type: 'start' })

    const thread = await getThread(agentId)
    let result = await runOnce(agentId, agent.tools, message, thread.sessionId, emit)

    // Session Claude introuvable (supprimée) : on repart sur une nouvelle conversation.
    if (result.isError && thread.sessionId && /no conversation found|session/i.test(result.raw)) {
      await setSession(agentId, undefined)
      result = await runOnce(agentId, agent.tools, message, undefined, emit)
    }

    return await appendTurn(
      agentId,
      {
        role: 'agent',
        content: result.text,
        steps: result.steps,
        costUsd: result.costUsd,
        error: result.isError || undefined,
      },
      result.sessionId
    )
  } finally {
    live[agentId] = { running: false, steps: getLiveState(agentId).steps }
    syncDrive()
  }
}

/** Recopie la prospection vers le Drive d'Adams (script local, gitignoré). Sans effet s'il est absent. */
function syncDrive() {
  const script = path.join(process.cwd(), 'data', 'prospection', 'outils', 'export_drive.py')
  const child = spawn(process.env.HQ_PYTHON_BIN?.trim() || 'python', [script], { cwd: process.cwd(), windowsHide: true })
  child.on('error', () => {})
}
