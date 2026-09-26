'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'
import { SITE } from '@/lib/site'
import { useI18n } from './LocaleProvider'

export const About = () => {
  const { dict } = useI18n()

  return (
    <section className="mt-32 md:mt-40 scroll-mt-20 bg-surface-container py-20 md:py-24" id="apropos">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <FadeInUp className="lg:w-2/5">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-3 rounded-3xl bg-terre/20 pointer-events-none dark:hidden" />
              <div className="absolute -inset-4 rounded-3xl bg-primary-container/10 blur-2xl pointer-events-none night-glow" />
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                src="/photo.jpg"
                alt={dict.about.photoAlt}
                className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </FadeInUp>

          <FadeInUp delay={0.15} className="lg:w-3/5">
            <p className="kicker mb-4">
              {dict.about.kicker}
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface mb-6">
              {dict.about.title}
            </h2>
            <div className="space-y-4 font-body text-on-surface-variant leading-relaxed text-lg">
              <p>{dict.about.p1}</p>
              <p>{dict.about.p2}</p>
              <p>
                {dict.about.p3Before}{' '}
                <a
                  href={SITE.phoneHref}
                  className="text-primary hover:opacity-80 transition-opacity font-medium"
                >
                  {SITE.phoneDisplay}
                </a>
              </p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
