import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getDictionary, getService, serviceSlugs } from '@/lib/i18n'
import { href, isLocale, locales } from '@/lib/i18n/config'
import { Breadcrumb } from '@/components/Breadcrumb'
import { JsonLd } from '@/components/JsonLd'
import { SITE } from '@/lib/site'
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceSlugs().map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return { title: 'Service' }
  const item = getService(locale, slug)
  if (!item) return { title: getDictionary(locale).services.fallbackTitle }
  return pageMetadata(locale, `/services/${slug}`, item.h1, item.seoDescription)
}

export default async function ServicePage({ params }: Props) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const item = getService(raw, slug)
  if (!item) notFound()
  const dict = getDictionary(raw)

  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          serviceJsonLd(raw, item),
          breadcrumbJsonLd([
            { name: SITE.name, path: `/${raw}` },
            { name: dict.offers.kicker, path: `/${raw}#solutions` },
            { name: item.h1, path: `/${raw}/services/${item.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <article className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <Breadcrumb
            label={dict.nav.breadcrumb}
            items={[
              { name: SITE.name, href: href(raw, '/') },
              { name: dict.offers.kicker, href: href(raw, '/#solutions') },
              { name: item.h1 },
            ]}
          />

          <p className="kicker mb-4">
            {item.number} · {dict.services.label}
          </p>
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight mb-4">
            {item.h1}
          </h1>
          <div className="space-y-4 mb-10 max-w-2xl">
            <p className="font-body text-lg text-on-surface-variant leading-relaxed">{item.headline}</p>
            {item.body.map((paragraph) => (
              <p key={paragraph} className="font-body text-lg text-on-surface-variant leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="font-headline font-semibold text-xl text-on-surface mb-4">
            {dict.services.for}
          </h2>
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
              {dict.services.readyTitle}
            </h3>
            <p className="text-on-surface-variant mb-6">{dict.services.readyBody}</p>
            <a
              href={href(raw, '/#projet')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-6 py-3 rounded-lg font-label text-sm font-semibold"
            >
              {item.cta}
              <ArrowRight size={14} />
            </a>
          </div>

          <nav aria-label={dict.services.also} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {dict.services.items
              .filter((service) => service.slug !== item.slug)
              .map((service) => (
                <Link
                  key={service.slug}
                  href={href(raw, `/services/${service.slug}`)}
                  className="font-label text-sm font-semibold text-primary hover:text-primary-container transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            <Link
              href={href(raw, '/faq')}
              className="font-label text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              {dict.faq.label}
            </Link>
          </nav>
        </div>
      </article>
      <Footer />
    </main>
  )
}
