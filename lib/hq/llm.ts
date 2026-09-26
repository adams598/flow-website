import type { HqAgent } from './types'

const GATEWAY_URL = 'https://ai-gateway.vercel.sh/v1/chat/completions'

/** Palier gratuit Vercel : pas de Claude. Gemini 2.5 Flash est dans le catalogue free-tier. */
const DEFAULT_MODEL = 'google/gemini-2.5-flash'
const FALLBACK_MODELS = [
  'google/gemini-2.5-flash-lite',
  'alibaba/qwen3.5-flash',
  'meta/llama-3.3-70b',
]

export function hasLlm(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY?.trim())
}

export async function runAgentTask(
  agent: HqAgent,
  userMessage: string,
  context?: string
): Promise<string> {
  const key = process.env.AI_GATEWAY_API_KEY?.trim()
  if (!key) {
    return mockAgentOutput(agent, userMessage)
  }

  const model = process.env.HQ_MODEL?.trim() || DEFAULT_MODEL
  const guard = agent.guardrails.join('\n- ')
  const system = `${agent.systemPrompt}\n\nGarde-fous:\n- ${guard}`
  const userContent = context
    ? `${userMessage}\n\n---\nContexte mission:\n${context}`
    : userMessage

  const messages: { role: string; content: string }[] = [
    { role: 'system', content: system },
    { role: 'user', content: userContent },
  ]

  // Gemini Flash compte ses tokens de raisonnement dans max_tokens :
  // un budget trop bas coupe la réponse en plein milieu. On voit large,
  // et on relance une continuation si le modèle est quand même coupé.
  let full = ''
  for (let turn = 0; turn < 3; turn++) {
    const res = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        models: FALLBACK_MODELS.filter((m) => m !== model),
        max_tokens: 32000,
        messages,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(friendlyGatewayError(res.status, errText))
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string }; finish_reason?: string }[]
    }
    const choice = data.choices?.[0]
    const text = choice?.message?.content ?? ''
    full += (full && text ? '\n' : '') + text

    if (choice?.finish_reason !== 'length') break

    messages.push({ role: 'assistant', content: text })
    messages.push({
      role: 'user',
      content: 'Ta réponse a été coupée. Continue exactement là où tu t’es arrêté, sans rien répéter.',
    })
  }

  const text = full.trim()
  if (!text) throw new Error('Réponse vide du modèle')
  return text
}

function friendlyGatewayError(status: number, raw: string): string {
  if (status === 403 && /free tier/i.test(raw)) {
    return `Le palier gratuit Vercel n’autorise pas ce modèle. HQ utilise maintenant Gemini Flash. Si l’erreur continue : AI Gateway → acheter des crédits, ou HQ_MODEL=google/gemini-2.5-flash dans .env.local.`
  }
  if (status === 429) {
    return `Limite de débit AI Gateway (palier gratuit). Réessaie dans une minute, ou achète des crédits.`
  }
  return `Gateway ${status}: ${raw.slice(0, 220)}`
}

function mockAgentOutput(agent: HqAgent, userMessage: string): string {
  return `**${agent.name}** (${agent.title}) — mode démo (sans \`AI_GATEWAY_API_KEY\`).

Mission reçue : ${userMessage.slice(0, 400)}${userMessage.length > 400 ? '…' : ''}

**Prochaines actions proposées :**
1. Clarifier le livrable attendu et la deadline.
2. Appliquer le process métier Flow (${agent.expertise}).
3. Produire un brouillon structuré pour validation Adams.

**Rappel garde-fous :** ${agent.guardrails.slice(0, 2).join(' · ')}

_Ajoute \`AI_GATEWAY_API_KEY\` dans \`.env.local\` pour activer l'exécution IA réelle._`
}
