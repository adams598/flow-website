import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { appendActivity, listDecisions, saveDecisions } from '@/lib/hq/store'

export async function GET() {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const decisions = await listDecisions()
  return NextResponse.json({ decisions })
}

export async function POST(request: Request) {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = (await request.json()) as { id?: string; status?: 'approved' | 'dismissed' }
  if (!body.id || (body.status !== 'approved' && body.status !== 'dismissed')) {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }
  const list = await listDecisions()
  const next = list.map((d) => (d.id === body.id ? { ...d, status: body.status! } : d))
  await saveDecisions(next)
  await appendActivity({
    agentId: 'coo',
    agentName: 'Victor',
    message: body.status === 'approved' ? 'Adams a validé une décision' : 'Adams a écarté une décision',
  })
  return NextResponse.json({ ok: true })
}
