import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { HQ_AGENT_MAP } from '@/lib/hq/org'
import { runAgentTask } from '@/lib/hq/llm'
import { appendActivity, appendAgentTurn, getAgentThread, saveDeliverable } from '@/lib/hq/store'

export const runtime = 'nodejs'
export const maxDuration = 120

export async function GET(request: Request) {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const agentId = new URL(request.url).searchParams.get('agentId') ?? ''
  if (!HQ_AGENT_MAP[agentId]) {
    return NextResponse.json({ error: 'Agent inconnu' }, { status: 400 })
  }
  const thread = await getAgentThread(agentId)
  return NextResponse.json({ thread })
}

export async function POST(request: Request) {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = (await request.json()) as {
    agentId?: string
    message?: string
    mode?: 'plan' | 'execute'
  }
  const agentId = body.agentId ?? ''
  const message = body.message?.trim() ?? ''
  const mode = body.mode === 'execute' ? 'execute' : 'plan'
  const agent = HQ_AGENT_MAP[agentId]
  if (!agent || !message) {
    return NextResponse.json({ error: 'Agent ou message invalide' }, { status: 400 })
  }

  const prefix =
    mode === 'plan'
      ? `Adams te parle dans ton bureau. Propose d'abord un PLAN d'action numéroté (5-8 lignes), sans encore produire le livrable final. Termine par la ligne PLAN_PRET.\n\nDemande :\n`
      : `Adams a VALIDÉ le plan. Exécute maintenant et livre le résultat actionnable (brouillon). Ne redemande pas de validation.\n\nDemande / plan validé :\n`

  try {
    await appendAgentTurn(agentId, { role: 'adams', content: message, kind: 'reply' })
    const reply = await runAgentTask(agent, prefix + message)
    const isPlan = mode === 'plan' || /PLAN_PRET/i.test(reply)
    await appendAgentTurn(agentId, {
      role: 'agent',
      content: reply.replace(/\n?PLAN_PRET\s*$/i, '').trim(),
      kind: isPlan && mode !== 'execute' ? 'plan' : 'reply',
    })
    if (mode === 'execute') {
      await saveDeliverable({
        agentId: agent.id,
        agentName: agent.name,
        title: message.slice(0, 80),
        body: reply,
      })
    }
    await appendActivity({
      agentId: agent.id,
      agentName: agent.name,
      message: mode === 'plan' ? `Plan proposé : ${message.slice(0, 50)}` : `Livrable : ${message.slice(0, 50)}`,
    })
    return NextResponse.json({
      reply: reply.replace(/\n?PLAN_PRET\s*$/i, '').trim(),
      kind: mode === 'execute' ? 'reply' : 'plan',
    })
  } catch (e) {
    const err = e instanceof Error ? e.message : 'Erreur'
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
