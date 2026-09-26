'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { HQ_AGENTS } from '@/lib/hq/org'
import type { ChatTurn, Deliverable, HqAgent } from '@/lib/hq/types'
import { CuteAvatar, HqShell } from './HqShell'
import { HqMarkdown } from './HqMarkdown'

type Tab = 'chat' | 'livrables' | 'historique'

export function AgentWorkspace({ agent }: { agent: HqAgent }) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('chat')
  const [thread, setThread] = useState<ChatTurn[]>([])
  const [deliverables, setDeliverables] = useState<Deliverable[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const pendingPlan = [...thread].reverse().find((t) => t.role === 'agent')?.kind === 'plan'

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.id])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread, loading])

  async function load() {
    const [chatRes, delRes] = await Promise.all([
      fetch(`/api/hq/chat?agentId=${agent.id}`),
      fetch(`/api/hq/deliverables?agentId=${agent.id}`),
    ])
    if (chatRes.ok) {
      const data = (await chatRes.json()) as { thread: ChatTurn[] }
      setThread(data.thread ?? [])
    }
    if (delRes.ok) {
      const data = (await delRes.json()) as { deliverables: Deliverable[] }
      setDeliverables(data.deliverables ?? [])
    }
  }

  async function send(mode: 'plan' | 'execute', text?: string) {
    const payload = (text ?? message).trim()
    if (!payload) return
    setLoading(true)
    setError('')
    if (mode === 'plan') setMessage('')
    const res = await fetch('/api/hq/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId: agent.id, message: payload, mode }),
    })
    const data = (await res.json()) as { error?: string }
    setLoading(false)
    if (!res.ok) {
      setError(data.error ?? 'Erreur')
      return
    }
    await load()
  }

  const lastAdams = [...thread].reverse().find((t) => t.role === 'adams')?.content ?? ''

  return (
    <HqShell>
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <CuteAvatar agentId={agent.id} name={agent.name} size={88} />
          <div className="flex-1">
            <p className="font-label text-xs uppercase tracking-widest text-primary-container">
              {agent.teamLabel}
            </p>
            <h1 className="font-headline text-3xl font-bold">{agent.name}</h1>
            <p className="text-primary-container font-label">{agent.title}</p>
            <p className="text-sm text-on-surface-variant mt-1">{agent.expertise}</p>
          </div>
          <select
            value={agent.id}
            onChange={(e) => router.push(`/hq/agents/${e.target.value}`)}
            className="bg-surface-container-high border border-outline-variant/30 rounded-full px-4 py-2 text-sm"
          >
            {HQ_AGENTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </header>

        <div className="flex gap-2 mb-6 font-label text-sm">
          {(['chat', 'livrables', 'historique'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full capitalize ${
                tab === t ? 'bg-primary-container/20 text-primary-fixed' : 'text-on-surface-variant'
              }`}
            >
              {t === 'chat' ? 'Discussion' : t === 'livrables' ? 'Livrables' : 'Historique'}
            </button>
          ))}
        </div>

        {tab === 'chat' && (
          <section className="glass-panel rounded-2xl border border-outline-variant/20 p-5 min-h-[480px] flex flex-col">
            <p className="text-xs text-on-surface-variant mb-4">
              Comme chez Zineb : d&apos;abord un plan, tu valides, ensuite le livrable (tokens).
            </p>
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[50vh] mb-4">
              {thread.length === 0 && (
                <p className="text-sm text-on-surface-variant">
                  Dis à {agent.name} ce que tu veux. Ex. « un carrousel LinkedIn preuve Objectif TCF ».
                </p>
              )}
              {thread.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    m.role === 'adams'
                      ? 'bg-primary-container/15 ml-10 whitespace-pre-wrap'
                      : 'bg-surface-container-high mr-10'
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-wider font-label text-on-surface-variant mb-1">
                    {m.role === 'adams' ? 'Adams' : agent.name}
                    {m.kind === 'plan' ? ' · plan' : ''}
                  </p>
                  {m.role === 'adams' ? m.content : <HqMarkdown content={m.content} />}
                </div>
              ))}
              {loading && <p className="text-sm animate-pulse text-on-surface-variant">{agent.name} prépare…</p>}
              <div ref={endRef} />
            </div>
            {error && <p className="text-error text-sm mb-2">{error}</p>}
            {pendingPlan && !loading && (
              <button
                type="button"
                onClick={() => send('execute', lastAdams)}
                className="mb-3 gradient-bg text-on-primary rounded-full py-2.5 font-label text-sm font-semibold"
              >
                Valider le plan et générer
              </button>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void send('plan')
              }}
              className="flex gap-2"
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder={`Parler à ${agent.name}…`}
                className="flex-1 rounded-2xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-sm resize-none"
              />
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="gradient-bg text-on-primary px-4 rounded-2xl font-label text-sm font-semibold disabled:opacity-50"
              >
                Plan
              </button>
            </form>
          </section>
        )}

        {tab === 'livrables' && (
          <ul className="space-y-3">
            {deliverables.length === 0 && (
              <li className="text-sm text-on-surface-variant">Pas encore de livrable enregistré.</li>
            )}
            {deliverables.map((d) => (
              <li key={d.id} className="rounded-2xl border border-outline-variant/20 p-4 bg-surface-container-low">
                <p className="font-headline font-semibold mb-1">{d.title}</p>
                <p className="text-xs text-on-surface-variant mb-2">
                  {new Date(d.at).toLocaleString('fr-FR')}
                </p>
                <HqMarkdown content={d.body} />
              </li>
            ))}
          </ul>
        )}

        {tab === 'historique' && (
          <ul className="space-y-2 text-sm">
            {thread.map((m) => (
              <li key={m.id} className="border-l-2 border-primary-container/30 pl-3">
                <span className="text-xs text-on-surface-variant">
                  {new Date(m.at).toLocaleString('fr-FR')} · {m.role}
                </span>
                <p className="line-clamp-3">{m.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </HqShell>
  )
}
