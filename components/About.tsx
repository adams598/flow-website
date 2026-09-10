'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'
import { SITE } from '@/lib/site'

export const About = () => {
  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="apropos">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <FadeInUp className="lg:w-2/5">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-4 rounded-3xl bg-primary-container/10 blur-2xl pointer-events-none" />
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                src="/photo.jpg"
                alt="Adams, fondateur de Flow"
                className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </FadeInUp>

          <FadeInUp delay={0.15} className="lg:w-3/5">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">
              À propos
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface mb-6">
              Une expertise d’ingénieur, avec la flexibilité d’une structure indépendante.
            </h2>
            <div className="space-y-4 font-body text-on-surface-variant leading-relaxed text-lg">
              <p>
                {SITE.name} est porté par Adams, ingénieur informatique indépendant, et s’appuie
                sur une approche rigoureuse du développement logiciel pour concevoir des solutions
                adaptées à chaque projet.
              </p>
              <p>
                Une expertise directement impliquée dans chaque projet : de la compréhension du
                besoin jusqu’à la mise en production, vous échangez avec la personne qui construit
                votre solution.
              </p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
