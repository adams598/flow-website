import { redirect } from 'next/navigation'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { getWeekPlan } from '@/lib/hq/store'
import { CalendarPage } from '@/components/hq/CalendarPage'

export default async function Page() {
  if (!(await isHqAuthenticated())) redirect('/hq/login')
  const weekPlan = await getWeekPlan()
  return <CalendarPage weekPlan={weekPlan} />
}
