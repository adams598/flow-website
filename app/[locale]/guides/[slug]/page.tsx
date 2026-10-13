import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Breadcrumb } from '@/components/Breadcrumb'
import { JsonLd } from '@/components/JsonLd'
import { getDictionary, getGuide, getRealisation, guideSlugs } from '@/lib/i18n'
import { href, isLocale, locales } from '@/lib/i18n/config'
import { SITE } from '@/lib/site'
import { breadcrumbJsonLd, guideJsonLd, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => guideSlugs().map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return { title: 'Guide' }
  const item = getGuide(locale, slug)
  if (!item) return { title: getDictionary(locale).guides.label }
  return pageMetadata(locale, `/guides/${slug}`, item.h1, item.seoDescription)
}

export default async function GuidePage({ params }: Props) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const item = getGuide(raw, slug)
  if (!item) notFound()
  const dict = getDictionary(raw)
  const example = getRealisation(raw, item.example.slug)
  const relatedServices = dict.services.items.filter((service) =>
    (item.related as readonly string[]).includes(service.slug)
  )

  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          guideJsonLd(raw, item),
          breadcrumbJsonLd([
            { name: SITE.name, path: `/${raw}` },
            { name: item.h1, path: `/${raw}/guides/${item.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <article className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <Breadcrumb
            label={dict.nav.breadcrumb}
            items={[
              { name: SITE.name, href: href(raw, '/') },
              { name: item.title },
            ]}
          />

          <p className="kicker mb-4">{dict.guides.label}</p>
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight mb-4">
            {item.h1}
          </h1>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-12">{item.intro}</p>

          <div className="space-y-10">
            {item.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-headline font-semibold text-xl text-on-surface mb-3">{section.title}</h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="font-body text-on-surface-variant leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {example && (
            <p className="mt-10">
              <Link
                href={href(raw, `/realisations/${example.slug}`)}
                className="font-label text-sm font-semibold text-primary hover:text-primary-container transition-colors"
              >
                {item.example.text}
              </Link>
            </p>
          )}

          <nav aria-label={dict.services.also} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {relatedServices.map((service) => (
              <Link
                key={service.slug}
                href={href(raw, `/services/${service.slug}`)}
                className="font-label text-sm font-semibold text-primary hover:text-primary-container transition-colors"
              >
                {service.h1}
              </Link>
            ))}
          </nav>

          <div className="mt-14 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8">
            <h2 className="font-headline font-semibold text-xl text-on-surface mb-3">{dict.form.title}</h2>
            <p className="text-on-surface-variant mb-6">{dict.form.intro}</p>
            <a
              href={href(raw, dict.nav.ctaHref)}
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
