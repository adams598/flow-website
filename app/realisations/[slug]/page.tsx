import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getRealisation, realisations, SITE } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return realisations.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getRealisation(slug)
  if (!item) return { title: 'Réalisation' }
  return {
    title: item.title,
    description: item.description,
  }
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params
  const item = getRealisation(slug)
  if (!item) notFound()

  return (
    <main className="min-h-screen">
      <Navbar />
      <article className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <Link
            href="/#realisations"
            className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary mb-10"
          >
            <ArrowLeft size={14} />
            Retour aux réalisations
          </Link>

          <p className="font-label text-sm uppercase tracking-[0.2em] text-primary-container mb-4">
            Réalisation
          </p>
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight mb-3">
            {item.title}
          </h1>
          <p className="font-label text-sm uppercase tracking-[0.14em] text-primary mb-6">
            {item.headline}
          </p>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-3xl mb-8">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={item.siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-5 py-2.5 rounded-lg font-label text-sm font-semibold"
            >
              Voir le site
              <ExternalLink size={14} />
            </a>
            <a
              href={SITE.ctaHref}
              className="inline-flex items-center gap-2 border border-primary/30 text-primary px-5 py-2.5 rounded-lg font-label text-sm font-semibold"
            >
              {SITE.cta}
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-outline-variant/10 bg-surface-container mb-12">
            <img src={item.image} alt={item.alt} className="w-full h-auto object-cover object-top" />
          </div>

          <div className="grid gap-10">
            <section>
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">Le problème</h2>
              <p className="text-on-surface-variant leading-relaxed">{item.problem}</p>
            </section>
            <section>
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">Les objectifs</h2>
              <ul className="space-y-2">
                {item.objectives.map((objective) => (
                  <li key={objective} className="flex gap-2 text-on-surface-variant">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-container shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">La solution</h2>
              <p className="text-on-surface-variant leading-relaxed">{item.solution}</p>
            </section>
            <section>
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">Fonctionnalités</h2>
              <div className="flex flex-wrap gap-2">
                {item.features.map((feature) => (
                  <span
                    key={feature}
                    className="bg-surface-container-highest border-l-2 border-primary px-3 py-1.5 rounded text-sm text-on-surface-variant"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </section>
            <section>
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">Résultat</h2>
              <p className="text-on-surface-variant leading-relaxed">{item.result}</p>
            </section>
          </div>

          <div className="mt-14 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8 text-center">
            <h3 className="font-headline font-semibold text-xl text-on-surface mb-3">
              Un besoin similaire ?
            </h3>
            <p className="text-on-surface-variant mb-6">
              Parlons de votre projet et construisons la solution adaptée.
            </p>
            <a
              href="/#projet"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-6 py-3 rounded-lg font-label text-sm font-semibold"
            >
              {SITE.cta}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
