import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getDictionary, getRealisation, realisationSlugs } from '@/lib/i18n'
import { href, isLocale, localeAlternates, locales } from '@/lib/i18n/config'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    realisationSlugs().map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return { title: 'Work' }
  const item = getRealisation(locale, slug)
  if (!item) return { title: getDictionary(locale).realisations.fallbackTitle }
  return {
    title: item.title,
    description: item.description,
    alternates: localeAlternates(locale, `/realisations/${slug}`),
  }
}

export default async function RealisationPage({ params }: Props) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const item = getRealisation(raw, slug)
  if (!item) notFound()
  const dict = getDictionary(raw)

  return (
    <main className="min-h-screen">
      <Navbar />
      <article className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <Link
            href={href(raw, '/#realisations')}
            className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary mb-10"
          >
            <ArrowLeft size={14} />
            {dict.realisations.back}
          </Link>

          <p className="kicker mb-4">
            {dict.realisations.label}
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
              {dict.realisations.viewSite}
              <ExternalLink size={14} />
            </a>
            <a
              href={href(raw, dict.nav.ctaHref)}
              className="inline-flex items-center gap-2 border border-primary/30 text-primary px-5 py-2.5 rounded-lg font-label text-sm font-semibold"
            >
              {dict.nav.cta}
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-outline-variant/10 bg-surface-container mb-12">
            <img src={item.image} alt={item.alt} className="w-full h-auto object-cover object-top" />
          </div>

          <div className="grid gap-10">
            <section>
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">
                {dict.realisations.problem}
              </h2>
              <p className="text-on-surface-variant leading-relaxed">{item.problem}</p>
            </section>
            <section>
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">
                {dict.realisations.objectives}
              </h2>
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
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">
                {dict.realisations.solution}
              </h2>
              <p className="text-on-surface-variant leading-relaxed">{item.solution}</p>
            </section>
            <section>
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">
                {dict.realisations.features}
              </h2>
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
              <h2 className="font-headline font-bold text-2xl text-on-surface mb-3">
                {dict.realisations.result}
              </h2>
              <p className="text-on-surface-variant leading-relaxed">{item.result}</p>
            </section>
          </div>

          <div className="mt-14 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8 text-center">
            <h3 className="font-headline font-semibold text-xl text-on-surface mb-3">
              {dict.realisations.similarTitle}
            </h3>
            <p className="text-on-surface-variant mb-6">{dict.realisations.similarBody}</p>
            <a
              href={href(raw, '/#projet')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-6 py-3 rounded-lg font-label text-sm font-semibold"
            >
              {dict.nav.cta}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
