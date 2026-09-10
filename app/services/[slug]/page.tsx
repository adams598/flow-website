import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getService, services } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getService(slug)
  if (!item) return { title: 'Service' }
  return {
    title: item.title,
    description: item.headline,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const item = getService(slug)
  if (!item) notFound()

  return (
    <main className="min-h-screen">
      <Navbar />
      <article className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <Link
            href="/#solutions"
            className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary mb-10"
          >
            <ArrowLeft size={14} />
            Toutes les solutions
          </Link>

          <p className="font-label text-sm uppercase tracking-[0.2em] text-primary-container mb-4">
            {item.number} · Solution
          </p>
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight mb-4">
            {item.title}
          </h1>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-10 max-w-2xl">
            {item.headline}
          </p>

          <h2 className="font-headline font-semibold text-xl text-on-surface mb-4">Pour :</h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-12">
            {item.items.map((entry) => (
              <li
                key={entry}
                className="rounded-xl border border-outline-variant/10 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant"
              >
                {entry}
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8">
            <h3 className="font-headline font-semibold text-xl text-on-surface mb-3">
              Prêt à avancer ?
            </h3>
            <p className="text-on-surface-variant mb-6">
              Décrivez votre besoin : nous vous aidons à cadrer la solution la plus adaptée.
            </p>
            <a
              href="/#projet"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-6 py-3 rounded-lg font-label text-sm font-semibold"
            >
              {item.cta}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
