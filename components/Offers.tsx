'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { SITE, services } from '@/lib/site'

export const Offers = () => {
  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="solutions">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Solutions
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              Trois portes d’entrée. Une même exigence : une solution adaptée.
            </h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <motion.article
                whileHover={{ y: -4 }}
                className="h-full flex flex-col rounded-2xl border border-outline-variant/10 bg-surface-container-high p-8"
              >
                <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-container mb-4">
                  {service.number}
                </span>
                <h3 className="font-headline font-bold text-2xl text-on-surface mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed mb-6">
                  {service.headline}
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant flex-1 mb-8">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-container shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 font-label text-sm font-semibold text-primary hover:text-primary-container transition-colors"
                >
                  {service.cta}
                  <ArrowRight size={14} />
                </Link>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp delay={0.15} className="mt-10">
          <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-headline font-semibold text-xl text-on-surface mb-2">
                Vous ne savez pas exactement ce dont vous avez besoin ?
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Décrivez-nous votre idée, votre problème ou votre processus. Nous vous aiderons à
                déterminer la solution la plus adaptée.
              </p>
            </div>
            <a
              href={SITE.ctaHref}
              className="inline-flex items-center justify-center gap-2 shrink-0 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-6 py-3.5 rounded-lg font-label text-sm font-semibold"
            >
              {SITE.cta}
              <ArrowRight size={14} />
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
