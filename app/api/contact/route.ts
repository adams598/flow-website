import { Resend } from 'resend'
import { SITE } from '@/lib/site'
import {
  buildAckEmail,
  buildOwnerNotification,
  checkRateLimit,
  isValidContactPayload,
  qualifyLead,
} from '@/lib/contact'

export const runtime = 'nodejs'

const FROM = process.env.CONTACT_FROM_EMAIL || 'Flow <onboarding@resend.dev>'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'missing_config' }, { status: 503 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  if (!isValidContactPayload(body)) {
    return Response.json({ error: 'invalid_payload' }, { status: 400 })
  }

  // Honeypot: bots fill hidden "website" field
  if (body.website?.trim()) {
    return Response.json({ ok: true })
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE.email
  const temperature = qualifyLead(body)
  const owner = buildOwnerNotification(body, temperature)
  const ack = buildAckEmail(body)

  const resend = new Resend(apiKey)

  const ownerResult = await resend.emails.send({
    from: FROM,
    to: [to],
    replyTo: body.email.trim(),
    subject: owner.subject,
    text: owner.text,
    html: owner.html,
  })

  if (ownerResult.error) {
    console.error('[contact] owner email failed', ownerResult.error)
    return Response.json({ error: 'send_failed' }, { status: 502 })
  }

  const ackResult = await resend.emails.send({
    from: FROM,
    to: [body.email.trim()],
    replyTo: to,
    subject: ack.subject,
    text: ack.text,
    html: ack.html,
  })

  if (ackResult.error) {
    console.error('[contact] ack email failed', ackResult.error)
    // Owner already notified — still report success to the user
  }

  return Response.json({ ok: true, temperature })
}
