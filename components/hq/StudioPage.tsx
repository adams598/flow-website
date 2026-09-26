'use client'

import Link from 'next/link'
import { formatEur } from '@/lib/hq/goals'
import type { ActivityItem, CompanyState, Handoff, Mission } from '@/lib/hq/types'
import { GoalsBoard } from './GoalsBoard'
import { HqShell } from './HqShell'

type Props = {
  company: CompanyState
  missions: Mission[]
  activity: ActivityItem[]
  handoffs: Handoff[]
}

export function StudioPage({ company, missions, activity, handoffs }: Props) {
  return (
    <HqShell>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        <header>
          <p className="font-label text-xs uppercase tracking-widest text-primary-container">Studio</p>
          <h1 className="font-headline text-3xl font-bold">Vue d&apos;ensemble</h1>
          <p className="text-sm text-on-surface-variant">
            Ce que Zineb appelle le studio : chiffres, à faire maintenant, ce que l&apos;équipe vient de produire.
          </p>
        </header>

        <GoalsBoard company={company} onSaved={() => {}} />

        <section>
          <h2 className="font-label text-xs uppercase tracking-widest text-primary-container mb-3">
            À faire maintenant
          </h2>
          <ul className="grid md:grid-cols-2 gap-3 text-sm">
            <li className="rounded-2xl border border-outline-variant/20 p-4">
              Relancer un acompte — trésorerie {formatEur(company.goals.treasury, 2)}
            </li>
            <li className="rounded-2xl border border-outline-variant/20 p-4">
              Pipeline déclaré : {formatEur(company.goals.pipeline)}
            </li>
            <li className="rounded-2xl border border-outline-variant/20 p-4">
              Missions en cours : {missions.filter((m) => m.status === 'running').length}
            </li>
            <li className="rounded-2xl border border-outline-variant/20 p-4">
              Dernier shift : {company.lastShift ?? '—'}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-label text-xs uppercase tracking-widest text-primary-container mb-3">
            Missions
          </h2>
          <ul className="space-y-2">
            {missions.slice(0, 8).map((m) => (
              <li key={m.id}>
                <Link
                  href={`/hq/missions/${m.id}`}
                  className="block rounded-xl border border-outline-variant/20 px-4 py-3 hover:border-primary-container/40"
                >
                  <span className="text-sm line-clamp-1">{m.brief}</span>
                  <span className="text-xs text-on-surface-variant">{m.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-label text-xs uppercase tracking-widest text-primary-container mb-3">
              Activité
            </h2>
            <ul className="space-y-2 text-sm">
              {activity.slice(0, 10).map((a) => (
                <li key={a.id}>
                  <strong>{a.agentName}</strong> — {a.message}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-label text-xs uppercase tracking-widest text-primary-container mb-3">
              Bus inter-équipes
            </h2>
            <ul className="space-y-2 text-sm">
              {handoffs.slice(0, 10).map((h) => (
                <li key={h.id}>
                  {h.fromName} → {h.toTeamId} · {h.subject}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </HqShell>
  )
}
