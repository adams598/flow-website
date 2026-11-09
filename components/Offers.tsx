'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Megaphone, CalendarCheck, CreditCard, BellRing, MessageCircle, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { useI18n } from './LocaleProvider'

// Les six outils du système Flow : le client commence par un, ajoute les autres en grandissant.
const systemIcons = {
  attract: Megaphone,
  book: CalendarCheck,
  collect: CreditCard,
  remind: BellRing,
  answer: MessageCircle,
  manage: LayoutDashboard,
} as const

export const Offers = () => {
  const { dict, href } = useI18n()

  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="solutions">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="kicker mb-4">
              {dict.offers.kicker}
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              {dict.offers.title}
            </h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dict.offers.system.map((tool, i) => {
            const Icon = systemIcons[tool.key as keyof typeof systemIcons]
            return (
              <StaggerItem key={tool.key}>
                <motion.div whileHover={{ y: -4 }} className="h-full">
                  <Link
                    href={href(tool.href)}
                    className="group h-full flex flex-col rounded-2xl border border-outline-variant/10 bg-surface-container-high p-7 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <Icon size={22} className="text-primary-container" />
                      <span className="font-label text-xs tracking-[0.2em] text-kicker">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-headline font-bold text-2xl text-on-surface mb-2">{tool.name}</h3>
                    <p className="font-body text-on-surface-variant leading-relaxed flex-1">{tool.line}</p>
                    <ArrowRight
                      size={16}
                      className="mt-5 text-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <div className="mt-24 md:mt-28" id="demarrer">
          <FadeInUp>
            <div className="max-w-3xl mb-12">
              <p className="kicker mb-4">{dict.offers.start.kicker}</p>
              <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface mb-4">
                {dict.offers.start.title}
              </h2>
              <p className="font-body text-on-surface-variant leading-relaxed">{dict.offers.start.intro}</p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.offers.start.steps.map((step, i) => (
              <StaggerItem key={step.name}>
                <div className="h-full flex flex-col rounded-2xl border border-outline-variant/10 bg-surface-container-high p-6">
                  <span className="font-label text-xs uppercase tracking-[0.2em] text-kicker mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-headline font-bold text-xl text-on-surface mb-1">{step.name}</h3>
                  {step.market && (
                    <p className="font-label text-xs text-on-surface-variant">
                      {dict.offers.start.marketLabel}{' '}
                      <span className="line-through decoration-red-500 decoration-2">{step.market}</span>
                    </p>
                  )}
                  <p className="font-headline font-semibold text-lg text-primary mb-1">{step.price}</p>
                  <p className="font-label text-xs text-on-surface-variant mb-4">{step.detail}</p>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp delay={0.1}>
            <p className="mt-6 font-body text-sm text-on-surface-variant">{dict.offers.start.ownership}</p>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.15} className="mt-10">
          <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-headline font-semibold text-xl text-on-surface mb-2">
                {dict.offers.unsureTitle}
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                {dict.offers.unsureBody}
              </p>
            </div>
            <a
              href={href(dict.nav.ctaHref)}
              className="inline-flex items-center justify-center gap-2 shrink-0 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-6 py-3.5 rounded-lg font-label text-sm font-semibold"
            >
              {dict.offers.start.cta}
              <ArrowRight size={14} />
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
