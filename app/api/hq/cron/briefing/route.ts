import { NextResponse } from 'next/server'
import { postStatusBriefing } from '@/lib/hq/runtime'

export const runtime = 'nodejs'
export const maxDuration = 120

function cronAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim()
  const header = request.headers.get('authorization')
  if (secret && header === `Bearer ${secret}`) return true
  if (!secret && process.env.NODE_ENV !== 'production') return true
  return false
}

/** Point Victor toutes les ~2 h (cron). */
export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const result = await postStatusBriefing(false)
  return NextResponse.json(result)
}
