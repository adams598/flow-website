import Anthropic from '@anthropic-ai/sdk'
import { checkRateLimit } from '@/lib/contact'
import { ASSISTANT_ENABLED, ASSISTANT_LIMITS, buildSystemPrompt, isValidConversation, toMessageParams } from '@/lib/assistant'
import { isLocale } from '@/lib/i18n'

export const runtime = 'nodejs'

/**
 * Démo « agent IA » du site : répond aux visiteurs à partir du contenu du site, en streaming texte.
 * Clé lue dans ANTHROPIC_API_KEY (variable d'environnement de l'hébergeur, jamais dans le dépôt).
 */
export async function POST(request: Request) {
  if (!ASSISTANT_ENABLED) {
    return Response.json({ error: 'unavailable' }, { status: 503 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'missing_config' }, { status: 503 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  // 30 messages par heure et par visiteur : assez pour discuter, pas assez pour abuser de la démo.
  if (!checkRateLimit(`assistant:${ip}`, 30)) {
    return Response.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: { messages?: unknown; locale?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }
  if (!isValidConversation(body.messages)) {
    return Response.json({ error: 'invalid_payload' }, { status: 400 })
  }
  const locale = typeof body.locale === 'string' && isLocale(body.locale) ? body.locale : 'fr'

  const client = new Anthropic()
  const stream = client.beta.messages.stream({
    model: 'claude-opus-5-5',
    max_tokens: ASSISTANT_LIMITS.maxOutputTokens,
    // Conversation courte de type chat : effort bas suffit et garde des réponses rapides.
    output_config: { effort: 'low' },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: [{ type: 'text', text: buildSystemPrompt(locale), cache_control: { type: 'ephemeral' } }],
    messages: toMessageParams(body.messages),
  })

  // On attend le premier événement avant d'ouvrir la réponse. Un refus de l'API
  // (solde, quota, clé) devient alors un JSON, au lieu d'un flux déjà envoyé qui casse.
  const iterator = stream[Symbol.asyncIterator]()
  let first: Awaited<ReturnType<typeof iterator.next>>
  try {
    first = await iterator.next()
  } catch (error) {
    return assistantFailure(error)
  }

  const encoder = new TextEncoder()
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        let step = first
        while (!step.done) {
          const event = step.value
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text))
          }
          step = await iterator.next()
        }
        const final = await stream.finalMessage()
        if (final.stop_reason === 'refusal') {
          controller.enqueue(
            encoder.encode(
              locale === 'fr'
                ? "Je ne peux pas répondre à cette demande. Pour votre projet, le plus simple est d'écrire à Adams via le formulaire de contact."
                : 'I cannot answer that request. For your project, the simplest is to write to Adams through the contact form.',
            ),
          )
        }
        controller.close()
      } catch (error) {
        logAssistantError(error)
        controller.close()
      }
    },
    cancel() {
      stream.abort()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

function logAssistantError(error: unknown) {
  if (error instanceof Anthropic.RateLimitError) {
    console.error('assistant: rate limited by API')
  } else if (error instanceof Anthropic.APIError) {
    console.error(`assistant: API error ${error.status}`, error.message)
  } else {
    console.error('assistant: stream error', error)
  }
}

/** Erreur connue de l'API : le widget affiche le message d'indisponibilité, sans overlay. */
function assistantFailure(error: unknown): Response {
  logAssistantError(error)
  if (error instanceof Anthropic.RateLimitError) {
    return Response.json({ error: 'rate_limited' }, { status: 429 })
  }
  return Response.json({ error: 'unavailable' }, { status: 503 })
}
