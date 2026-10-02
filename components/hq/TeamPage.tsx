'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { AgentLiveState, ChatTurn, HqAgent, PipelineStats } from '@/lib/hq/types'
import { AgentAvatar } from './AgentAvatar'
import { HqShell } from './HqShell'

type Member = { agent: HqAgent; live: AgentLiveState; lastTurn?: ChatTurn }

const FUNNEL: { key: string; label: string }[] = [
  { key: 'contacte', label: 'Contactés' },
  { key: 'relance', label: 'Relancés' },
  { key: 'repondu', label: 'Réponses' },
  { key: 'interesse', label: 'Intéressés' },
  { key: 'rdv', label: 'Rendez-vous' },
  { key: 'proposition', label: 'Propositions' },
  { key: 'signe', label: 'Signés' },
]

function plain(text: string) {
  return text.replace(/[#*_`>|]/g, '').replace(/\s+/g, ' ').trim()
}

function Kpi({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="hq-panel p-5">
      <p className="text-xs font-label text-on-surface-variant">{label}</p>
      <p className="font-headline text-3xl font-extrabold tracking-tight mt-2">{value}</p>
      {hint && <p className="text-xs text-on-surface-variant mt-1">{hint}</p>}
    </div>
  )
}

export function TeamPage({ members, stats }: { members: Member[]; stats: PipelineStats | null }) {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  const s = (key: string) => stats?.byStatus[key] ?? 0
  const replies = s('repondu') + s('interesse') + s('rdv') + s('appel_fait') + s('proposition') + s('signe')
  const paliers = stats ? stats.byPalier.projet + stats.byPalier.express : 0
  const projetPct = paliers ? Math.round(((stats?.byPalier.projet ?? 0) / paliers) * 100) : 0

  return (
    <HqShell>
      <main className="max-w-6xl mx-auto px-5 md:px-10 py-10 space-y-10">
        <header>
          <p className="hq-kicker">Flow HQ · {today}</p>
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
            Bonjour Adams.
          </h1>
          <p className="text-on-surface-variant mt-2 max-w-2xl">
            Tes deux agents travaillent sur le même dossier de prospection. Rien ne part sans ta validation.
          </p>
        </header>

        {stats && (
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Kpi label="Prospects au CRM" value={stats.total} hint={`${s('qualifie')} qualifiés en attente`} />
            <Kpi label="Contactés aujourd’hui" value={stats.contactedToday} hint={`${s('contacte') + s('relance')} en cours de suivi`} />
            <Kpi label="Réponses" value={replies} hint={`${s('rdv')} rendez-vous`} />
            <Kpi label="Clients signés" value={s('signe')} hint="Objectif : 1 cette semaine" />
          </section>
        )}

        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="hq-kicker">Équipe</p>
              <h2 className="font-headline text-xl font-bold mt-1">Tes agents</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {members.map(({ agent, live, lastTurn }) => (
              <Link
                key={agent.id}
                href={`/hq/agents/${agent.id}`}
                className="hq-panel hq-wave group p-4 grid grid-cols-[150px_1fr] gap-5 hover:border-primary-container/50 transition-colors"
              >
                <div className="hq-stage h-[190px]">
                  <AgentAvatar look={agent.look} size={128} state={live.running ? 'thinking' : 'idle'} title={agent.name} />
                </div>
                <div className="min-w-0 flex flex-col py-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-headline text-xl font-extrabold tracking-tight">{agent.name}</h3>
                      <p className="text-sm text-primary-fixed font-label">{agent.role}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-on-surface-variant group-hover:text-primary-container transition-colors" />
                  </div>
                  <p className="text-sm text-on-surface-variant mt-2">{agent.tagline}</p>
                  <div className="mt-auto pt-4 space-y-2">
                    <p className="flex items-center gap-2 text-xs font-label">
                      <span
                        className={`h-2 w-2 rounded-full ${live.running ? 'bg-primary-container hq-dot-live' : 'bg-outline'}`}
                      />
                      <span className={live.running ? 'text-primary-fixed' : 'text-on-surface-variant'}>
                        {live.running ? 'Au travail' : 'Disponible'}
                      </span>
                    </p>
                    {lastTurn && (
                      <p className="text-xs text-on-surface-variant line-clamp-2 border-l-2 border-outline-variant/50 pl-3">
                        {plain(lastTurn.content).slice(0, 160)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {stats && (
          <section className="grid lg:grid-cols-[1fr_320px] gap-5">
            <div className="hq-panel p-6">
              <p className="hq-kicker">Pipeline</p>
              <h2 className="font-headline text-xl font-bold mt-1 mb-5">Du premier contact à la signature</h2>
              <div className="space-y-3">
                {FUNNEL.map(({ key, label }) => {
                  const value = s(key)
                  const max = Math.max(1, ...FUNNEL.map((f) => s(f.key)))
                  return (
                    <div key={key} className="grid grid-cols-[110px_1fr_40px] items-center gap-3 text-sm">
                      <span className="text-on-surface-variant font-label">{label}</span>
                      <span className="h-2 rounded-full bg-surface-container-high overflow-hidden">
                        <span
                          className="block h-full rounded-full gradient-bg"
                          style={{ width: `${(value / max) * 100}%` }}
                        />
                      </span>
                      <span className="text-right font-headline font-bold">{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="hq-panel p-6 space-y-5">
              <div>
                <p className="hq-kicker">Paliers</p>
                <h2 className="font-headline text-xl font-bold mt-1">Répartition</h2>
              </div>
              <div className="h-2 rounded-full bg-surface-container-high overflow-hidden flex">
                <span className="gradient-bg h-full" style={{ width: `${projetPct}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-headline text-2xl font-extrabold">{stats.byPalier.projet}</p>
                  <p className="text-xs text-on-surface-variant">Projet · 5 à 20 k€+</p>
                </div>
                <div>
                  <p className="font-headline text-2xl font-extrabold">{stats.byPalier.express}</p>
                  <p className="text-xs text-on-surface-variant">Express · moins de 1 k€</p>
                </div>
              </div>
              {stats.hot.length > 0 ? (
                <div>
                  <p className="text-xs font-label text-on-surface-variant mb-2">À traiter en priorité</p>
                  <ul className="space-y-1 text-sm">
                    {stats.hot.slice(0, 5).map((h) => (
                      <li key={h.id} className="flex justify-between gap-2">
                        <span className="truncate">{h.entreprise}</span>
                        <span className="text-primary-fixed text-xs font-label">{h.statut}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-xs text-on-surface-variant">Aucune réponse à traiter pour l’instant.</p>
              )}
            </div>
          </section>
        )}
      </main>
    </HqShell>
  )
}
