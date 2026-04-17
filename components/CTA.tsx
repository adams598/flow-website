'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'

export const CTA = () => {
  return (
    <section className="mt-32 md:mt-48 max-w-5xl mx-auto px-6 md:px-8">
      <FadeInUp>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface-container-low rounded-3xl p-12 md:p-16 text-center border border-outline-variant/10 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-on-surface mb-6">
              Prêt à optimiser votre infrastructure ?
            </h2>

            <p className="font-body text-on-surface-variant text-lg mb-10 max-w-2xl mx-auto">
              Discutons de vos enjeux techniques et découvrez comment une architecture moderne peut accélérer votre
              croissance.
            </p>

            <motion.a
              href="mailto:adamsdexter3@gmail.com?subject=Demande%20Audit%20Gratuit"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(219, 252, 255, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-10 py-5 rounded-lg font-label text-base font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              Demander un Audit Gratuit
            </motion.a>
          </div>
        </motion.div>
      </FadeInUp>
    </section>
  )
}
