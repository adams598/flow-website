import { redirect } from 'next/navigation'
import { isHqAuthenticated } from '@/lib/hq/auth'
import {
  computePresence,
  getCompany,
  getCooThread,
  getWeekPlan,
  listActivity,
  listMissions,
} from '@/lib/hq/store'
import { HqDashboard } from '@/components/hq/HqDashboard'

export default async function HqPage() {
  if (!(await isHqAuthenticated())) {
    redirect('/hq/login')
  }
  const [company, weekPlan, activity, missions, cooThread, presence] = await Promise.all([
    getCompany(),
    getWeekPlan(),
    listActivity(),
    listMissions(),
    getCooThread(),
    computePresence(),
  ])
  return (
    <HqDashboard
      company={company}
      weekPlan={weekPlan}
      activity={activity}
      missions={missions}
      cooThread={cooThread}
      presence={presence}
    />
  )
}
