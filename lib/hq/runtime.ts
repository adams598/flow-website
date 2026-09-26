import { HQ_AGENT_MAP, HQ_AGENTS, HQ_TEAMS, pickAgentsForBrief } from './org'
import { goalsBrief, mondayOf } from './goals'
import { runAgentTask } from './llm'
import {
  appendActivity,
  appendCooMessage,
  appendDecision,
  appendHandoff,
  getCompany,
  getMission,
  getWeekPlan,
  hasRunningMission,
  listDecisions,
  listHandoffs,
  listMissions,
  saveCompany,
  saveMission,
  saveWeekPlan,
} from './store'
import type { Mission, MissionSource, MissionTask, TeamId, WeekPlan } from './types'

const SHIFT_ROTATION: { name: string; ids: string[]; brief: string }[] = [
  {
    name: 'Croissance + Marketing',
    ids: ['sales-director', 'sdr', 'cmo', 'com-planner'],
    brief:
      'Shift commercial + marque : pipeline, 5 cibles B2B, messages de prise de contact (brouillons), plan contenu LinkedIn de la semaine (brouillons). Objectif : alimenter le CA du mois.',
  },
  {
    name: 'Client + Intelligence',
    ids: ['inbox', 'cs', 'research', 'analyst'],
    brief:
      'Shift client + data : qualification leads type formulaire Flow, suivi CS, veille marché digital PME, KPI vs objectifs CA. Signaler tout deal chaud au COO.',
  },
  {
    name: 'Delivery + Finance',
    ids: ['head-product', 'architect', 'pm', 'finance'],
    brief:
      'Shift delivery + offre : packager 3 offres vendables (site / app / plateforme) avec fourchettes, parcours MVP, arguments de closing pour l’AE. Rien n’est signé sans Adams.',
  },
  {
    name: 'Partenariats + Page Flow',
    ids: ['partnerships', 'content-flow', 'ae', 'seo'],
    brief:
      'Shift réseau : 5 profils partenaires, 1 post page Flow, angles closing, SEO pages services. Tout reste en brouillon.',
  },
]

function shiftIndex(date = new Date()): number {
  return Math.floor(date.getUTCHours() / 6) % SHIFT_ROTATION.length
}

export async function startMission(
  brief: string,
  source: MissionSource,
  agentIds?: string[],
  wait = false
): Promise<string> {
  const agents = agentIds
    ? ['coo', ...agentIds].map((id) => HQ_AGENT_MAP[id]).filter(Boolean)
    : pickAgentsForBrief(brief)

  const unique = [...new Map(agents.map((a) => [a.id, a])).values()]
  const id = crypto.randomUUID()
  const tasks: MissionTask[] = unique.map((a) => ({
    id: crypto.randomUUID(),
    agentId: a.id,
    agentName: a.name,
    status: 'pending',
  }))

  const mission: Mission = {
    id,
    brief,
    status: 'running',
    createdAt: new Date().toISOString(),
    source,
    tasks,
  }
  await saveMission(mission)
  if (wait) {
    await runMission(id, brief)
  } else {
    void runMission(id, brief)
  }
  return id
}

