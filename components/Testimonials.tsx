'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'

const testimonials = [
  {
    name: 'M. BAI',
    role: 'Responsable de formation',
    company: 'BAI Formation Consulting',
    quote: 'Adams a su transformer un besoin complexe en une solution claire, rapide et professionnelle. Le résultat dépasse nos attentes.',
  },
  {
    name: 'DrivinChill Team',
    role: 'Équipe produit',
    company: 'DrivinChill',
    quote: 'Le processus a été fluide et l’application finale a vraiment amélioré l’expérience utilisateur de nos clients.',
  },
]

export const Testimonials = () => {
  return (
    <section className="mt-32 md:mt-48 scroll-mt-20" id="temoignages">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-12">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">Témoignages</p>
            <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Ce que disent les clients</h2>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-container-low rounded-3xl border border-outline-variant/10 p-8"
            >
              <p className="font-body text-on-surface-variant leading-relaxed text-lg">“{item.quote}”</p>
              <footer className="mt-6">
                <p className="font-headline font-semibold text-on-surface">{item.name}</p>
                <p className="text-sm text-primary">{item.role} · {item.company}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
