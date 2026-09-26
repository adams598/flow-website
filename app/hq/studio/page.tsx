import { redirect } from 'next/navigation'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { getCompany, listActivity, listHandoffs, listMissions } from '@/lib/hq/store'
import { StudioPage } from '@/components/hq/StudioPage'

export default async function Page() {
  if (!(await isHqAuthenticated())) redirect('/hq/login')
  const [company, missions, activity, handoffs] = await Promise.all([
    getCompany(),
    listMissions(),
    listActivity(),
    listHandoffs(12),
  ])
  return (
    <StudioPage company={company} missions={missions} activity={activity} handoffs={handoffs} />
  )
}
