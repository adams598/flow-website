'use client'

import { useEffect, useRef, useState } from 'react'
import type { CooMessage } from '@/lib/hq/types'
import { HqMarkdown } from './HqMarkdown'

type Props = {
  thread: CooMessage[]
  onThreadChange?: (thread: CooMessage[]) => void
}

export function CooDesk({ thread, onThreadChange }: Props) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'briefings'>('all')
  const [briefingLoading, setBriefingLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const visible =
    filter === 'briefings' ? thread.filter((m) => m.kind === 'briefing' || m.content.startsWith('### Point')) : thread

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread, loading, filter])

  async function askBriefing() {
    setBriefingLoading(true)
    setError('')
    const res = await fetch('/api/hq/briefing', { method: 'POST' })
    setBriefingLoading(false)
    if (!res.ok) {
      setError('Impossible d’obtenir le point')
      return
    }
    const threadRes = await fetch('/api/hq/coo')
    if (threadRes.ok) {
      const data = (await threadRes.json()) as { thread: CooMessage[] }
      onThreadChange?.(data.thread ?? [])
      setFilter('briefings')
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    const text = message.trim()
    setMessage('')
    setLoading(true)
    setError('')
    onThreadChange?.([
      ...thread,
      { id: 'tmp', at: new Date().toISOString(), role: 'adams', content: text, kind: 'chat' },
    ])
    const res = await fetch('/api/hq/coo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })
    const data = (await res.json()) as { reply?: string; error?: string }
    setLoading(false)
    if (!res.ok) {
      setError(data.error ?? 'Erreur')
      onThreadChange?.(thread)
      return
    }
    onThreadChange?.([
      ...thread,
      { id: crypto.randomUUID(), at: new Date().toISOString(), role: 'adams', content: text, kind: 'chat' },
      {
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
        role: 'coo',
        content: data.reply ?? '',
        kind: 'chat',
      },
    ])
  }

  return (
    <section className="glass-panel rounded-xl border border-outline-variant/20 p-5 flex flex-col min-h-[420px]">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="font-label text-xs uppercase tracking-widest text-primary-container">
          Parler à Victor
        </p>
        <div className="flex gap-1 text-[10px] font-label">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2 py-1 rounded-full ${filter === 'all' ? 'bg-primary-container/20 text-primary-fixed' : 'text-on-surface-variant'}`}
          >
            Tout
          </button>
          <button
            type="button"
            onClick={() => setFilter('briefings')}
            className={`px-2 py-1 rounded-full ${filter === 'briefings' ? 'bg-primary-container/20 text-primary-fixed' : 'text-on-surface-variant'}`}
          >
            Points
          </button>
          <button
            type="button"
            disabled={briefingLoading}
            onClick={() => void askBriefing()}
            className="px-2 py-1 rounded-full border border-outline-variant/30 text-on-surface-variant hover:text-primary-fixed disabled:opacity-50"
          >
            {briefingLoading ? '…' : 'Point maintenant'}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-80 pr-1">
        {visible.length === 0 && (
          <p className="text-sm text-on-surface-variant">
            Victor tourne en autonomie et te fera des points d&apos;avancement ici. Écris seulement pour une
            exception (offre, deal, cap).
          </p>
        )}
        {visible.map((m) => {
          const isBriefing = m.kind === 'briefing' || m.content.startsWith('### Point')
          return (
            <div
              key={m.id}
              className={`rounded-lg px-3 py-2 text-sm ${
                m.role === 'adams'
                  ? 'bg-primary-container/15 ml-8 whitespace-pre-wrap'
                  : isBriefing
                    ? 'bg-primary-container/10 border border-primary-container/25 mr-4'
                    : 'bg-surface-container-high mr-8'
              }`}
            >
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant mb-1 font-label">
                {m.role === 'adams' ? 'Adams' : isBriefing ? 'Victor · point' : 'Victor'}
                <span className="ml-2 opacity-70">{new Date(m.at).toLocaleTimeString('fr-FR')}</span>
              </p>
              {m.role === 'adams' ? m.content : <HqMarkdown content={m.content} />}
            </div>
          )
        })}
        {loading && <p className="text-sm text-on-surface-variant animate-pulse">Victor réfléchit…</p>}
        <div ref={endRef} />
      </div>
      {error && <p className="text-error text-sm mb-2">{error}</p>}
      <form onSubmit={send} className="flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          placeholder="Point particulier pour Victor…"
          className="flex-1 rounded-lg bg-surface-container-high border border-outline-variant/30 px-3 py-2 text-sm resize-none"
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="gradient-bg text-on-primary px-4 rounded-lg font-label text-sm font-semibold disabled:opacity-50"
        >
          Envoyer
        </button>
      </form>
    </section>
  )
}
