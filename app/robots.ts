import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

/** robots.txt : tout le site public est indexable ; l'espace interne et l'API ne le sont pas. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/hq', '/api/'] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
