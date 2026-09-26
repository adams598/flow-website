'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HqLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/hq/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (!res.ok) {
      setError('Mot de passe incorrect. En dev sans HQ_PASSWORD, utilise flow-hq-dev.')
      return
    }
    router.push('/hq')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px]" />
      <form
        onSubmit={onSubmit}
        className="glass-panel border border-outline-variant/20 rounded-xl p-8 w-full max-w-md relative z-10"
      >
        <p className="font-label text-sm uppercase tracking-[0.2em] text-primary-container mb-2">
          Flow HQ
        </p>
        <h1 className="font-headline text-2xl font-bold mb-2">QG interne</h1>
        <p className="text-on-surface-variant text-sm mb-6">
          Équipe d&apos;employés IA — accès réservé Adams.
        </p>
        <label className="block text-sm font-label mb-2" htmlFor="hq-password">
          Mot de passe
        </label>
        <input
          id="hq-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-surface-container-high border border-outline-variant/30 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-container/50"
          autoComplete="current-password"
        />
        {error && <p className="text-error text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full gradient-bg text-on-primary rounded-lg py-3 font-label font-semibold disabled:opacity-60"
        >
          {loading ? 'Connexion…' : 'Entrer'}
        </button>
      </form>
    </div>
  )
}
