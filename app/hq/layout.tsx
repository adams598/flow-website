import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import '../globals.css'

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

export const metadata: Metadata = {
  title: 'Flow HQ',
  robots: { index: false, follow: false },
}

export default function HqLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark scroll-smooth" style={{ colorScheme: 'dark' }}>
      <body
        className={`${manrope.variable} ${inter.variable} bg-background text-on-surface font-body min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