export async function runMission(missionId: string, brief: string): Promise<void> {
  const coo = HQ_AGENT_MAP.coo
  let mission = await getMission(missionId)
  if (!mission) return

  const company = await getCompany()
  const weekPlan = await getWeekPlan()
  const handoffs = await listHandoffs(8)
  const context = `${goalsBrief(company.goals)}
${weekPlan ? `\nPlan semaine (lundi ${weekPlan.weekOf}) :\n${weekPlan.summary}` : ''}
Handoffs récents :
${handoffs.map((h) => `- ${h.fromName} → ${h.toTeamId} : ${h.subject}`).join('\n') || '(aucun)'}`

  const specialists = mission.tasks.filter((t) => t.agentId !== 'coo')

  // Victor planifie — visible en live
  mission = {
    ...mission,
    tasks: mission.tasks.map((t) =>
      t.agentId === 'coo'
        ? {
            ...t,
            status: 'running' as const,
            detail: 'Écrit le plan d’exécution',
            startedAt: new Date().toISOString(),
          }
        : { ...t, status: 'pending' as const, detail: 'En attente du plan COO' }
    ),
  }
  await saveMission(mission)
  await appendActivity({
    agentId: coo.id,
    agentName: coo.name,
    message: `Mission ${mission.source ?? 'ceo'} lancée — planification`,
  })
  await appendCooMessage(
    'coo',
    `### Point mission\n**Lancement** — ${brief.slice(0, 160)}${brief.length > 160 ? '…' : ''}\n\nÉquipe : ${specialists.map((t) => t.agentName).join(', ') || 'Victor seul'}.\nJe prépare le plan, puis je lance chacun.`,
    'briefing'
  )

  const planPrompt = `Brief:\n${brief}\n\nExperts : ${specialists.map((t) => t.agentName).join(', ') || 'toi seul'}.
Contexte entreprise:\n${context}
Rédige un plan d'exécution (5-8 lignes) + consignes par expert. N'implique Adams que si publication / envoi / prix.`

  let plan = ''
  try {
    plan = await runAgentTask(coo, planPrompt)
  } catch {
    plan = `Plan : exécuter le brief — ${brief}`
  }

  mission = await getMission(missionId)
  if (!mission) return
  mission = {
    ...mission,
    tasks: mission.tasks.map((t) =>
      t.agentId === 'coo'
        ? {
            ...t,
            status: 'done' as const,
            detail: 'Plan prêt — supervision',
            finishedAt: new Date().toISOString(),
            output: plan,
          }
        : t
    ),
  }
  await saveMission(mission)
  await appendCooMessage(
    'coo',
    `### Point mission\n**Plan prêt.** Les experts démarrent.\n\n${plan.slice(0, 500)}${plan.length > 500 ? '…' : ''}`,
    'briefing'
  )

  const results: MissionTask[] = []
  for (const task of specialists) {
    const agent = HQ_AGENT_MAP[task.agentId]
    const startedAt = new Date().toISOString()
    mission = (await getMission(missionId))!
    mission = {
      ...mission,
      tasks: mission.tasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              status: 'running',
              detail: `En train de produire — ${agent?.title ?? t.agentName}`,
              startedAt,
            }
          : t
      ),
    }
    await saveMission(mission)

    if (!agent) {
      const failed = {
        ...task,
        status: 'error' as const,
        error: 'Agent inconnu',
        finishedAt: new Date().toISOString(),
        detail: 'Agent inconnu',
      }
      results.push(failed)
      mission = (await getMission(missionId))!
      mission = {
        ...mission,
        tasks: mission.tasks.map((t) => (t.id === task.id ? failed : t)),
      }
      await saveMission(mission)
      continue
    }

    await appendActivity({
      agentId: agent.id,
      agentName: agent.name,
      message: `En mission — ${agent.title}`,
    })

    let updated: MissionTask
    try {
      const output = await runAgentTask(
        agent,
        `Brief:\n${brief}\n\nPlan COO:\n${plan}\n\nContexte:\n${context}\n\nLivrable actionnable. Termine par une ligne HANDOFF: équipe-cible | sujet | message (pour une autre équipe Flow).`
      )
      await maybeHandoff(agent.id, agent.name, agent.teamId, output)
      updated = {
        ...task,
        status: 'done',
        output,
        startedAt,
        finishedAt: new Date().toISOString(),
        detail: 'Livrable prêt',
      }
      await appendActivity({
        agentId: agent.id,
        agentName: agent.name,
        message: `Livrable terminé — ${agent.title}`,
      })
    } catch (e) {
      const err = e instanceof Error ? e.message : 'Erreur'
      updated = {
        ...task,
        status: 'error',
        error: err,
        startedAt,
        finishedAt: new Date().toISOString(),
        detail: err.slice(0, 80),
      }
    }

    results.push(updated)
    mission = (await getMission(missionId))!
    mission = {
      ...mission,
      tasks: mission.tasks.map((t) => (t.id === task.id ? updated : t)),
    }
    await saveMission(mission)

    const doneCount = results.filter((r) => r.status === 'done' || r.status === 'error').length
    const total = specialists.length
    await appendCooMessage(
      'coo',
      `### Point mission (${doneCount}/${total})\n**${agent.name}** : ${updated.status === 'done' ? 'terminé' : 'bloqué'}.\n${updated.status === 'error' ? updated.error : `Extrait : ${(updated.output ?? '').slice(0, 280)}${(updated.output?.length ?? 0) > 280 ? '…' : ''}`}`,
      'briefing'
    )
  }

  let cooOutput = plan
  mission = (await getMission(missionId))!
  mission = {
    ...mission,
    tasks: mission.tasks.map((t) =>
      t.agentId === 'coo'
        ? {
            ...t,
            status: 'running',
            detail: 'Synthèse + décisions Adams',
            startedAt: new Date().toISOString(),
          }
        : t
    ),
  }
  await saveMission(mission)

  try {
    cooOutput = await runAgentTask(
      coo,
      `Synthèse interne (pas un rapport pour Adams sauf si décision requise).
Brief: ${brief}
${results.map((r) => `## ${r.agentName}\n${r.output ?? r.error ?? '—'}`).join('\n\n')}

Si Adams doit valider (publier / envoyer / prix / stratégie), commence une ligne par DECISION: kind|titre|détail
kind = publish|send|price|strategy. Sinon n'écris pas DECISION.`
    )
  } catch {
    cooOutput = plan
  }

  await maybeDecision(cooOutput)

  const finalTasks: MissionTask[] = mission.tasks.map((t) => {
    if (t.agentId === 'coo') {
      return {
        ...t,
        status: 'done',
        output: cooOutput,
        finishedAt: new Date().toISOString(),
        detail: 'Synthèse envoyée',
      }
    }
    return results.find((r) => r.id === t.id) ?? t
  })
  const hasError = finalTasks.some((t) => t.status === 'error')
  await saveMission({
    ...mission,
    tasks: finalTasks,
    status: hasError ? 'error' : 'done',
    summary: cooOutput.slice(0, 1200),
  })
  await appendActivity({
    agentId: coo.id,
    agentName: coo.name,
    message: hasError ? 'Mission terminée avec erreurs' : 'Mission terminée — équipes alignées',
  })
  await appendCooMessage(
    'coo',
    `### Point mission — clôture\n**Statut :** ${hasError ? 'terminée avec erreurs' : 'terminée'}\n\n${cooOutput.slice(0, 900)}${cooOutput.length > 900 ? '…' : ''}`,
    'briefing'
  )
}

