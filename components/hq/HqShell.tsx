'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, LogOut, Palette } from 'lucide-react'
import { FlowMark } from '@/components/FlowMark'
import { HQ_PROFILES } from '@/lib/hq/profiles'
import { AgentAvatar } from './AgentAvatar'

/** Petite tête d'avatar dans un cercle (barre latérale, messages). */
export function AvatarBadge({ agentId, size = 36 }: { agentId: string; size?: number }) {
  const profile = HQ_PROFILES.find((p) => p.id === agentId)
  if (!profile) return null
  return (
    <span
      className="inline-flex shrink-0 items-end justify-center overflow-hidden rounded-full bg-surface-container-high border border-outline-variant/40"
      style={{ width: size, height: size }}
    >
      <AgentAvatar look={profile.look} size={size * 0.82} />
    </span>
  )
}

export function HqShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [running, setRunning] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let alive = true
    const load = async () => {
      const res = await fetch('/api/hq/status').catch(() => null)
      if (alive && res?.ok) setRunning(((await res.json()) as { running: Record<string, boolean> }).running)
    }
    void load()
    const t = setInterval(load, 5000)
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [])

  async function logout() {
    await fetch('/api/hq/auth', { method: 'DELETE' })
    window.location.href = '/hq/login'
  }

  const navItem = (href: string, label: string, Icon: typeof LayoutGrid) => (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-label transition-colors ${
        pathname === href
          ? 'bg-primary-container/10 text-primary-fixed'
          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b lg:border-b-0 lg:border-r border-outline-variant/25 bg-surface-container-lowest lg:sticky lg:top-0 lg:h-screen flex flex-col">
        <Link href="/hq" className="flex items-center gap-3 px-5 h-16 border-b border-outline-variant/20">
          <FlowMark tone="cyan" className="h-8 w-8" />
          <div className="leading-tight">
            <p className="font-headline font-extrabold tracking-tight">Flow HQ</p>
            <p className="text-[11px] text-on-surface-variant font-label">Centre de pilotage</p>
          </div>
        </Link>

        <nav className="p-3 space-y-1">{navItem('/hq', 'Vue d’ensemble', LayoutGrid)}</nav>

        <div className="px-3 pt-2">
          <p className="hq-kicker px-3 mb-2">Agents</p>
          <ul className="space-y-1">
            {HQ_PROFILES.map((p) => {
              const active = pathname === `/hq/agents/${p.id}`
              const busy = running[p.id]
              return (
                <li key={p.id}>
                  <Link
                    href={`/hq/agents/${p.id}`}
                    className={`hq-wave flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      active ? 'bg-primary-container/10' : 'hover:bg-surface-container'
                    }`}
                  >
                    <span className="relative">
                      <AvatarBadge agentId={p.id} size={36} />
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-container-lowest ${
                          busy ? 'bg-primary-container hq-dot-live' : 'bg-outline'
                        }`}
                      />
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-sm font-headline font-bold ${active ? 'text-primary-fixed' : ''}`}>
                        {p.name}
                      </span>
                      <span className="block text-[11px] text-on-surface-variant truncate">
                        {busy ? 'Au travail…' : p.role}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-auto p-3 border-t border-outline-variant/20 space-y-1">
          {navItem('/hq/design-system', 'Charte', Palette)}
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-label text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          >
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </button>
        </div>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  )
}
