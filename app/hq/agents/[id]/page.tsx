import { notFound, redirect } from 'next/navigation'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { loadAgent } from '@/lib/hq/agents'
import { getLiveState } from '@/lib/hq/claude'
import { isHqAgentId } from '@/lib/hq/profiles'
import { getThread } from '@/lib/hq/store'
import { AgentChat } from '@/components/hq/AgentChat'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export default async function AgentPage({ params }: Props) {
  if (!(await isHqAuthenticated())) redirect('/hq/login')
  const { id } = await params
  if (!isHqAgentId(id)) notFound()
  const [agent, thread] = await Promise.all([loadAgent(id), getThread(id)])
  return <AgentChat agent={agent} initialTurns={thread.turns} initialLive={getLiveState(id)} />
}