const TEAM_HINT: Record<string, TeamId> = {
  croissance: 'croissance',
  sales: 'croissance',
  commercial: 'croissance',
  marketing: 'marketing',
  com: 'marketing',
  delivery: 'delivery',
  produit: 'delivery',
  client: 'client',
  finance: 'finance',
  legal: 'finance',
  intelligence: 'intelligence',
  veille: 'intelligence',
  direction: 'direction',
}

async function maybeHandoff(
  fromAgentId: string,
  fromName: string,
  fromTeam: TeamId,
  output: string
) {
  const line = output.split('\n').find((l) => l.toUpperCase().startsWith('HANDOFF:'))
  if (!line) {
    const next = nextTeam(fromTeam)
    await appendHandoff({
      fromAgentId,
      fromName,
      toTeamId: next,
      subject: `Suite ${fromName}`,
      body: output.slice(0, 400),
    })
    return
  }
  const rest = line.replace(/^HANDOFF:\s*/i, '')
  const [rawTeam, subject, ...bodyParts] = rest.split('|').map((s) => s.trim())
  const key = (rawTeam || '').toLowerCase()
  const toTeamId = TEAM_HINT[key] ?? nextTeam(fromTeam)
  await appendHandoff({
    fromAgentId,
    fromName,
    toTeamId,
    subject: subject || 'Handoff',
    body: bodyParts.join(' | ') || output.slice(0, 400),
  })
}

function nextTeam(from: TeamId): TeamId {
  const order: TeamId[] = HQ_TEAMS.map((t) => t.id)
  const i = order.indexOf(from)
  return order[(i + 1) % order.length] ?? 'direction'
}

async function maybeDecision(cooOutput: string) {
  const line = cooOutput.split('\n').find((l) => l.toUpperCase().startsWith('DECISION:'))
  if (!line) return
  const rest = line.replace(/^DECISION:\s*/i, '')
  const [kindRaw, title, ...body] = rest.split('|').map((s) => s.trim())
  const kind = ['publish', 'send', 'price', 'strategy'].includes(kindRaw)
    ? (kindRaw as 'publish' | 'send' | 'price' | 'strategy')
    : 'strategy'
  await appendDecision({
    kind,
    title: title || 'Décision COO',
    body: body.join(' | ') || cooOutput.slice(0, 500),
  })
  await appendActivity({
    agentId: 'coo',
    agentName: 'Victor',
    message: `Décision pour Adams : ${title || kind}`,
  })
}

