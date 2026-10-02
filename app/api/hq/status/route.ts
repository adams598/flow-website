import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { getLiveState } from '@/lib/hq/claude'
import { HQ_PROFILES } from '@/lib/hq/profiles'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Statut en direct de chaque agent (pour la barre latérale). */
export async function GET() {
  if (!(await isHqAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const running = Object.fromEntries(HQ_PROFILES.map((p) => [p.id, getLiveState(p.id).running]))
  return NextResponse.json({ running })
}
