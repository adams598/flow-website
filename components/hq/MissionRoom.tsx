'use client'

import { useEffect, useState } from 'react'
import type { Mission } from '@/lib/hq/types'
import { HqShell } from './HqShell'
import { HqMarkdown } from './HqMarkdown'

export function MissionRoom({ initialMission }: { initialMission: Mission }) {
  const [mission, setMission] = useState(initialMission)

  useEffect(() => {
    if (mission.status !== 'running') return
    const t = setInterval(async () => {
      const res = await fetch(`/api/hq/missions?id=${mission.id}`)
      if (!res.ok) return
      const data = (await res.json()) as { mission: Mission }
      setMission(data.mission)
      if (data.mission.status !== 'running') clearInterval(t)
    }, 2000)
    return () => clearInterval(t)
  }, [mission.id, mission.status])

  return (
    <HqShell>
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="font-label text-xs uppercase tracking-widest text-primary-container mb-2">
          War room
        </p>
        <h1 className="font-headline text-2xl font-bold mb-2">Mission en cours</h1>
        <p className="text-on-surface-variant">{mission.brief}</p>
        <p className="text-xs mt-2">
          Statut :{' '}
          <span
            className={
              mission.status === 'running'
                ? 'text-primary-fixed'
                : mission.status === 'done'
                  ? 'text-secondary'
                  : 'text-error'
            }
          >
            {mission.status === 'running' ? 'En cours' : mission.status === 'done' ? 'Terminée' : 'Erreur'}
          </span>
        </p>
      </header>

      <div className="space-y-4">
        {mission.tasks.map((task) => (
          <section
            key={task.id}
            className="rounded-xl border border-outline-variant/20 p-4 bg-surface-container-low/60"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-headline font-semibold">{task.agentName}</h2>
                {task.detail && (
                  <p className="text-xs text-on-surface-variant mt-0.5">{task.detail}</p>
                )}
              </div>
              <span
                className={`text-xs font-label px-2 py-1 rounded-full ${
                  task.status === 'running'
                    ? 'bg-primary-container/20 text-primary-fixed'
                    : task.status === 'done'
                      ? 'bg-secondary/20 text-secondary'
                      : task.status === 'error'
                        ? 'bg-error/20 text-error'
                        : 'bg-surface-container-high'
                }`}
              >
                {task.status === 'running'
                  ? 'En cours'
                  : task.status === 'done'
                    ? 'Livré'
                    : task.status === 'error'
                      ? 'Erreur'
                      : 'En attente'}
              </span>
            </div>
            {task.status === 'running' || task.status === 'pending' ? (
              <p className="text-sm text-on-surface-variant animate-pulse">Travail en cours…</p>
            ) : task.error ? (
              <p className="text-sm text-error">{task.error}</p>
            ) : (
              <HqMarkdown content={task.output ?? ''} />
            )}
          </section>
        ))}
      </div>

      {mission.summary && mission.status !== 'running' && (
        <section className="mt-8 glass-panel rounded-xl border border-primary-container/30 p-5">
          <h2 className="font-label text-xs uppercase tracking-widest text-primary-container mb-3">
            Synthèse COO (Victor)
          </h2>
          <HqMarkdown content={mission.summary} />
        </section>
      )}
    </div>
    </HqShell>
  )
}
