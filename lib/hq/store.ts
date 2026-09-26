import { promises as fs } from 'fs'
import path from 'path'
import { DEFAULT_GOALS } from './goals'
import type {
  ActivityItem,
  AgentPresence,
  ChatTurn,
  CompanyState,
  CooMessage,
  Decision,
  Deliverable,
  Handoff,
  Mission,
  WeekPlan,
} from './types'

const DATA_DIR =
  process.env.VERCEL === '1'
    ? path.join('/tmp', 'flow-hq')
    : path.join(process.cwd(), 'data', 'hq')

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

function missionPath(id: string) {
  return path.join(DATA_DIR, 'missions', `${id}.json`)
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await ensureDir()
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf-8')
}

export async function saveMission(mission: Mission): Promise<void> {
  await ensureDir()
  await fs.mkdir(path.join(DATA_DIR, 'missions'), { recursive: true })
  await fs.writeFile(missionPath(mission.id), JSON.stringify(mission, null, 2), 'utf-8')
}

export async function getMission(id: string): Promise<Mission | null> {
  try {
    const raw = await fs.readFile(missionPath(id), 'utf-8')
    return JSON.parse(raw) as Mission
  } catch {
    return null
  }
}

export async function listMissions(limit = 30): Promise<Mission[]> {
  await ensureDir()
  const dir = path.join(DATA_DIR, 'missions')
  try {
    const files = await fs.readdir(dir)
    const missions: Mission[] = []
    for (const file of files.filter((f) => f.endsWith('.json'))) {
      const raw = await fs.readFile(path.join(dir, file), 'utf-8')
      missions.push(JSON.parse(raw) as Mission)
    }
    return missions.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit)
  } catch {
    return []
  }
}

export async function hasRunningMission(): Promise<boolean> {
  const list = await listMissions(10)
  return list.some((m) => m.status === 'running')
}

export async function appendActivity(item: Omit<ActivityItem, 'id' | 'at'>): Promise<void> {
  const list = await readJson<ActivityItem[]>('activity.json', [])
  list.unshift({
    ...item,
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
  })
  await writeJson('activity.json', list.slice(0, 120))
}

export async function listActivity(limit = 40): Promise<ActivityItem[]> {
  const list = await readJson<ActivityItem[]>('activity.json', [])
  return list.slice(0, limit)
}

export async function getCompany(): Promise<CompanyState> {
  const stored = await readJson<Partial<CompanyState> | null>('company.json', null)
  return {
    goals: { ...DEFAULT_GOALS, ...stored?.goals },
    lastTickAt: stored?.lastTickAt,
    lastWeeklyAt: stored?.lastWeeklyAt,
    lastBriefingAt: stored?.lastBriefingAt,
    lastShift: stored?.lastShift,
    autonomyEnabled: stored?.autonomyEnabled ?? true,
  }
}

export async function saveCompany(state: CompanyState): Promise<void> {
  await writeJson('company.json', state)
}

export async function getWeekPlan(): Promise<WeekPlan | null> {
  return readJson<WeekPlan | null>('week-plan.json', null)
}

export async function saveWeekPlan(plan: WeekPlan): Promise<void> {
  await writeJson('week-plan.json', plan)
}

export async function listDecisions(): Promise<Decision[]> {
  return readJson<Decision[]>('decisions.json', [])
}

export async function saveDecisions(list: Decision[]): Promise<void> {
  await writeJson('decisions.json', list)
}

export async function appendDecision(item: Omit<Decision, 'id' | 'createdAt' | 'status'>): Promise<Decision> {
  const list = await listDecisions()
  const decision: Decision = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending',
  }
  list.unshift(decision)
  await saveDecisions(list.slice(0, 50))
  return decision
}

export async function listHandoffs(limit = 40): Promise<Handoff[]> {
  const list = await readJson<Handoff[]>('handoffs.json', [])
  return list.slice(0, limit)
}

export async function appendHandoff(item: Omit<Handoff, 'id' | 'at'>): Promise<void> {
  const list = await readJson<Handoff[]>('handoffs.json', [])
  list.unshift({
    ...item,
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
  })
  await writeJson('handoffs.json', list.slice(0, 80))
}

export async function getCooThread(): Promise<CooMessage[]> {
  return readJson<CooMessage[]>('coo-thread.json', [])
}

