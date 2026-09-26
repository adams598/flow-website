import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { listDeliverables } from '@/lib/hq/store'

export async function GET(request: Request) {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const agentId = new URL(request.url).searchParams.get('agentId') ?? undefined
  const deliverables = await listDeliverables(agentId)
  return NextResponse.json({ deliverables })
}
