import type { RevenueGoals } from './types'

/** Objectifs CA Flow 2026 — ambitieux pour une structure qui scale. Adams peut les modifier dans HQ. */
export const DEFAULT_GOALS: RevenueGoals = {
  year: 2026,
  annual: 240_000,
  semester: 120_000,
  quarter: 60_000,
  month: 20_000,
  closedYtd: 0,
  closedMonth: 0,
  pipeline: 0,
  treasury: 10.4,
  bankName: 'Indy',
}

export function formatEur(n: number, digits = 0): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n)
}

export function progressPct(current: number, target: number): number {
  if (target <= 0) return 0
  return Math.min(100, Math.round((current / target) * 100))
}

export function monthTargetPace(goals: RevenueGoals, dayOfMonth = new Date().getDate()): number {
  const days = 30
  return Math.round((goals.month * dayOfMonth) / days)
}

export function gapToMonth(goals: RevenueGoals): number {
  return Math.max(0, goals.month - goals.closedMonth)
}

export function goalsBrief(goals: RevenueGoals): string {
  const gap = gapToMonth(goals)
  const pace = monthTargetPace(goals)
  return `Objectifs CA Flow ${goals.year}
- Annuel : ${formatEur(goals.annual)} · encaissé YTD ${formatEur(goals.closedYtd)} (${progressPct(goals.closedYtd, goals.annual)}%)
- Semestre : ${formatEur(goals.semester)}
- Trimestre : ${formatEur(goals.quarter)}
- Mois en cours : ${formatEur(goals.month)} · encaissé ${formatEur(goals.closedMonth)} · écart ${formatEur(gap)}
- Pipeline : ${formatEur(goals.pipeline)}
- Trésorerie réelle (${goals.bankName}) : ${formatEur(goals.treasury, 2)} — c’est le cash disponible, pas le CA.
- Rythme attendu à ce jour du mois : ${formatEur(pace)}

Contrainte cash : la trésorerie est faible. Priorité absolue = premier encaissement (acompte, petit deal, relance facture), pas les dépenses. Ne jamais engager d’argent.
Tout le travail doit réduire l'écart mensuel puis alimenter trimestre / semestre / annuel.
Leviers Flow : sites, apps métier, plateformes — deals B2B, partenariats, contenu LinkedIn (brouillons seulement).`
}

export function mondayOf(date = new Date(), timeZone = 'Europe/Paris'): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const y = Number(parts.find((p) => p.type === 'year')?.value)
  const m = Number(parts.find((p) => p.type === 'month')?.value)
  const d = Number(parts.find((p) => p.type === 'day')?.value)
  const local = new Date(Date.UTC(y, m - 1, d))
  const weekday = local.getUTCDay()
  const diff = weekday === 0 ? -6 : 1 - weekday
  local.setUTCDate(local.getUTCDate() + diff)
  return local.toISOString().slice(0, 10)
}
