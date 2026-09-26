'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function BriefForm() {
  const router = useRouter()
  const [brief, setBrief] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!brief.trim()) return
    setLoading(true)
    setError('')
    const res = await fetch('/api/hq/missions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief: brief.trim() }),
    })
    setLoading(false)
    if (!res.ok) {
      setError('Impossible de lancer la mission.')
      return
    }
    const data = (await res.json()) as { missionId: string }
    router.push(`/hq/missions/${data.missionId}`)
  }

  return (
    <form onSubmit={submit} className="glass-panel rounded-xl border border-outline-variant/20 p-5">
      <p className="font-label text-xs uppercase tracking-widest text-primary-container mb-2">
        Brief du CEO
      </p>
      <textarea
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        rows={3}
        placeholder="Ex : Prépare la semaine LinkedIn (perso + page Flow) et un brouillon de réponse type lead site…"
        className="w-full rounded-lg bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-sm mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary-container/40"
      />
      {error && <p className="text-error text-sm mb-2">{error}</p>}
      <button
        type="submit"
        disabled={loading || !brief.trim()}
        className="gradient-bg text-on-primary px-5 py-2.5 rounded-lg font-label text-sm font-semibold disabled:opacity-50"
      >
        {loading ? 'Victor mobilise l’équipe…' : 'Lancer la mission'}
      </button>
    </form>
  )
}
