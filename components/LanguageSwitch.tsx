'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  localeCookie,
  localeLabels,
  locales,
  replaceLocaleInPath,
  type Locale,
} from '@/lib/i18n/config'
import { useI18n } from './LocaleProvider'

export function LanguageSwitch() {
  const { locale, dict } = useI18n()
  const pathname = usePathname()
  const router = useRouter()

  const switchTo = (next: Locale) => {
    if (next === locale) return
    document.cookie = `${localeCookie}=${next};path=/;max-age=31536000;SameSite=Lax`
    const hash = window.location.hash
    router.push(`${replaceLocaleInPath(pathname, next)}${hash}`)
  }

  return (
    <div
      className="inline-flex h-10 items-center rounded-lg border border-outline-variant/20 bg-surface-container-low px-1"
      role="group"
      aria-label={dict.language.label}
    >
      {locales.map((item) => {
        const active = item === locale
        return (
          <button
            key={item}
            type="button"
            onClick={() => switchTo(item)}
            className={`min-w-[2rem] rounded-md px-2 py-1 font-label text-[11px] font-semibold tracking-[0.14em] transition-colors ${
              active
                ? 'text-primary'
                : 'text-on-surface-variant/70 hover:text-on-surface'
            }`}
            aria-label={dict.language.switchTo[item]}
            aria-pressed={active}
          >
            {localeLabels[item]}
          </button>
        )
      })}
    </div>
  )
}
