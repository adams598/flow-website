export type HqAgentId = 'agent-acquisition' | 'chasseur-contrats'

/** Apparence du mini-avatar (couleurs et accessoire). */
export type AvatarLook = {
  skin: string
  hair: string
  hairStyle: 'short' | 'bun'
  jacket: string
  pants: string
  accessory: 'headset' | 'cap-magnifier'
}

/** Profil affiché dans HQ. Le cerveau de l'agent vit dans `.claude/agents/<id>.md`. */
export type HqAgentProfile = {
  id: HqAgentId
  name: string
  role: string
  tagline: string
  look: AvatarLook
  quickPrompts: { label: string; prompt: string }[]
}

/** Profil + ce qui est lu dans le fichier `.claude/agents/<id>.md`. */
export type HqAgent = HqAgentProfile & {
  description: string
  tools: string[]
  sourceFile: string
}

export type ChatTurn = {
  id: string
  at: string
  role: 'adams' | 'agent'
  content: string
  /** Actions faites pendant la réponse (recherche web, lecture de fichier…). */
  steps?: string[]
  costUsd?: number
  error?: boolean
}

export type AgentThread = {
  sessionId?: string
  turns: ChatTurn[]
}

/** Événements envoyés au navigateur pendant qu'un agent répond (NDJSON). */
export type StreamEvent =
  | { type: 'start' }
  | { type: 'step'; label: string }
  | { type: 'text'; text: string }
  | { type: 'done'; turn: ChatTurn }
  | { type: 'error'; message: string }

export type AgentLiveState = {
  running: boolean
  startedAt?: string
  steps: string[]
}

export type PipelineStats = {
  total: number
  byStatus: Record<string, number>
  byPalier: { express: number; projet: number }
  contactedToday: number
  hot: { id: string; entreprise: string; statut: string }[]
}
