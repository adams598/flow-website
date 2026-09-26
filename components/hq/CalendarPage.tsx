'use client'

import { HQ_TEAMS } from '@/lib/hq/org'
import type { WeekPlan } from '@/lib/hq/types'
import { HqShell } from './HqShell'
import { HqMarkdown } from './HqMarkdown'

const DAYS = [
  { key: 'lun', label: 'Lundi', hint: 'Post profil Adams — preuve' },
  { key: 'mar', label: 'Mardi', hint: 'Page Flow (optionnel)' },
  { key: 'mer', label: 'Mercredi', hint: 'Post profil Adams — métier' },
  { key: 'jeu', label: 'Jeudi', hint: 'Relances commerciales' },
  { key: 'ven', label: 'Vendredi', hint: 'Post profil Adams — offre / réseau' },
  { key: 'sam', label: 'Samedi', hint: 'Repos / catch-up' },
  { key: 'dim', label: 'Dimanche', hint: 'Skill com — préparer la semaine' },
]

export function CalendarPage({ weekPlan }: { weekPlan: WeekPlan | null }) {
  return (
    <HqShell>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        <header>
          <p className="font-label text-xs uppercase tracking-widest text-primary-container">
            Calendrier éditorial
          </p>
          <h1 className="font-headline text-3xl font-bold">Semaine Flow</h1>
          <p className="text-sm text-on-surface-variant">
            Les agents y déposent les scripts. Tu déplaces si tu n&apos;as pas le temps de tourner / publier.
          </p>
        </header>

        {weekPlan && (
          <div className="rounded-2xl border border-primary-container/25 p-5 text-sm">
            <p className="font-label text-xs text-primary-container mb-2">Plan Victor · {weekPlan.weekOf}</p>
            <HqMarkdown content={weekPlan.summary} />
          </div>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
          {DAYS.map((d) => (
            <article
              key={d.key}
              className="rounded-2xl border border-outline-variant/20 p-4 bg-surface-container-low min-h-[140px]"
            >
              <h2 className="font-headline font-bold">{d.label}</h2>
              <p className="text-xs text-primary-container mb-2">{d.hint}</p>
              <p className="text-sm text-on-surface-variant">
                {weekPlan?.priorities.find((p) => d.key === 'lun' && p.teamId === 'marketing')?.objective ??
                  'Les livrables com apparaîtront ici après un shift marketing.'}
              </p>
            </article>
          ))}
        </div>

        {weekPlan && (
          <ul className="space-y-2 text-sm">
            {weekPlan.priorities.map((p) => (
              <li key={p.teamId} className="rounded-xl border border-outline-variant/15 px-4 py-2">
                <span className="text-primary-fixed font-label text-xs">
                  {HQ_TEAMS.find((t) => t.id === p.teamId)?.label}
                </span>
                <p>{p.objective}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </HqShell>
  )
}
