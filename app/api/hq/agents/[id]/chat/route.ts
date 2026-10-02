import { NextResponse } from 'next/server'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { getLiveState, runAgent } from '@/lib/hq/claude'
import { isHqAgentId } from '@/lib/hq/profiles'
import type { StreamEvent } from '@/lib/hq/types'

export const runtime = 'nodejs'
export const maxDuration = 3600

type Ctx = { params: Promise<{ id: string }> }

/** Message d'Adams → réponse de l'agent, diffusée en direct (une ligne JSON par événement). */
export async function POST(request: Request, { params }: Ctx) {
  if (!(await isHqAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  if (!isHqAgentId(id)) return NextResponse.json({ error: 'Agent inconnu' }, { status: 404 })
  const { message } = (await request.json()) as { message?: string }
  const text = message?.trim()
  if (!text) return NextResponse.json({ error: 'Message vide' }, { status: 400 })
  if (getLiveState(id).running) {
    return NextResponse.json({ error: 'Cet agent travaille déjà. Attends sa réponse.' }, { status: 409 })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let open = true
      // Si Adams ferme la page, l'agent continue et sa réponse reste enregistrée.
      const emit = (e: StreamEvent) => {
        if (!open) return
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(e)}\n`))
        } catch {
          open = false
        }
      }
      runAgent(id, text, emit)
        .then((turn) => emit({ type: 'done', turn }))
        .catch((err: unknown) =>
          emit({ type: 'error', message: err instanceof Error ? err.message : 'Erreur inconnue' })
        )
        .finally(() => {
          if (open) {
            open = false
            try {
              controller.close()
            } catch {
              /* déjà fermé */
            }
          }
        })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  })
}
