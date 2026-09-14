import type { Locale } from './config'
import { en } from './en'
import { fr } from './fr'
import type { Dictionary } from './types'

const dictionaries: Record<Locale, Dictionary> = { fr, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export function getService(locale: Locale, slug: string) {
  return getDictionary(locale).services.items.find((item) => item.slug === slug)
}

export function getRealisation(locale: Locale, slug: string) {
  return getDictionary(locale).realisations.items.find((item) => item.slug === slug)
}

export function serviceSlugs() {
  return fr.services.items.map((item) => item.slug)
}

export function realisationSlugs() {
  return fr.realisations.items.map((item) => item.slug)
}

export type { Dictionary, Realisation, Service } from './types'
export type { Locale } from './config'
export { href, locales, defaultLocale, isLocale, localeLabels } from './config'
