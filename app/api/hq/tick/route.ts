import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { isTickStale, runAutonomousTick } from '@/lib/hq/runtime'
import { getCompany } from '@/lib/hq/store'

export const runtime = 'nodejs'
export const maxDuration = 300

function cronAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim()
  const header = request.headers.get('authorization')
  if (secret && header === `Bearer ${secret}`) return true
  if (!secret && process.env.NODE_ENV !== 'production') return true
  return false
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('mode') === 'weekly' ? 'weekly' : 'shift'
  const fromCron = cronAuthorized(request)
  const fromHq = await isHqAuthenticated()
  if (!fromCron && !fromHq) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const company = await getCompany()
  if (mode === 'shift' && !isTickStale(company.lastTickAt, 3) && !searchParams.get('force')) {
    return NextResponse.json({ ok: true, skipped: 'tick trop récent', lastTickAt: company.lastTickAt })
  }
  const result = await runAutonomousTick(mode)
  return NextResponse.json(result)
}

export async function POST(request: Request) {
  return GET(request)
}
