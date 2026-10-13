import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import '../globals.css'
import { SITE } from '@/lib/site'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LocaleProvider } from '@/components/LocaleProvider'
import {
  isLocale,
  localeOg,
  localeAlternates,
  locales,
  type Locale,
} from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'
import { THEME_COOKIE, isTheme } from '@/lib/theme'
import { JsonLd } from '@/components/JsonLd'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const dynamicParams = false

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw
  const dict = getDictionary(locale)

  return {
    // Adresse publique du site : base des liens canoniques, des versions de langue et des images de partage.
    metadataBase: new URL(SITE.url),
    applicationName: SITE.name,
    category: 'technology',
    title: {
      default: dict.meta.title,
      template: `%s · ${SITE.name}`,
    },
    description: dict.meta.description,
    keywords: [...dict.meta.keywords],
    authors: [{ name: SITE.name }],
    icons: {
      icon: [{ url: '/icon.png?v=3', type: 'image/png', sizes: '512x512' }],
      apple: [{ url: '/apple-icon.png?v=3', sizes: '180x180' }],
    },
    alternates: localeAlternates(locale),
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: 'website',
      url: `/${locale}`,
      locale: localeOg[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeOg[l]),
      siteName: SITE.name,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: dict.meta.ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    // Validation Google Search Console / Bing Webmaster : renseigner les variables d'environnement.
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw
  const dict = getDictionary(locale)
  const themeCookie = (await cookies()).get(THEME_COOKIE)?.value
  const theme = isTheme(themeCookie) ? themeCookie : 'dark'

  return (
    <html
      lang={locale}
      className={`${theme} scroll-smooth`}
      style={{ colorScheme: theme }}
      suppressHydrationWarning
    >
      <body
        className={`${manrope.variable} ${inter.variable} bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container`}
      >
        <JsonLd data={[organizationJsonLd(locale, dict), websiteJsonLd(locale, dict)]} />
        <ThemeProvider initialTheme={theme}>
          <LocaleProvider locale={locale} dict={dict}>
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
