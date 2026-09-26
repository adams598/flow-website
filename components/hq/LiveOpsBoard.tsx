'use client'

import Link from 'next/link'
import { HQ_AGENTS, HQ_TEAMS } from '@/lib/hq/org'
import type { AgentPresence, Mission } from '@/lib/hq/types'
import { CuteAvatar } from './HqShell'

const STATUS_LABEL: Record<AgentPresence['status'], string> = {
  idle: 'Dispo',
  working: 'En cours',
  done: 'Livré',
  error: 'Erreur',
}

const STATUS_CLASS: Record<AgentPresence['status'], string> = {
  idle: 'text-on-surface-variant',
  working: 'text-primary-fixed',
  done: 'text-secondary',
  error: 'text-error',
}

type Props = {
  presence: AgentPresence[]
  missions: Mission[]
}

export function LiveOpsBoard({ presence, missions }: Props) {
  const running = missions.filter((m) => m.status === 'running')
  const byId = new Map(presence.map((p) => [p.agentId, p]))

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-label text-xs uppercase tracking-widest text-primary-container">Live</p>
          <h2 className="font-headline text-2xl font-bold">Où en est l&apos;équipe</h2>
        </div>
        <p className="text-xs text-on-surface-variant font-label">
          Rafraîchi toutes les 4 s
          {running.length > 0 ? ` · ${running.length} mission${running.length > 1 ? 's' : ''} active${running.length > 1 ? 's' : ''}` : ''}
        </p>
      </div>

      {running.length > 0 && (
        <ul className="space-y-3">
          {running.map((m) => {
            const total = m.tasks.length || 1
            const done = m.tasks.filter((t) => t.status === 'done' || t.status === 'error').length
            const pct = Math.round((done / total) * 100)
            return (
              <li
                key={m.id}
                className="rounded-2xl border border-primary-container/30 bg-primary-container/5 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <Link href={`/hq/missions/${m.id}`} className="font-headline font-semibold hover:text-primary-fixed">
                    {m.brief.slice(0, 100)}
                    {m.brief.length > 100 ? '…' : ''}
                  </Link>
                  <span className="text-xs font-label text-primary-fixed">{pct}% · {done}/{total}</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-container-high overflow-hidden mb-3">
                  <div
                    className="h-full bg-primary-container transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                  {m.tasks.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center gap-2 rounded-xl bg-surface-container-low/80 px-3 py-2"
                    >
                      <span
                        className={`h-2 w-2 rounded-full shrink-0 ${
                          t.status === 'running'
                            ? 'bg-primary-container animate-pulse'
                            : t.status === 'done'
                              ? 'bg-secondary'
                              : t.status === 'error'
                                ? 'bg-error'
                                : 'bg-outline-variant'
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="font-label text-xs truncate">{t.agentName}</p>
                        <p className="text-xs text-on-surface-variant truncate">
                          {t.detail || t.status}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      )}

      <div className="space-y-6">
        {HQ_TEAMS.map((team) => {
          const agents = HQ_AGENTS.filter((a) => a.teamId === team.id)
          if (!agents.length) return null
          return (
            <div key={team.id}>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                {team.label}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {agents.map((agent) => {
                  const p = byId.get(agent.id)
                  const status = p?.status ?? 'idle'
                  return (
                    <Link
                      key={agent.id}
                      href={`/hq/agents/${agent.id}`}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                        status === 'working'
                          ? 'border-primary-container/40 bg-primary-container/10'
                          : 'border-outline-variant/15 bg-surface-container-low/60 hover:border-outline-variant/40'
                      }`}
                    >
                      <CuteAvatar
                        agentId={agent.id}
                        name={agent.name}
                        size={40}
                        working={status === 'working'}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-headline text-sm font-semibold truncate">{agent.name}</p>
                          <span className={`text-[10px] font-label uppercase ${STATUS_CLASS[status]}`}>
                            {STATUS_LABEL[status]}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2">
                          {p?.detail || agent.title}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
