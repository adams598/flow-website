import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { locales } from '@/lib/i18n/config'
import { guideSlugs, realisationSlugs, serviceSlugs } from '@/lib/i18n'

/**
 * Plan du site pour les moteurs de recherche : chaque page publique, dans chaque langue,
 * avec ses équivalents (hreflang) pour que Google serve la bonne version à chacun.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number; freq: 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1, freq: 'weekly' },
    { path: '/faq', priority: 0.8, freq: 'monthly' },
    ...guideSlugs().map((s) => ({ path: `/guides/${s}`, priority: 0.8, freq: 'monthly' as const })),
    ...serviceSlugs().map((s) => ({ path: `/services/${s}`, priority: 0.9, freq: 'monthly' as const })),
    ...realisationSlugs().map((s) => ({ path: `/realisations/${s}`, priority: 0.7, freq: 'monthly' as const })),
  ]
  const now = new Date()
  return paths.flatMap(({ path, priority, freq }) =>
    locales.map((locale) => ({
      url: `${SITE.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority: locale === 'fr' ? priority : Math.round(priority * 0.8 * 10) / 10,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${SITE.url}/${l}${path}`])),
          'x-default': `${SITE.url}/fr${path}`,
        },
      },
    }))
  )
}
