import { promises as fs } from 'fs'
import path from 'path'
import { HQ_PROFILES, HQ_PROFILE_MAP } from './profiles'
import type { HqAgent, HqAgentId } from './types'

const AGENTS_DIR = path.join(process.cwd(), '.claude', 'agents')

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw }
  const meta: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return { meta, body: match[2] }
}

/** Charge un agent HQ depuis son fichier Claude Code `.claude/agents/<id>.md`. */
export async function loadAgent(id: HqAgentId): Promise<HqAgent> {
  const sourceFile = path.join(AGENTS_DIR, `${id}.md`)
  const profile = HQ_PROFILE_MAP[id]
  try {
    const { meta } = parseFrontmatter(await fs.readFile(sourceFile, 'utf-8'))
    return {
      ...profile,
      description: meta.description ?? profile.tagline,
      tools: (meta.tools ?? '').split(',').map((t) => t.trim()).filter(Boolean),
      sourceFile: `.claude/agents/${id}.md`,
    }
  } catch {
    return { ...profile, description: profile.tagline, tools: [], sourceFile: `.claude/agents/${id}.md` }
  }
}

export async function loadAgents(): Promise<HqAgent[]> {
  return Promise.all(HQ_PROFILES.map((p) => loadAgent(p.id)))
}
