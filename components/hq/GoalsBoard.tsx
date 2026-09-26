'use client'

import { useState } from 'react'
import { formatEur, progressPct } from '@/lib/hq/goals'
import type { CompanyState, RevenueGoals } from '@/lib/hq/types'

type Props = {
  company: CompanyState
  onSaved: (goals: RevenueGoals) => void
}

const FIELDS: { key: 'annual' | 'semester' | 'quarter' | 'month'; label: string }[] = [
  { key: 'annual', label: 'Annuel' },
  { key: 'semester', label: 'Semestre' },
  { key: 'quarter', label: 'Trimestre' },
  { key: 'month', label: 'Mois' },
]

export function GoalsBoard({ company, onSaved }: Props) {
  const [goals, setGoals] = useState(company.goals)
  const [saving, setSaving] = useState(false)

  async function save(patch: Partial<RevenueGoals>) {
    const next = { ...goals, ...patch }
    setGoals(next)
    setSaving(true)
    await fetch('/api/hq/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next),
    })
    setSaving(false)
    onSaved(next)
  }

  return (
    <section>
      <div className="flex items-end justify-between mb-3">
        <h2 className="font-label text-xs uppercase tracking-widest text-primary-container">
          Objectifs CA {goals.year}
        </h2>
        {saving && <span className="text-xs text-on-surface-variant">Enregistrement…</span>}
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3">
        <div className="rounded-xl border border-tertiary-container/50 bg-surface-container-low/70 p-4 sm:col-span-2 xl:col-span-1">
          <p className="text-xs font-label text-on-surface-variant mb-1">
            Trésorerie {goals.bankName}
          </p>
          <p className="font-headline text-xl font-bold">{formatEur(goals.treasury, 2)}</p>
          <p className="text-xs text-on-surface-variant mt-1">Compte pro · cash réel</p>
        </div>
        {FIELDS.map(({ key, label }) => {
          const target = goals[key]
          const current =
            key === 'month' ? goals.closedMonth : key === 'annual' ? goals.closedYtd : goals.closedYtd
          const pct = key === 'month' || key === 'annual' ? progressPct(current, target) : null
          return (
            <div
              key={key}
              className="rounded-xl border border-outline-variant/20 bg-surface-container-low/70 p-4"
            >
              <p className="text-xs font-label text-on-surface-variant mb-1">{label}</p>
              <p className="font-headline text-xl font-bold">{formatEur(target)}</p>
              {pct !== null && (
                <>
                  <div className="mt-2 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                    <div className="h-full gradient-bg" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {formatEur(current)} · {pct}%
                  </p>
                </>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        <label className="rounded-lg border border-outline-variant/20 px-3 py-2">
          <span className="block text-xs text-on-surface-variant mb-1">Solde Indy (€)</span>
          <input
            type="number"
            step="0.01"
            className="w-full bg-transparent outline-none"
            value={goals.treasury}
            onChange={(e) => setGoals({ ...goals, treasury: Number(e.target.value) })}
            onBlur={() => save({ treasury: goals.treasury })}
          />
        </label>
        <label className="rounded-lg border border-outline-variant/20 px-3 py-2">
          <span className="block text-xs text-on-surface-variant mb-1">Encaissé ce mois (€)</span>
          <input
            type="number"
            className="w-full bg-transparent outline-none"
            value={goals.closedMonth}
            onChange={(e) => setGoals({ ...goals, closedMonth: Number(e.target.value) })}
            onBlur={() => save({ closedMonth: goals.closedMonth })}
          />
        </label>
        <label className="rounded-lg border border-outline-variant/20 px-3 py-2">
          <span className="block text-xs text-on-surface-variant mb-1">Encaissé YTD (€)</span>
          <input
            type="number"
            className="w-full bg-transparent outline-none"
            value={goals.closedYtd}
            onChange={(e) => setGoals({ ...goals, closedYtd: Number(e.target.value) })}
            onBlur={() => save({ closedYtd: goals.closedYtd })}
          />
        </label>
        <label className="rounded-lg border border-outline-variant/20 px-3 py-2">
          <span className="block text-xs text-on-surface-variant mb-1">Pipeline (€)</span>
          <input
            type="number"
            className="w-full bg-transparent outline-none"
            value={goals.pipeline}
            onChange={(e) => setGoals({ ...goals, pipeline: Number(e.target.value) })}
            onBlur={() => save({ pipeline: goals.pipeline })}
          />
        </label>
      </div>
    </section>
  )
}
