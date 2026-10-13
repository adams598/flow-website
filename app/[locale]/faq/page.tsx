import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Breadcrumb } from '@/components/Breadcrumb'
import { JsonLd } from '@/components/JsonLd'
import { getDictionary } from '@/lib/i18n'
import { href, isLocale, locales } from '@/lib/i18n/config'
import { SITE } from '@/lib/site'
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return { title: 'FAQ' }
  const dict = getDictionary(locale)
  return pageMetadata(locale, '/faq', dict.faq.title, dict.faq.description)
}

export default async function FaqPage({ params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const dict = getDictionary(raw)

  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          faqJsonLd(raw, dict),
          breadcrumbJsonLd([
            { name: SITE.name, path: `/${raw}` },
            { name: dict.faq.label, path: `/${raw}/faq` },
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
              { name: dict.faq.label },
            ]}
          />

          <p className="kicker mb-4">{dict.faq.label}</p>
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight mb-4">
            {dict.faq.h1}
          </h1>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-12">{dict.faq.intro}</p>

          <div className="space-y-4">
            {dict.faq.items.map((item) => (
              <section
                key={item.q}
                className="rounded-2xl border border-outline-variant/10 bg-surface-container-low px-6 py-5"
              >
                <h2 className="font-headline font-semibold text-lg text-on-surface">{item.q}</h2>
                <p className="mt-2 font-body text-on-surface-variant leading-relaxed">{item.a}</p>
              </section>
            ))}
          </div>

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
