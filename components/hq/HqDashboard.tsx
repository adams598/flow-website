'use client'

import { useEffect, useMemo, useState } from 'react'
import { HQ_AGENTS } from '@/lib/hq/org'
import type {
  ActivityItem,
  AgentPresence,
  CompanyState,
  CooMessage,
  Mission,
  WeekPlan,
} from '@/lib/hq/types'
import { AgentCard } from './AgentCard'
import { CooDesk } from './CooDesk'
import { CuteAvatar, HqShell } from './HqShell'
import { LiveOpsBoard } from './LiveOpsBoard'

type Props = {
  company: CompanyState
  weekPlan: WeekPlan | null
  activity: ActivityItem[]
  missions: Mission[]
  cooThread: CooMessage[]
  presence: AgentPresence[]
}

export function HqDashboard({
  company: initialCompany,
  weekPlan: initialWeek,
  activity: initialActivity,
  missions: initialMissions,
  cooThread: initialThread,
  presence: initialPresence,
}: Props) {
  const [company, setCompany] = useState(initialCompany)
  const [weekPlan, setWeekPlan] = useState(initialWeek)
  const [activity, setActivity] = useState(initialActivity)
  const [missions, setMissions] = useState(initialMissions)
  const [cooThread, setCooThread] = useState(initialThread)
  const [presence, setPresence] = useState(initialPresence)
  const [liveAt, setLiveAt] = useState<string | null>(null)

  const coo = HQ_AGENTS.find((a) => a.id === 'coo')!
  const team = HQ_AGENTS.filter((a) => a.id !== 'coo')
  const workingIds = useMemo(
    () => new Set(presence.filter((p) => p.status === 'working').map((p) => p.agentId)),
    [presence]
  )

  useEffect(() => {
    let cancelled = false
    let ticks = 0

    async function refresh(withBriefing: boolean) {
      const res = await fetch(`/api/hq/state${withBriefing ? '?briefing=1' : ''}`)
      if (!res.ok || cancelled) return
      const data = (await res.json()) as {
        company: CompanyState
        weekPlan: WeekPlan | null
        activity: ActivityItem[]
        missions: Mission[]
        cooThread: CooMessage[]
        presence: AgentPresence[]
      }
      setCompany(data.company)
      setWeekPlan(data.weekPlan)
      setActivity(data.activity)
      setMissions(data.missions)
      setCooThread(data.cooThread)
      setPresence(data.presence)
      setLiveAt(new Date().toLocaleTimeString('fr-FR'))
    }

    void refresh(true)
    void fetch('/api/hq/tick')

    const id = setInterval(() => {
      ticks += 1
      // Briefing check ~ toutes les 2 min (30 × 4 s)
      void refresh(ticks % 30 === 0)
    }, 4000)

    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const live = useMemo(() => activity.slice(0, 6), [activity])

  return (
    <HqShell>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-10">
        <p className="text-center text-sm text-on-surface-variant">
          Un manager. Une équipe. Ils communiquent entre eux — tu parles surtout à Victor.
          {liveAt ? (
            <span className="block text-xs mt-1 text-primary-container/80">Live · {liveAt}</span>
          ) : null}
        </p>

        <section className="rounded-3xl border border-primary-container/30 bg-gradient-to-b from-primary-container/10 to-transparent p-6 md:p-8">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-primary-container text-center mb-4">
            Agent principal
          </p>
          <div className="flex flex-col items-center mb-6">
            <CuteAvatar agentId="coo" name={coo.name} size={120} working={workingIds.has('coo')} />
            <h1 className="font-headline text-3xl font-bold mt-3">{coo.name}</h1>
            <p className="text-primary-container font-label">{coo.title}</p>
            <p className="text-xs text-on-surface-variant mt-1 max-w-md text-center">
              {presence.find((p) => p.agentId === 'coo')?.detail ?? 'Orchestre les équipes'}
            </p>
          </div>
          <CooDesk thread={cooThread} onThreadChange={setCooThread} />
        </section>

        <LiveOpsBoard presence={presence} missions={missions} />

        {weekPlan && (
          <p className="text-center text-sm text-on-surface-variant">
            Semaine du {weekPlan.weekOf} · trésorerie Indy {company.goals.treasury.toFixed(2)} € ·{' '}
            {live[0] ? `${live[0].agentName} — ${live[0].message}` : 'équipe en place'}
          </p>
        )}

        <section>
          <h2 className="font-headline text-2xl font-bold text-center mb-2">Mon équipe</h2>
          <p className="text-center text-sm text-on-surface-variant mb-6">
            Clique un visage pour ouvrir son bureau (chat, plan, livrables).
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {team.map((a) => {
              const p = presence.find((x) => x.agentId === a.id)
              return (
                <AgentCard
                  key={a.id}
                  agent={a}
                  status={p?.status === 'working' ? 'working' : 'idle'}
                  detail={p?.detail}
                />
              )
            })}
          </div>
        </section>
      </div>
    </HqShell>
  )
}
