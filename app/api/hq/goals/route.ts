import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { DEFAULT_GOALS } from '@/lib/hq/goals'
import { getCompany, saveCompany } from '@/lib/hq/store'
import type { RevenueGoals } from '@/lib/hq/types'

export async function GET() {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const company = await getCompany()
  return NextResponse.json({ company })
}

export async function POST(request: Request) {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = (await request.json()) as Partial<RevenueGoals> & { autonomyEnabled?: boolean }
  const company = await getCompany()
  const goals: RevenueGoals = { ...DEFAULT_GOALS, ...company.goals }
  const numeric = [
    'annual',
    'semester',
    'quarter',
    'month',
    'closedYtd',
    'closedMonth',
    'pipeline',
    'treasury',
    'year',
  ] as const
  for (const key of numeric) {
    if (typeof body[key] === 'number' && Number.isFinite(body[key])) {
      goals[key] = body[key] as number
    }
  }
  if (typeof (body as { bankName?: string }).bankName === 'string') {
    goals.bankName = (body as { bankName: string }).bankName
  }
  await saveCompany({
    ...company,
    goals,
    autonomyEnabled: typeof body.autonomyEnabled === 'boolean' ? body.autonomyEnabled : company.autonomyEnabled,
  })
  return NextResponse.json({ ok: true, goals })
}
