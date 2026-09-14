'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { THEME_COOKIE, THEME_STORAGE_KEY, type Theme } from '@/lib/theme'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

function persistTheme(theme: Theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  document.cookie = `${THEME_COOKIE}=${theme};path=/;max-age=31536000;SameSite=Lax`
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme: Theme
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    const next = stored === 'light' || stored === 'dark' ? stored : initialTheme
    setThemeState(next)
    applyTheme(next)
    persistTheme(next)
  }, [initialTheme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    applyTheme(next)
    persistTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [setTheme, theme])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