export async function generateWeeklyPlan(): Promise<WeekPlan> {
  const company = await getCompany()
  const coo = HQ_AGENT_MAP.coo
  const weekOf = mondayOf()
  const prompt = `${goalsBrief(company.goals)}

C'est lundi (ou reset hebdo). Propose le plan de la semaine Flow.
Réponds en JSON strict (pas de markdown) :
{"summary":"texte 8-12 lignes pour Adams","priorities":[{"teamId":"croissance","ownerId":"sales-director","objective":"..."}],"needsAdams":["uniquement si vraiment bloquant"]}
teamId parmi: direction,croissance,marketing,delivery,client,finance,intelligence.
Une priorité par équipe. Objectifs chiffrés liés au CA du mois.`

  let parsed: Partial<WeekPlan> = {}
  try {
    const raw = await runAgentTask(coo, prompt)
    const json = raw.match(/\{[\s\S]*\}/)?.[0]
    if (json) parsed = JSON.parse(json) as Partial<WeekPlan>
  } catch {
    /* fallback below */
  }

  const plan: WeekPlan = {
    weekOf,
    createdAt: new Date().toISOString(),
    summary:
      parsed.summary ||
      `Semaine du ${weekOf}. Priorité : combler l'écart CA mensuel (${goalsBrief(company.goals).split('\n')[4]}). Victor enchaîne les shifts croissance / marketing / client sans attendre Adams, sauf publication ou envoi.`,
    priorities:
      parsed.priorities && parsed.priorities.length
        ? parsed.priorities
        : HQ_TEAMS.map((t) => {
            const owner = HQ_AGENTS.find((a) => a.teamId === t.id)
            return {
              teamId: t.id,
              ownerId: owner?.id ?? 'coo',
              objective: `Contribuer au CA mensuel — ${t.label}`,
            }
          }),
    needsAdams: parsed.needsAdams ?? [],
  }

  await saveWeekPlan(plan)
  const state = await getCompany()
  await saveCompany({ ...state, lastWeeklyAt: new Date().toISOString() })
  await appendActivity({
    agentId: 'coo',
    agentName: 'Victor',
    message: `Plan de la semaine du ${weekOf} prêt`,
  })

  for (const need of plan.needsAdams) {
    await appendDecision({
      kind: 'strategy',
      title: 'Point semaine — Adams',
      body: need,
    })
  }

  return plan
}

export async function runAutonomousTick(mode: 'shift' | 'weekly'): Promise<{
  ok: boolean
  skipped?: string
  missionId?: string
  weekOf?: string
  shift?: string
}> {
  const company = await getCompany()
  if (!company.autonomyEnabled) {
    return { ok: false, skipped: 'autonomie désactivée' }
  }

  if (mode === 'weekly') {
    const plan = await generateWeeklyPlan()
    if (await hasRunningMission()) {
      return { ok: true, weekOf: plan.weekOf, skipped: 'plan ok, mission déjà en cours' }
    }
    const missionId = await startMission(
      `Exécute le plan de la semaine du ${plan.weekOf}.\n${plan.summary}\nPriorités:\n${plan.priorities.map((p) => `- ${p.teamId}: ${p.objective}`).join('\n')}`,
      'autonomous',
      undefined,
      true
    )
    await saveCompany({
      ...(await getCompany()),
      lastTickAt: new Date().toISOString(),
      lastShift: 'weekly-kickoff',
    })
    return { ok: true, weekOf: plan.weekOf, missionId, shift: 'weekly-kickoff' }
  }

  const weekOf = mondayOf()
  const existing = await getWeekPlan()
  if (!existing || existing.weekOf !== weekOf) {
    await generateWeeklyPlan()
  }

  if (await hasRunningMission()) {
    await postStatusBriefing(false)
    return { ok: true, skipped: 'mission déjà en cours' }
  }

  const recent = await listMissions(6)
  const shift = SHIFT_ROTATION[shiftIndex()]
  const already = recent.some((m) => m.brief.includes(shift.name) && m.status === 'done')
  const chosen = already ? SHIFT_ROTATION[(shiftIndex() + 1) % SHIFT_ROTATION.length] : shift

  const week = (await getWeekPlan())!
  const missionId = await startMission(
    `[Shift autonome ${chosen.name} — ${new Date().toISOString()}]\n${chosen.brief}\n\nPlan semaine:\n${week.summary}`,
    'autonomous',
    chosen.ids,
    true
  )

  await saveCompany({
    ...(await getCompany()),
    lastTickAt: new Date().toISOString(),
    lastShift: chosen.name,
  })

  // Point d’avancement après chaque shift
  await postStatusBriefing(true)

  return { ok: true, missionId, shift: chosen.name }
}

