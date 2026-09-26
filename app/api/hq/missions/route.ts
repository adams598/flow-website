import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { startMission } from '@/lib/hq/runtime'
import { getMission, listMissions } from '@/lib/hq/store'

export const runtime = 'nodejs'
export const maxDuration = 300

export async function GET(request: Request) {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id) {
    const mission = await getMission(id)
    if (!mission) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    return NextResponse.json({ mission })
  }
  const missions = await listMissions()
  return NextResponse.json({ missions })
}

export async function POST(request: Request) {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = (await request.json()) as { brief?: string }
  const brief = body.brief?.trim() ?? ''
  if (!brief) {
    return NextResponse.json({ error: 'Brief requis' }, { status: 400 })
  }
  const missionId = await startMission(brief, 'ceo')
  return NextResponse.json({ missionId })
}
