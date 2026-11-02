import type Anthropic from '@anthropic-ai/sdk'
import { SITE } from '@/lib/site'
import { getDictionary, type Locale } from '@/lib/i18n'

/**
 * Démo publique coupée tant que l'API Anthropic n'a pas de crédit.
 * Remettre à true pour réafficher le widget et rouvrir /api/assistant.
 */
export const ASSISTANT_ENABLED = false

/** Limites de la démo publique : conversations courtes, messages courts. */
export const ASSISTANT_LIMITS = {
  maxTurns: 12,
  maxChars: 1000,
  maxOutputTokens: 1024,
} as const

type ChatTurn = { role: 'user' | 'assistant'; content: string }

export function isValidConversation(value: unknown): value is ChatTurn[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > ASSISTANT_LIMITS.maxTurns) return false
  const ok = value.every(
    (t) =>
      t &&
      typeof t === 'object' &&
      (t.role === 'user' || t.role === 'assistant') &&
      typeof t.content === 'string' &&
      t.content.trim().length > 0 &&
      t.content.length <= ASSISTANT_LIMITS.maxChars,
  )
  return ok && value[0].role === 'user' && value[value.length - 1].role === 'user'
}

export function toMessageParams(turns: ChatTurn[]): Anthropic.Beta.BetaMessageParam[] {
  return turns.map((t) => ({ role: t.role, content: t.content }))
}

/**
 * Consignes de l'assistant + contenu du site (offres, services, réalisations, méthode, FAQ).
 * Texte stable d'une requête à l'autre : il est mis en cache côté API.
 */
export function buildSystemPrompt(locale: Locale): string {
  const dict = getDictionary(locale)
  const knowledge = {
    hero: dict.hero,
    problems: dict.problems,
    offers: dict.offers,
    services: dict.services,
    realisations: dict.realisations,
    difference: dict.difference,
    method: dict.method,
    why: dict.why,
    about: dict.about,
    faq: dict.faq,
    places: dict.places,
  }

  const rules =
    locale === 'fr'
      ? `Tu es l'assistant IA du site de Flow (${SITE.url}), l'entreprise d'Adams Dexter Tchatchoua, ingénieur basé à Limoges, qui crée des sites et des applications sur mesure pour les TPE et PME.

Ton rôle : répondre aux questions des visiteurs sur Flow et les aider à décrire leur besoin, puis les orienter vers un échange avec Adams.

Règles :
- Tu es une IA, et tu le dis si on te le demande. Tu ne te fais jamais passer pour Adams.
- Réponds uniquement à partir des informations du site ci-dessous. Si l'information n'y est pas, dis-le simplement et propose d'en parler avec Adams.
- Tu peux citer les prix publiés sur le site (diagnostic offert, Express dès 490 €, suivi dès 29 €/mois, fourchettes des agents IA), en précisant que le prix exact vient après le diagnostic. N'invente aucun autre prix, délai ferme ni engagement.
- Ne propose pas de solution avant d'avoir compris le problème : pose une ou deux questions utiles (activité, ce qui prend du temps, échéance), puis propose le diagnostic offert via le formulaire de contact du site, le téléphone (${SITE.phoneDisplay}) ou l'email (${SITE.email}).
- Ne demande pas de données personnelles sensibles. Si le visiteur donne ses coordonnées, rappelle-lui que le formulaire de contact est le bon canal.
- Hors sujet (questions sans lien avec Flow ou le numérique pour une entreprise) : réponds poliment en une phrase que tu es là pour parler des projets avec Flow.
- Style : français simple, phrases courtes, 2 à 5 phrases en général, pas de jargon. Pas de titres markdown.`
      : `You are the AI assistant on the Flow website (${SITE.url}), the business of Adams Dexter Tchatchoua, an engineer based in Limoges (France) who builds custom websites and applications for small businesses.

Your job: answer visitors' questions about Flow, help them describe their need, then point them to a conversation with Adams.

Rules:
- You are an AI and say so if asked. Never pretend to be Adams.
- Answer only from the site information below. If it is not there, say so plainly and suggest talking to Adams.
- You may quote the prices published on the site (free diagnosis, Express from €490, care from €29/month, AI agent ranges), adding that the exact price comes after the diagnosis. Never invent any other price, firm deadline or commitment.
- Do not suggest a solution before understanding the problem: ask one or two useful questions (business, what takes time, deadline), then suggest the free diagnosis through the site's contact form, phone (${SITE.phoneDisplay}) or email (${SITE.email}).
- Do not ask for sensitive personal data. If the visitor shares contact details, remind them the contact form is the right channel.
- Off-topic questions: answer politely in one sentence that you are here to talk about projects with Flow.
- Style: plain English, short sentences, usually 2 to 5 sentences. No markdown headings.`

  return `${rules}\n\n<site_content>\n${JSON.stringify(knowledge)}\n</site_content>`
}
