import { redirect } from 'next/navigation'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { loadAgents } from '@/lib/hq/agents'
import { getLiveState } from '@/lib/hq/claude'
import { getPipelineStats, getThread } from '@/lib/hq/store'
import { TeamPage } from '@/components/hq/TeamPage'

export const dynamic = 'force-dynamic'

export default async function HqPage() {
  if (!(await isHqAuthenticated())) redirect('/hq/login')
  const [agents, stats] = await Promise.all([loadAgents(), getPipelineStats()])
  const members = await Promise.all(
    agents.map(async (agent) => {
      const thread = await getThread(agent.id)
      return { agent, live: getLiveState(agent.id), lastTurn: thread.turns.at(-1) }
    })
  )
  return <TeamPage members={members} stats={stats} />
}
