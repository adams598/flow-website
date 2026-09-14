export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeCookie = 'flow-locale'

export const localeLabels: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
}

export const localeOg: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
}

const francophoneCountries = new Set([
  'FR',
  'MC',
  'LU',
  'SN',
  'CI',
  'CM',
  'BF',
  'ML',
  'NE',
  'TG',
  'BJ',
  'GA',
  'CG',
  'CD',
  'MG',
  'HT',
  'GN',
  'TD',
  'CF',
  'RW',
  'BI',
  'DJ',
  'KM',
  'SC',
  'RE',
  'GP',
  'MQ',
  'GF',
  'YT',
  'BL',
  'MF',
  'PM',
  'NC',
  'PF',
  'WF',
  'TF',
])

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'fr' || value === 'en'
}

export function parseAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, qValue] = part.trim().split(';q=')
      return { tag: tag.toLowerCase(), q: qValue ? Number(qValue) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    if (tag.startsWith('fr')) return 'fr'
    if (tag.startsWith('en')) return 'en'
  }

  return null
}

export function localeFromCountry(country: string | null): Locale | null {
  if (!country) return null
  const code = country.toUpperCase()
  if (francophoneCountries.has(code)) return 'fr'
  return 'en'
}

export function detectLocale(input: {
  cookie?: string | null
  acceptLanguage?: string | null
  country?: string | null
}): Locale {
  if (isLocale(input.cookie)) return input.cookie

  const fromBrowser = parseAcceptLanguage(input.acceptLanguage ?? null)
  if (fromBrowser) return fromBrowser

  return localeFromCountry(input.country ?? null) ?? defaultLocale
}

export function localeAlternates(locale: Locale, path = '/') {
  const normalized = path === '/' ? '' : path
  return {
    canonical: `/${locale}${normalized}`,
    languages: {
      fr: `/fr${normalized}`,
      en: `/en${normalized}`,
      'x-default': `/fr${normalized}`,
    },
  }
}

export function href(locale: Locale, path = '/') {
  const [pathname, hash] = path.split('#')
  const normalized = pathname === '/' || pathname === '' ? '' : pathname
  const base = `/${locale}${normalized}`
  return hash ? `${base}#${hash}` : base
}

export function replaceLocaleInPath(pathname: string, next: Locale) {
  const segments = pathname.split('/')
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = next
    return segments.join('/') || `/${next}`
  }
  return `/${next}${pathname === '/' ? '' : pathname}`
}
