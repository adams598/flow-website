'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'

const faqs = [
  {
    question: 'Combien coûte un site ou une application ?',
    answer: 'Le coût dépend de la complexité du projet, du temps de conception, des intégrations et des besoins métiers. Un devis clair est établi après une première discussion.',
  },
  {
    question: 'Quels sont les délais ?',
    answer: 'Pour un site vitrine, le délai est généralement rapide. Pour une application plus complète, la durée dépend du périmètre et des fonctionnalités à livrer.',
  },
  {
    question: 'Travaillez-vous partout en France ?',
    answer: 'Oui, je peux travailler avec des clients partout en France, en présentiel si besoin ou en remote selon les contraintes du projet.',
  },
  {
    question: 'Proposez-vous la maintenance ?',
    answer: 'Oui, je peux accompagner la mise en ligne, la maintenance et les évolutions après livraison selon les besoins du client.',
  },
]

export const FAQ = () => {
  return (
    <section className="mt-32 md:mt-48 scroll-mt-20" id="faq">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-12">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">FAQ</p>
            <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Les questions les plus fréquentes</h2>
          </div>
        </FadeInUp>

        <div className="grid gap-4">
          {faqs.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6"
            >
              <h3 className="font-headline font-semibold text-lg text-on-surface">{item.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