export async function appendCooMessage(
  role: CooMessage['role'],
  content: string,
  kind: CooMessage['kind'] = 'chat'
): Promise<CooMessage> {
  const list = await getCooThread()
  const msg: CooMessage = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    role,
    content,
    kind,
  }
  list.push(msg)
  await writeJson('coo-thread.json', list.slice(-100))
  return msg
}

/** Présence live de chaque agent à partir des missions + activité. */
export async function computePresence(): Promise<AgentPresence[]> {
  const { HQ_AGENTS } = await import('./org')
  const [missions, activity] = await Promise.all([listMissions(12), listActivity(80)])
  const running = missions.filter((m) => m.status === 'running')
  const recentDone = missions.filter((m) => m.status === 'done' || m.status === 'error').slice(0, 4)
  const now = new Date().toISOString()

  return HQ_AGENTS.map((agent) => {
    for (const mission of running) {
      const task = mission.tasks.find((t) => t.agentId === agent.id)
      if (!task) continue
      if (task.status === 'running') {
        return {
          agentId: agent.id,
          status: 'working' as const,
          detail: task.detail || `Travaille — ${mission.brief.slice(0, 80)}`,
          missionId: mission.id,
          missionBrief: mission.brief.slice(0, 120),
          updatedAt: task.startedAt ?? mission.createdAt,
        }
      }
      if (task.status === 'pending') {
        return {
          agentId: agent.id,
          status: 'idle' as const,
          detail: `En attente dans la mission — ${mission.brief.slice(0, 60)}`,
          missionId: mission.id,
          missionBrief: mission.brief.slice(0, 120),
          updatedAt: mission.createdAt,
        }
      }
      if (task.status === 'done') {
        return {
          agentId: agent.id,
          status: 'done' as const,
          detail: 'Livrable prêt sur la mission en cours',
          missionId: mission.id,
          missionBrief: mission.brief.slice(0, 120),
          updatedAt: task.finishedAt ?? now,
        }
      }
      if (task.status === 'error') {
        return {
          agentId: agent.id,
          status: 'error' as const,
          detail: task.error?.slice(0, 100) || 'Erreur sur la mission',
          missionId: mission.id,
          missionBrief: mission.brief.slice(0, 120),
          updatedAt: task.finishedAt ?? now,
        }
      }
    }

    for (const mission of recentDone) {
      const task = mission.tasks.find((t) => t.agentId === agent.id && t.status === 'done')
      if (task?.finishedAt) {
        const age = Date.now() - new Date(task.finishedAt).getTime()
        if (age < 30 * 60 * 1000) {
          return {
            agentId: agent.id,
            status: 'done' as const,
            detail: `Vient de livrer — ${mission.brief.slice(0, 70)}`,
            missionId: mission.id,
            missionBrief: mission.brief.slice(0, 120),
            updatedAt: task.finishedAt,
          }
        }
      }
    }

    const lastAct = activity.find((a) => a.agentId === agent.id)
    return {
      agentId: agent.id,
      status: 'idle' as const,
      detail: lastAct ? lastAct.message.slice(0, 90) : 'Disponible',
      updatedAt: lastAct?.at ?? now,
    }
  })
}

export async function getAgentThread(agentId: string): Promise<ChatTurn[]> {
  return readJson<ChatTurn[]>(`threads/${agentId}.json`, [])
}

export async function appendAgentTurn(agentId: string, turn: Omit<ChatTurn, 'id' | 'at'>): Promise<ChatTurn> {
  await ensureDir()
  await fs.mkdir(path.join(DATA_DIR, 'threads'), { recursive: true })
  const list = await getAgentThread(agentId)
  const full: ChatTurn = {
    ...turn,
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
  }
  list.push(full)
  await writeJson(`threads/${agentId}.json`, list.slice(-80))
  return full
}

export async function listDeliverables(agentId?: string): Promise<Deliverable[]> {
  const list = await readJson<Deliverable[]>('deliverables.json', [])
  return agentId ? list.filter((d) => d.agentId === agentId) : list
}

export async function saveDeliverable(item: Omit<Deliverable, 'id' | 'at'>): Promise<Deliverable> {
  const list = await readJson<Deliverable[]>('deliverables.json', [])
  const full: Deliverable = {
    ...item,
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
  }
  list.unshift(full)
  await writeJson('deliverables.json', list.slice(0, 120))
  return full
}
