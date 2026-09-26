import { NextResponse } from 'next/server'
import { runAutonomousTick } from '@/lib/hq/runtime'

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
  if (!cronAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const result = await runAutonomousTick('weekly')
  return NextResponse.json(result)
}
