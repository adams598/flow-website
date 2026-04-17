'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'

export const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 pt-40 pb-32 flex flex-col items-start gap-8 relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Heading */}
      <FadeInUp className="relative z-10">
        <h1 className="font-headline font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-on-surface max-w-4xl">
          Concevoir des produits scalables.
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-r from-primary via-primary-container to-primary-fixed bg-clip-text text-transparent"
          >
            Automatiser votre succès.
          </motion.span>
        </h1>
      </FadeInUp>

      {/* Subtitle */}
      <FadeInUp delay={0.2} className="relative z-10">
        <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
          Développeur Fullstack & Expert DevOps. J&apos;accompagne les startups et entreprises dans la création de
          plateformes performantes, de l&apos;architecture initiale au déploiement automatisé.
        </p>
      </FadeInUp>

      {/* CTA Buttons */}
      <FadeInUp delay={0.4} className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 mt-8 relative z-10">
        <motion.a
          href="mailto:adamsdexter3@gmail.com?subject=Projet%20-%20Demande%20d%27information"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-8 py-4 rounded-lg font-label text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
        >
          Discuter de votre projet
        </motion.a>
        <motion.a
          href="#projets"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-primary/30 text-primary px-8 py-4 rounded-lg font-label text-sm font-semibold uppercase tracking-wider hover:bg-surface-container-high transition-colors"
        >
          Voir mes réalisations
        </motion.a>
      </FadeInUp>
    </section>
  )
}
