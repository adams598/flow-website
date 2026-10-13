import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import type { Dictionary, Realisation, Service } from '@/lib/i18n/types'
import { localeAlternates, localeOg, locales, type Locale } from '@/lib/i18n/config'

/**
 * Données structurées schema.org (JSON-LD) : ce que Google lit pour comprendre qui est Flow,
 * ce qu'il propose et où, et pour l'afficher en résultat enrichi ou en recommandation.
 * Tout reprend les textes visibles du site : aucune information qui n'y figure pas.
 */

const abs = (path: string) => new URL(path, SITE.url).toString()
const ORG_ID = `${SITE.url}/#organisation`

export function organizationJsonLd(locale: Locale, dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: 'Flow sur mesure',
    url: abs(`/${locale}`),
    logo: abs('/icon.png'),
    image: abs('/og-image.png'),
    slogan: SITE.tagline,
    description: dict.meta.description,
    email: SITE.email,
    telephone: '+33749178391',
    areaServed: { '@type': 'Country', name: 'France' },
    availableLanguage: ['fr', 'en'],
    sameAs: [SITE.linkedin, SITE.github],
    knowsAbout: dict.meta.keywords.filter((k) => k !== SITE.name),
    founder: {
      '@type': 'Person',
      name: dict.about.founderName,
      jobTitle: dict.about.jobTitle,
      sameAs: [SITE.linkedin],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33749178391',
      email: SITE.email,
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
      areaServed: 'FR',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${SITE.name} — ${dict.offers.kicker}`,
      itemListElement: dict.services.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.headline,
          url: abs(`/${locale}/services/${s.slug}`),
        },
      })),
    },
  }
}

export function websiteJsonLd(locale: Locale, dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#site`,
    name: SITE.name,
    url: abs(`/${locale}`),
    inLanguage: locale,
    description: dict.meta.description,
    publisher: { '@id': ORG_ID },
  }
}

export function serviceJsonLd(locale: Locale, item: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: item.h1,
    serviceType: item.h1,
    description: [item.headline, ...item.body].join(' '),
    url: abs(`/${locale}/services/${item.slug}`),
    inLanguage: locale,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'France' },
  }
}

export function realisationJsonLd(locale: Locale, item: Realisation) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    headline: item.headline,
    description: item.description,
    url: abs(`/${locale}/realisations/${item.slug}`),
    image: abs(item.image),
    creator: { '@id': ORG_ID },
    ...(item.siteLink ? { sameAs: item.siteLink } : {}),
  }
}

export function faqJsonLd(locale: Locale, dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${abs(`/${locale}/faq`)}#faq`,
    url: abs(`/${locale}/faq`),
    inLanguage: locale,
    isPartOf: { '@id': `${SITE.url}/#site` },
    mainEntity: dict.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/** Titre, description, canonique et partage (Open Graph, X) propres à une page intérieure. */
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  type: 'website' | 'article' = 'website',
): Metadata {
  const url = `/${locale}${path}`
  const socialTitle = `${title} · ${SITE.name}`
  return {
    title,
    description,
    alternates: localeAlternates(locale, path),
    openGraph: {
      title: socialTitle,
      description,
      type,
      url,
      locale: localeOg[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeOg[l]),
      siteName: SITE.name,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: ['/og-image.png'],
    },
  }
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path) })),
  }
}
