import { redirect, notFound } from 'next/navigation'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { getMission } from '@/lib/hq/store'
import { MissionRoom } from '@/components/hq/MissionRoom'

type Props = { params: Promise<{ id: string }> }

export default async function MissionPage({ params }: Props) {
  if (!(await isHqAuthenticated())) redirect('/hq/login')
  const { id } = await params
  const mission = await getMission(id)
  if (!mission) notFound()
  return <MissionRoom initialMission={mission} />
}
