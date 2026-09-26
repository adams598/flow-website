import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { HQ_AGENT_MAP } from '@/lib/hq/org'
import { goalsBrief } from '@/lib/hq/goals'
import { runAgentTask } from '@/lib/hq/llm'
import { startMission } from '@/lib/hq/runtime'
import {
  appendActivity,
  appendCooMessage,
  getCompany,
  getCooThread,
  getWeekPlan,
  listDecisions,
  listHandoffs,
  listMissions,
} from '@/lib/hq/store'

export const runtime = 'nodejs'
export const maxDuration = 300

export async function GET() {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const thread = await getCooThread()
  return NextResponse.json({ thread })
}

export async function POST(request: Request) {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = (await request.json()) as { message?: string }
  const message = body.message?.trim() ?? ''
  if (!message) {
    return NextResponse.json({ error: 'Message vide' }, { status: 400 })
  }

  const [company, weekPlan, decisions, handoffs, missions, thread] = await Promise.all([
    getCompany(),
    getWeekPlan(),
    listDecisions(),
    listHandoffs(10),
    listMissions(8),
    getCooThread(),
  ])

  await appendCooMessage('adams', message)

  const history = thread
    .slice(-12)
    .map((m) => `${m.role === 'adams' ? 'Adams' : 'Victor'}: ${m.content}`)
    .join('\n')

  const prompt = `${goalsBrief(company.goals)}
Plan semaine: ${weekPlan?.summary ?? '(pas encore généré — tu le feras au prochain lundi / tick weekly)'}
Décisions en attente: ${decisions.filter((d) => d.status === 'pending').map((d) => d.title).join('; ') || 'aucune'}
Handoffs: ${handoffs.slice(0, 5).map((h) => `${h.fromName}→${h.toTeamId}: ${h.subject}`).join(' · ') || 'aucun'}
Missions récentes: ${missions.map((m) => `[${m.status}] ${m.brief.slice(0, 60)}`).join(' · ')}

Historique:
${history || '(début de conversation)'}

Adams: ${message}

Réponds comme Victor. Si Adams te donne une instruction opérationnelle, termine par une ligne ACTION: lancer mission | texte du brief pour les équipes. Sinon pas de ACTION.`

  const coo = HQ_AGENT_MAP.coo
  let reply = ''
  try {
    reply = await runAgentTask(coo, prompt)
  } catch (e) {
    reply = e instanceof Error ? e.message : 'Erreur COO'
  }

  await appendCooMessage('coo', reply)
  await appendActivity({
    agentId: 'coo',
    agentName: 'Victor',
    message: `Échange avec Adams : ${message.slice(0, 60)}${message.length > 60 ? '…' : ''}`,
  })

  const action = reply.split('\n').find((l) => l.toUpperCase().startsWith('ACTION:'))
  let missionId: string | undefined
  if (action) {
    const brief = action.replace(/^ACTION:\s*/i, '').replace(/^lancer mission\s*\|?\s*/i, '').trim()
    if (brief.length > 8) {
      missionId = await startMission(brief, 'coo')
    }
  }

  return NextResponse.json({ reply, missionId })
}
