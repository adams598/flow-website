'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUp, Loader2, RotateCcw } from 'lucide-react'
import type { AgentLiveState, ChatTurn, HqAgent, StreamEvent } from '@/lib/hq/types'
import { AgentAvatar, type AvatarState } from './AgentAvatar'
import { HqMarkdown } from './HqMarkdown'
import { AvatarBadge, HqShell } from './HqShell'

const TOOL_LABELS: Record<string, string> = {
  WebSearch: 'Recherche web',
  WebFetch: 'Lecture de sites',
  Read: 'Lecture du dossier prospection',
  Write: 'Rédaction de brouillons',
  Edit: 'Mise à jour du CRM',
  Grep: 'Recherche dans les notes',
  Glob: 'Exploration des fichiers',
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export function AgentChat({
  agent,
  initialTurns,
  initialLive,
}: {
  agent: HqAgent
  initialTurns: ChatTurn[]
  initialLive: AgentLiveState
}) {
  const [turns, setTurns] = useState<ChatTurn[]>(initialTurns)
  const [input, setInput] = useState('')
  const [running, setRunning] = useState(initialLive.running)
  const [steps, setSteps] = useState<string[]>(initialLive.running ? initialLive.steps : [])
  const [streamText, setStreamText] = useState<string[]>([])
  const [talking, setTalking] = useState(false)
  const [error, setError] = useState('')
  const [streaming, setStreaming] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const talkTimer = useRef<ReturnType<typeof setTimeout>>()

  const avatarState: AvatarState = talking ? 'talking' : running ? 'thinking' : 'idle'

  const speak = useCallback((ms = 2200) => {
    setTalking(true)
    clearTimeout(talkTimer.current)
    talkTimer.current = setTimeout(() => setTalking(false), ms)
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [turns, steps, streamText])

  // L'agent travaillait déjà (page rechargée) : on attend sa réponse.
  useEffect(() => {
    if (!running || streaming) return
    const poll = setInterval(async () => {
      const res = await fetch(`/api/hq/agents/${agent.id}`)
      if (!res.ok) return
      const data = (await res.json()) as { thread: { turns: ChatTurn[] }; live: AgentLiveState }
      setSteps(data.live.steps)
      if (!data.live.running) {
        setTurns(data.thread.turns)
        setRunning(false)
        setSteps([])
        speak()
      }
    }, 4000)
    return () => clearInterval(poll)
  }, [agent.id, running, speak, streaming])

  async function send(message: string) {
    const text = message.trim()
    if (!text || running) return
    setError('')
    setInput('')
    setStreaming(true)
    setRunning(true)
    setSteps([])
    setStreamText([])
    setTurns((t) => [...t, { id: `local-${Date.now()}`, at: new Date().toISOString(), role: 'adams', content: text }])

    try {
      const res = await fetch(`/api/hq/agents/${agent.id}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error ?? `Erreur ${res.status}`)
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        let nl: number
        while ((nl = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, nl).trim()
          buffer = buffer.slice(nl + 1)
          if (!line) continue
          const evt = JSON.parse(line) as StreamEvent
          if (evt.type === 'step') setSteps((s) => [...s, evt.label])
          if (evt.type === 'text') {
            setStreamText((s) => [...s, evt.text])
            speak(Math.min(6000, 800 + evt.text.length * 25))
          }
          if (evt.type === 'done') {
            setTurns((t) => [...t, evt.turn])
            speak()
          }
          if (evt.type === 'error') setError(evt.message)
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
    } finally {
      setStreaming(false)
      setRunning(false)
      setSteps([])
      setStreamText([])
    }
  }

  async function reset() {
    if (running || !turns.length) return
    if (!window.confirm(`Démarrer une nouvelle conversation avec ${agent.name} ? L'historique actuel est archivé.`)) return
    const res = await fetch(`/api/hq/agents/${agent.id}`, { method: 'DELETE' })
    if (res.ok) setTurns([])
  }

  const status = running ? (talking ? 'Te répond…' : 'Travaille…') : 'Disponible'

  return (
    <HqShell>
      <div className="xl:grid xl:grid-cols-[1fr_320px] min-h-screen">
        {/* Conversation */}
        <section className="flex flex-col h-screen min-w-0">
          <header className="h-16 shrink-0 border-b border-outline-variant/25 px-5 md:px-8 flex items-center gap-3">
            <AvatarBadge agentId={agent.id} size={38} />
            <div className="min-w-0">
              <h1 className="font-headline font-extrabold leading-tight">{agent.name}</h1>
              <p className="text-xs text-on-surface-variant flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${running ? 'bg-primary-container hq-dot-live' : 'bg-outline'}`}
                />
                {agent.role} · {status}
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={running || !turns.length}
              className="ml-auto inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 px-3 py-2 text-xs font-label text-on-surface-variant hover:text-primary hover:border-primary/40 disabled:opacity-40"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Nouvelle conversation
            </button>
          </header>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 space-y-7">
              {turns.length === 0 && !running && (
                <div className="py-16 text-center space-y-3">
                  <p className="hq-kicker">Nouvelle conversation</p>
                  <p className="font-headline text-2xl font-extrabold tracking-tight">
                    Que dois-je faire pour toi, Adams ?
                  </p>
                  <p className="text-sm text-on-surface-variant max-w-md mx-auto">{agent.tagline}</p>
                  <div className="flex flex-wrap justify-center gap-2 pt-3">
                    {agent.quickPrompts.map((q) => (
                      <button
                        key={q.label}
                        type="button"
                        onClick={() => send(q.prompt)}
                        className="rounded-lg border border-outline-variant/40 px-3 py-2 text-sm font-label text-on-surface-variant hover:text-primary hover:border-primary/40"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {turns.map((turn) =>
                turn.role === 'adams' ? (
                  <div key={turn.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary-container/10 border border-primary-container/25 px-4 py-3 text-sm whitespace-pre-wrap">
                      {turn.content}
                    </div>
                  </div>
                ) : (
                  <article key={turn.id} className="flex gap-3">
                    <AvatarBadge agentId={agent.id} size={32} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-label text-on-surface-variant mb-1.5">
                        <span className="font-semibold text-on-surface">{agent.name}</span> · {formatTime(turn.at)}
                      </p>
                      <div
                        className={`rounded-2xl rounded-tl-sm px-4 py-3 border ${
                          turn.error
                            ? 'bg-error-container/20 border-error/30'
                            : 'bg-surface-container-low border-outline-variant/30'
                        }`}
                      >
                        <HqMarkdown content={turn.content} />
                      </div>
                      {turn.steps && turn.steps.length > 0 && (
                        <details className="mt-1.5 text-xs text-on-surface-variant">
                          <summary className="cursor-pointer font-label hover:text-primary w-fit">
                            {turn.steps.length} action{turn.steps.length > 1 ? 's' : ''} réalisée{turn.steps.length > 1 ? 's' : ''}
                          </summary>
                          <ul className="mt-2 space-y-1 border-l border-outline-variant/40 pl-3">
                            {turn.steps.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </div>
                  </article>
                )
              )}

              {running && (
                <article className="flex gap-3">
                  <AvatarBadge agentId={agent.id} size={32} />
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="text-xs font-label text-on-surface-variant">
                      <span className="font-semibold text-on-surface">{agent.name}</span> · en cours
                    </p>
                    {streamText.length > 0 && (
                      <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-surface-container-low border border-outline-variant/30">
                        <HqMarkdown content={streamText.join('\n\n')} />
                      </div>
                    )}
                    <div className="rounded-xl border border-primary-container/25 bg-primary-container/5 px-4 py-3 text-xs space-y-1.5">
                      <p className="flex items-center gap-2 font-label text-primary-fixed">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> {agent.name} travaille
                      </p>
                      {steps.slice(-6).map((s, i) => (
                        <p key={i} className="text-on-surface-variant truncate">
                          {s}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              )}

              {error && (
                <p className="text-sm text-error bg-error-container/20 border border-error/30 rounded-xl px-4 py-2">
                  {error}
                </p>
              )}
              <div ref={endRef} />
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              void send(input)
            }}
            className="shrink-0 border-t border-outline-variant/25 bg-surface-container-lowest/80 backdrop-blur-xl"
          >
            <div className="max-w-3xl mx-auto px-5 md:px-8 py-4">
              <div className="flex items-end gap-2 rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 py-2 focus-within:border-primary-container/60">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      void send(input)
                    }
                  }}
                  rows={1}
                  placeholder={running ? `${agent.name} travaille…` : `Écrire à ${agent.name}…`}
                  disabled={running}
                  className="flex-1 resize-none bg-transparent py-2 text-sm placeholder:text-on-surface-variant/70 focus:outline-none disabled:opacity-60 max-h-40"
                />
                <button
                  type="submit"
                  disabled={running || !input.trim()}
                  className="h-9 w-9 shrink-0 rounded-lg gradient-bg text-on-primary flex items-center justify-center disabled:opacity-30"
                  aria-label="Envoyer"
                >
                  {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-2">
                Entrée pour envoyer · Maj + Entrée pour aller à la ligne · aucun envoi aux prospects sans ta validation
              </p>
            </div>
          </form>
        </section>

        {/* Fiche agent */}
        <aside className="hidden xl:flex flex-col gap-5 border-l border-outline-variant/25 bg-surface-container-lowest p-5 h-screen sticky top-0 overflow-y-auto">
          <div className="hq-stage hq-wave h-60">
            <AgentAvatar look={agent.look} size={150} state={avatarState} title={agent.name} />
          </div>
          <div>
            <h2 className="font-headline text-xl font-extrabold tracking-tight">{agent.name}</h2>
            <p className="text-sm text-primary-fixed font-label">{agent.role}</p>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{agent.tagline}</p>
          </div>
          <div>
            <p className="hq-kicker mb-2">Capacités</p>
            <ul className="space-y-1.5 text-sm text-on-surface-variant">
              {agent.tools.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
                  {TOOL_LABELS[t] ?? t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="hq-kicker mb-2">Raccourcis</p>
            <div className="space-y-1.5">
              {agent.quickPrompts.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  disabled={running}
                  onClick={() => send(q.prompt)}
                  className="w-full text-left rounded-lg border border-outline-variant/35 px-3 py-2 text-sm hover:border-primary-container/50 hover:text-primary disabled:opacity-40"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-auto text-[11px] text-on-surface-variant">
            Configuration : <code className="text-primary-fixed">{agent.sourceFile}</code>
          </p>
        </aside>
      </div>
    </HqShell>
  )
}
