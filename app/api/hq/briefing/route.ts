import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { postStatusBriefing } from '@/lib/hq/runtime'

export const runtime = 'nodejs'
export const maxDuration = 120

/** Adams demande un point d’avancement immédiat à Victor. */
export async function POST() {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const result = await postStatusBriefing(true)
  return NextResponse.json(result)
}
