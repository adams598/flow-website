import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import {
  computePresence,
  getCompany,
  getCooThread,
  getWeekPlan,
  listActivity,
  listDecisions,
  listHandoffs,
  listMissions,
} from '@/lib/hq/store'
import { isBriefingStale, postStatusBriefing } from '@/lib/hq/runtime'

export async function GET(request: Request) {
  if (!(await isHqAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const wantBriefing = searchParams.get('briefing') === '1'

  const [company, weekPlan, decisions, handoffs, activity, missions, cooThread, presence] =
    await Promise.all([
      getCompany(),
      getWeekPlan(),
      listDecisions(),
      listHandoffs(),
      listActivity(),
      listMissions(),
      getCooThread(),
      computePresence(),
    ])

  // Si Adams a le QG ouvert et qu’il n’y a pas eu de point depuis 2 h → Victor envoie
  if (wantBriefing && isBriefingStale(company.lastBriefingAt, 2)) {
    void postStatusBriefing(false)
  }

  return NextResponse.json({
    company,
    weekPlan,
    decisions,
    handoffs,
    activity,
    missions,
    cooThread,
    presence,
  })
}
