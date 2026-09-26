export type AgentStatus = 'idle' | 'working'

export type TeamId =
  | 'direction'
  | 'croissance'
  | 'marketing'
  | 'delivery'
  | 'client'
  | 'finance'
  | 'intelligence'

export type HqAgent = {
  id: string
  name: string
  title: string
  teamId: TeamId
  teamLabel: string
  emoji: string
  expertise: string
  canDelegate: boolean
  systemPrompt: string
  guardrails: string[]
}

export type ChatTurn = {
  id: string
  at: string
  role: 'adams' | 'agent'
  content: string
  kind?: 'plan' | 'reply'
}

export type Deliverable = {
  id: string
  agentId: string
  agentName: string
  at: string
  title: string
  body: string
}

export type MissionSource = 'ceo' | 'coo' | 'autonomous'

export type MissionTask = {
  id: string
  agentId: string
  agentName: string
  status: 'pending' | 'running' | 'done' | 'error'
  detail?: string
  startedAt?: string
  finishedAt?: string
  output?: string
  error?: string
}

export type Mission = {
  id: string
  brief: string
  status: 'running' | 'done' | 'error'
  createdAt: string
  source?: MissionSource
  tasks: MissionTask[]
  summary?: string
}

export type ActivityItem = {
  id: string
  at: string
  agentId: string
  agentName: string
  message: string
}

export type RevenueGoals = {
  year: number
  annual: number
  semester: number
  quarter: number
  month: number
  closedYtd: number
  closedMonth: number
  pipeline: number
  /** Solde compte pro (Indy), pas le CA. */
  treasury: number
  bankName: string
}

export type DecisionKind = 'publish' | 'send' | 'price' | 'strategy'

export type Decision = {
  id: string
  createdAt: string
  kind: DecisionKind
  title: string
  body: string
  status: 'pending' | 'approved' | 'dismissed'
}

export type Handoff = {
  id: string
  at: string
  fromAgentId: string
  fromName: string
  toTeamId: TeamId
  subject: string
  body: string
}

export type WeekPriority = {
  teamId: TeamId
  ownerId: string
  objective: string
}

export type WeekPlan = {
  weekOf: string
  createdAt: string
  summary: string
  priorities: WeekPriority[]
  needsAdams: string[]
}

export type CompanyState = {
  goals: RevenueGoals
  lastTickAt?: string
  lastWeeklyAt?: string
  lastBriefingAt?: string
  lastShift?: string
  autonomyEnabled: boolean
}

export type CooMessage = {
  id: string
  at: string
  role: 'adams' | 'coo'
  content: string
  kind?: 'chat' | 'briefing'
}

/** Statut live d’un agent, dérivé des missions en cours + activité. */
export type AgentPresence = {
  agentId: string
  status: 'idle' | 'working' | 'done' | 'error'
  detail: string
  missionId?: string
  missionBrief?: string
  updatedAt: string
}

export type HqSnapshot = {
  company: CompanyState
  weekPlan: WeekPlan | null
  decisions: Decision[]
  handoffs: Handoff[]
  cooThread: CooMessage[]
  activity: ActivityItem[]
  missions: Mission[]
  presence: AgentPresence[]
}
