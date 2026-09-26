'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FlowMark } from '@/components/FlowMark'
import { HQ_AGENTS } from '@/lib/hq/org'
import { avatarUrl } from '@/lib/hq/avatars'

const NAV = [
  { href: '/hq', label: 'Équipe' },
  { href: '/hq/studio', label: 'Studio' },
  { href: '/hq/calendrier', label: 'Calendrier' },
  { href: '/hq/coulisses', label: 'Coulisses' },
  { href: '/hq/design-system', label: 'Charte' },
]

export function HqShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/api/hq/auth', { method: 'DELETE' })
    window.location.href = '/hq/login'
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-outline-variant/15 bg-background/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <Link href="/hq" className="flex items-center gap-2 shrink-0">
            <FlowMark tone="cyan" className="h-8 w-8" />
            <span className="font-headline font-extrabold gradient-text">Flow HQ</span>
          </Link>
          <nav className="flex gap-1 overflow-x-auto text-sm font-label">
            {NAV.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                    active
                      ? 'bg-primary-container/20 text-primary-fixed'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <select
              className="bg-surface-container-high border border-outline-variant/30 rounded-full text-xs px-3 py-2 max-w-[11rem]"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) router.push(`/hq/agents/${e.target.value}`)
              }}
            >
              <option value="">Switch agent</option>
              {HQ_AGENTS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} · {a.title.split('—')[0]}
                </option>
              ))}
            </select>
            <button type="button" onClick={logout} className="text-xs text-on-surface-variant hover:text-primary">
              Sortir
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}

export function CuteAvatar({
  agentId,
  name,
  size = 72,
  working = false,
}: {
  agentId: string
  name: string
  size?: number
  working?: boolean
}) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      {working && (
        <span className="absolute -inset-1 rounded-full bg-primary-container/30 animate-pulse" />
      )}
      <img
        src={avatarUrl(agentId, size * 2)}
        alt={name}
        width={size}
        height={size}
        className="relative rounded-full border-2 border-primary-container/40 bg-surface-container-lowest object-cover"
      />
    </span>
  )
}
