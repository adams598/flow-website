export const THEME_COOKIE = 'flow-theme'
export const THEME_STORAGE_KEY = 'flow-theme'

export type Theme = 'dark' | 'light'

export function isTheme(value: string | undefined | null): value is Theme {
  return value === 'light' || value === 'dark'
}
