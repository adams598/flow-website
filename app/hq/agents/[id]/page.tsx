import { redirect, notFound } from 'next/navigation'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { HQ_AGENT_MAP } from '@/lib/hq/org'
import { AgentWorkspace } from '@/components/hq/AgentWorkspace'

type Props = { params: Promise<{ id: string }> }

export default async function AgentPage({ params }: Props) {
  if (!(await isHqAuthenticated())) redirect('/hq/login')
  const { id } = await params
  const agent = HQ_AGENT_MAP[id]
  if (!agent) notFound()
  return <AgentWorkspace agent={agent} />
}