export function isTickStale(lastTickAt?: string, hours = 4): boolean {
  if (!lastTickAt) return true
  return Date.now() - new Date(lastTickAt).getTime() > hours * 3600 * 1000
}

export function isBriefingStale(lastBriefingAt?: string, hours = 2): boolean {
  if (!lastBriefingAt) return true
  return Date.now() - new Date(lastBriefingAt).getTime() > hours * 3600 * 1000
}

/** Point régulier de Victor : où en sont les missions / l’équipe. */
export async function postStatusBriefing(force = false): Promise<{ ok: boolean; skipped?: string }> {
  const company = await getCompany()
  if (!force && !isBriefingStale(company.lastBriefingAt, 2)) {
    return { ok: true, skipped: 'briefing trop récent' }
  }

  const [missions, weekPlan, decisions, handoffs] = await Promise.all([
    listMissions(8),
    getWeekPlan(),
    listDecisions(),
    listHandoffs(6),
  ])

  const running = missions.filter((m) => m.status === 'running')
  const recent = missions.filter((m) => m.status !== 'running').slice(0, 3)
  const pendingDecisions = decisions.filter((d) => d.status === 'pending')

  const coo = HQ_AGENT_MAP.coo
  const facts = `Missions en cours:
${
  running
    .map((m) => {
      const parts = m.tasks
        .map((t) => `  - ${t.agentName}: ${t.status}${t.detail ? ` (${t.detail})` : ''}`)
        .join('\n')
      return `- [${m.id.slice(0, 8)}] ${m.brief.slice(0, 100)}\n${parts}`
    })
    .join('\n') || '(aucune)'
}

Missions récentes:
${recent.map((m) => `- [${m.status}] ${m.brief.slice(0, 80)}`).join('\n') || '(aucune)'}

Plan semaine: ${weekPlan?.summary?.slice(0, 300) ?? 'pas encore'}
Décisions Adams en attente: ${pendingDecisions.map((d) => d.title).join('; ') || 'aucune'}
Handoffs: ${handoffs.slice(0, 4).map((h) => `${h.fromName}→${h.toTeamId}: ${h.subject}`).join(' · ') || 'aucun'}
Dernier shift: ${company.lastShift ?? '—'}
${goalsBrief(company.goals)}`

  let text = ''
  try {
    text = await runAgentTask(
      coo,
      `${facts}

Tu es Victor. Rédige un POINT D'AVANCEMENT court pour Adams (markdown, 8-14 lignes) :
- où en est chaque mission active (qui travaille, qui a livré)
- ce qui avance vers le CA du mois
- ce dont tu as besoin d'Adams UNIQUEMENT si vraiment bloquant
Pas de blabla. Ton direct, opérationnel.`
    )
  } catch {
    const lines = running.length
      ? running.map((m) => {
          const working = m.tasks.filter((t) => t.status === 'running').map((t) => t.agentName)
          const done = m.tasks.filter((t) => t.status === 'done').map((t) => t.agentName)
          return `- **${m.brief.slice(0, 70)}** — en cours : ${working.join(', ') || '—'} ; livré : ${done.join(', ') || '—'}`
        })
      : ['- Aucune mission active pour le moment.']
    text = `### Point d'avancement\n\n${lines.join('\n')}\n\nDernier shift : ${company.lastShift ?? '—'}.\nDécisions en attente : ${pendingDecisions.length}.`
  }

  await appendCooMessage('coo', text, 'briefing')
  await appendActivity({
    agentId: 'coo',
    agentName: 'Victor',
    message: 'Point d’avancement envoyé à Adams',
  })
  await saveCompany({
    ...(await getCompany()),
    lastBriefingAt: new Date().toISOString(),
  })
  return { ok: true }
}
