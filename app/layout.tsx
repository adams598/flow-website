import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/site'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '600', '800'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Solutions digitales sur mesure`,
    template: `%s · ${SITE.name}`,
  },
  description:
    'Flow conçoit et développe des sites web, applications métier et plateformes digitales sur mesure pour transformer vos idées et vos processus en solutions concrètes.',
  keywords: [
    'Flow',
    'site web sur mesure',
    'application métier',
    'plateforme digitale',
    'développement web',
    'Next.js',
    'France',
  ],
  authors: [{ name: SITE.name }],
  icons: {
    icon: [{ url: '/icon.png?v=3', type: 'image/png', sizes: '512x512' }],
    apple: [{ url: '/apple-icon.png?v=3', sizes: '180x180' }],
  },
  openGraph: {
    title: `${SITE.name} — Build digital. Make it flow.`,
    description:
      'Sites web, applications métier et plateformes digitales conçus pour faire avancer votre activité.',
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE.name,
  },
}

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('flow-theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    var root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
