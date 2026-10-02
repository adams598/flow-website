import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { loadAgent } from '@/lib/hq/agents'
import { getLiveState } from '@/lib/hq/claude'
import { isHqAgentId } from '@/lib/hq/profiles'
import { getThread, resetThread } from '@/lib/hq/store'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await isHqAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  if (!isHqAgentId(id)) return NextResponse.json({ error: 'Agent inconnu' }, { status: 404 })
  const [agent, thread] = await Promise.all([loadAgent(id), getThread(id)])
  return NextResponse.json({ agent, thread, live: getLiveState(id) })
}

/** Nouvelle conversation. */
export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isHqAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  if (!isHqAgentId(id)) return NextResponse.json({ error: 'Agent inconnu' }, { status: 404 })
  if (getLiveState(id).running) {
    return NextResponse.json({ error: 'L’agent travaille encore.' }, { status: 409 })
  }
  await resetThread(id)
  return NextResponse.json({ ok: true })
}
