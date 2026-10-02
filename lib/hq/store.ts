import { promises as fs } from 'fs'
import path from 'path'
import type { AgentThread, ChatTurn, HqAgentId, PipelineStats } from './types'

/** État local de HQ (gitignoré). */
const DATA_DIR = path.join(process.cwd(), 'data', 'hq')
const CRM_FILE = path.join(process.cwd(), 'data', 'prospection', 'crm.jsonl')

function threadFile(agentId: HqAgentId) {
  return path.join(DATA_DIR, 'threads', `${agentId}.json`)
}

export async function getThread(agentId: HqAgentId): Promise<AgentThread> {
  try {
    return JSON.parse(await fs.readFile(threadFile(agentId), 'utf-8')) as AgentThread
  } catch {
    return { turns: [] }
  }
}

async function saveThread(agentId: HqAgentId, thread: AgentThread): Promise<void> {
  await fs.mkdir(path.dirname(threadFile(agentId)), { recursive: true })
  await fs.writeFile(
    threadFile(agentId),
    JSON.stringify({ ...thread, turns: thread.turns.slice(-200) }, null, 2),
    'utf-8'
  )
}

export async function appendTurn(
  agentId: HqAgentId,
  turn: Omit<ChatTurn, 'id' | 'at'>,
  sessionId?: string
): Promise<ChatTurn> {
  const thread = await getThread(agentId)
  const full: ChatTurn = { ...turn, id: crypto.randomUUID(), at: new Date().toISOString() }
  thread.turns.push(full)
  if (sessionId) thread.sessionId = sessionId
  await saveThread(agentId, thread)
  return full
}

export async function setSession(agentId: HqAgentId, sessionId: string | undefined): Promise<void> {
  const thread = await getThread(agentId)
  thread.sessionId = sessionId
  await saveThread(agentId, thread)
}

/** Nouvelle conversation : l'historique affiché est archivé, la session Claude repart de zéro. */
export async function resetThread(agentId: HqAgentId): Promise<void> {
  const thread = await getThread(agentId)
  if (thread.turns.length) {
    const archive = path.join(DATA_DIR, 'archive', `${agentId}-${Date.now()}.json`)
    await fs.mkdir(path.dirname(archive), { recursive: true })
    await fs.writeFile(archive, JSON.stringify(thread, null, 2), 'utf-8')
  }
  await saveThread(agentId, { turns: [] })
}

/** Chiffres du CRM de prospection pour le tableau de bord. */
export async function getPipelineStats(): Promise<PipelineStats | null> {
  let raw: string
  try {
    raw = await fs.readFile(CRM_FILE, 'utf-8')
  } catch {
    return null
  }
  const rows = raw
    .split(/\r?\n/)
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as Record<string, unknown>]
      } catch {
        return []
      }
    })
  const today = new Date().toISOString().slice(0, 10)
  const byStatus: Record<string, number> = {}
  const byPalier = { express: 0, projet: 0 }
  const hotStatuses = ['repondu', 'interesse', 'rdv', 'appel_fait', 'proposition']
  const hot: PipelineStats['hot'] = []
  let contactedToday = 0

  for (const r of rows) {
    const statut = String(r.statut ?? 'inconnu')
    byStatus[statut] = (byStatus[statut] ?? 0) + 1
    if (r.palier === 'express') byPalier.express++
    if (r.palier === 'projet') byPalier.projet++
    if (r.envoye_le === today) contactedToday++
    if (hotStatuses.includes(statut)) {
      hot.push({ id: String(r.id), entreprise: String(r.entreprise), statut })
    }
  }
  return { total: rows.length, byStatus, byPalier, contactedToday, hot }
}
