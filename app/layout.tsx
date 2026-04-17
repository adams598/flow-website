import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'

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
  title: 'Adams.Dev - Développeur Fullstack & DevOps Freelance',
  description: 'Expert en création de produits scalables et automatisation. Services fullstack, infrastructure, et DevOps.',
  keywords: ['Fullstack Developer', 'DevOps', 'Next.js', 'React', 'Architecture', 'Freelance'],
  authors: [{name: 'Adams.Dev'}],
  openGraph: {
    title: 'Adams.Dev - Développeur Fullstack & DevOps',
    description: 'Expert en architecture et DevOps pour startups et entreprises',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <head></head>
      <body
        className={`${manrope.variable} ${inter.variable} bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container`}
      >
        {children}
      </body>
    </html>
  )
}
