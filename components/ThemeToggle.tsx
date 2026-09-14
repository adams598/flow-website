'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'
import { useI18n } from './LocaleProvider'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const { dict } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/20 bg-surface-container-low text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors ${className}`}
      aria-label={isDark ? dict.theme.toLight : dict.theme.toDark}
      title={isDark ? dict.theme.light : dict.theme.dark}
      suppressHydrationWarning
    >
      {!mounted ? (
        <Sun size={18} className="opacity-0" aria-hidden />
      ) : isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  )
}
