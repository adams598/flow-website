import { renderAckEmail, renderOwnerEmail } from '@/lib/contact-mail'
import { SITE } from '@/lib/site'

export type ContactPayload = {
  product: string
  need: string
  stage: string
  budget: string
  timeline: string
  name: string
  email: string
  phone?: string
  locale?: string
  website?: string // honeypot
}

export type LeadTemperature = 'chaud' | 'tiède' | 'info'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidContactPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  const required = ['product', 'need', 'stage', 'budget', 'timeline', 'name', 'email'] as const
  for (const key of required) {
    if (typeof b[key] !== 'string' || !(b[key] as string).trim()) return false
  }
  if ((b.need as string).trim().length < 10) return false
  if (!EMAIL_RE.test((b.email as string).trim())) return false
  if (b.phone !== undefined && typeof b.phone !== 'string') return false
  if (b.locale !== undefined && typeof b.locale !== 'string') return false
  if (b.website !== undefined && typeof b.website !== 'string') return false
  return true
}

export function qualifyLead(payload: ContactPayload): LeadTemperature {
  const budget = payload.budget
  const timeline = payload.timeline
  const needLen = payload.need.trim().length

  const highBudget =
    budget.includes('10 000') ||
    budget.includes('20 000') ||
    budget.includes('10,000') ||
    budget.includes('20,000')
  const midBudget = budget.includes('5 000') || budget.includes('5,000') || budget.includes('2 000')
  const urgent =
    timeline.toLowerCase().includes('dès') ||
    timeline.toLowerCase().includes('asap') ||
    timeline.toLowerCase().includes('possible') ||
    timeline.toLowerCase().includes('1–3') ||
    timeline.toLowerCase().includes('1-3')

  if ((highBudget || midBudget) && urgent && needLen > 40) return 'chaud'
  if (highBudget || (midBudget && needLen > 30) || urgent) return 'tiède'
  return 'info'
}

function productAngle(product: string, locale: string): string {
  const p = product.toLowerCase()
  const fr = locale !== 'en'

  if (p.includes('plateforme') || p.includes('platform')) {
    return fr
      ? 'Pour une plateforme, on clarifie d’abord les rôles, le parcours utilisateur et ce qui doit être monétisé (abonnement, paiement, droits d’accès).'
      : 'For a platform, we first clarify roles, the user journey, and what needs to be monetized (subscription, payment, access rights).'
  }
  if (p.includes('application') || p.includes('métier') || p.includes('business') || p.includes('app')) {
    return fr
      ? 'Pour une application métier, on part du process réel : qui fait quoi aujourd’hui, ce qui est manuel, et ce qui doit être fiable.'
      : 'For a business app, we start from the real process: who does what today, what is manual, and what must be reliable.'
  }
  if (p.includes('e-commerce') || p.includes('commerce')) {
    return fr
      ? 'Pour un e-commerce, on regarde catalogue, paiement, livraison et le parcours jusqu’à la confirmation de commande.'
      : 'For e-commerce, we look at catalog, payment, fulfillment, and the path to order confirmation.'
  }
  return fr
    ? 'Pour un site, on vise une présence claire qui sert vraiment le commercial (message, parcours, conversion).'
    : 'For a website, we aim for a clear presence that actually supports sales (message, journey, conversion).'
}

export function buildReplyDraft(payload: ContactPayload): string {
  const locale = payload.locale === 'en' ? 'en' : 'fr'
  const fr = locale === 'fr'
  const firstName = payload.name.trim().split(/\s+/)[0] || payload.name

  if (fr) {
    return [
      `Bonjour ${firstName},`,
      '',
      `Merci pour votre message concernant « ${payload.product} ».`,
      '',
      productAngle(payload.product, locale),
      '',
      'Je vous propose un appel de 20 minutes pour cadrer le besoin et voir la suite la plus adaptée.',
      '',
      `Vous pouvez me répondre à ce mail ou m’appeler au ${SITE.phoneDisplay}.`,
      '',
      'Bien à vous,',
      'Adams — Flow',
    ].join('\n')
  }

  return [
    `Hi ${firstName},`,
    '',
    `Thanks for your message about “${payload.product}”.`,
    '',
    productAngle(payload.product, locale),
    '',
    'I suggest a 20-minute call to frame the need and decide the best next step.',
    '',
    `You can reply to this email or call me at ${SITE.phoneDisplay}.`,
    '',
    'Best,',
    'Adams — Flow',
  ].join('\n')
}

export function buildAckEmail(payload: ContactPayload): { subject: string; text: string; html: string } {
  const fr = payload.locale !== 'en'
  const firstName = payload.name.trim().split(/\s+/)[0] || payload.name
  const { html } = renderAckEmail(payload, firstName)

  if (fr) {
    return {
      subject: `Flow — votre projet est bien reçu`,
      text: [
        `Bonjour ${firstName},`,
        '',
        'Merci. Nous avons bien reçu ce que vous voulez construire.',
        '',
        payload.need.trim(),
        '',
        'Adams vous recontacte sous 24–48 h ouvrées.',
        `En attendant, vous pouvez l’appeler au ${SITE.phoneDisplay}.`,
        '',
        '— Flow',
        SITE.tagline,
        'flowsurmesure.com',
      ].join('\n'),
      html,
    }
  }

  return {
    subject: `Flow — we have your project`,
    text: [
      `Hi ${firstName},`,
      '',
      'Thank you. We have what you want to build.',
      '',
      payload.need.trim(),
      '',
      'Adams will get back to you within 1–2 business days.',
      `In the meantime, you can call ${SITE.phoneDisplay}.`,
      '',
      '— Flow',
      SITE.tagline,
      'flowsurmesure.com',
    ].join('\n'),
    html,
  }
}

export function buildOwnerNotification(
  payload: ContactPayload,
  temperature: LeadTemperature
): { subject: string; text: string; html: string } {
  const firstName = payload.name.trim().split(/\s+/)[0] || payload.name
  const draft = buildReplyDraft(payload)
  const { html } = renderOwnerEmail(payload, temperature, draft, firstName)
  return {
    subject: `Flow — ${payload.name} · ${payload.product} · ${temperature}`,
    text: [
      `Nouveau projet depuis le site Flow`,
      `Température : ${temperature}`,
      '',
      `Produit   : ${payload.product}`,
      `Besoin    : ${payload.need}`,
      `Avancement: ${payload.stage}`,
      `Budget    : ${payload.budget}`,
      `Démarrage : ${payload.timeline}`,
      `Nom       : ${payload.name}`,
      `Email     : ${payload.email}`,
      `Téléphone : ${payload.phone?.trim() || 'Non renseigné'}`,
      `Locale    : ${payload.locale || 'fr'}`,
      '',
      '──────── Brouillon de réponse (à valider) ────────',
      draft,
    ].join('\n'),
    html,
  }
}

/** In-memory rate limit (per serverless instance). */
const hits = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(ip: string, limit = 5, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count += 1
  return true
}
