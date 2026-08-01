'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'

const steps = [
  'Découverte',
  'Proposition',
  'Développement',
  'Livraison',
  'Support',
]

export const Process = () => {
  return (
    <section className="mt-32 md:mt-48 scroll-mt-20" id="processus">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-12">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">Mon processus</p>
            <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Une collaboration simple et efficace</h2>
            <p className="mt-4 font-body text-on-surface-variant leading-relaxed">
              De la première discussion au déploiement, chaque étape est pensée pour limiter les frictions et accélérer la mise en production.
            </p>
          </div>
        </FadeInUp>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6 text-center"
            >
              <div className="text-sm font-label uppercase tracking-[0.2em] text-primary mb-3">Étape {index + 1}</div>
              <h3 className="font-headline font-semibold text-lg text-on-surface">{step}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
