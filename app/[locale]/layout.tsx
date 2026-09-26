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
      locale: localeOg[locale],
      siteName: SITE.name,
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
        <ThemeProvider initialTheme={theme}>
          <LocaleProvider locale={locale} dict={dict}>
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
