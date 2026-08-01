'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Clock3, MapPin } from 'lucide-react'
import { FadeInUp } from './AnimationWrappers'

const highlights = [
  { label: '4 clients satisfaits', icon: Zap },
  { label: 'Livraison rapide', icon: Clock3 },
  { label: 'Basé en France', icon: MapPin },
]

export const Hero = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden pt-24 md:pt-0">
      <div className="max-w-7xl w-full px-4 sm:px-6 md:px-8 py-12 md:py-20 flex flex-col lg:flex-row items-center lg:justify-between gap-10 lg:gap-16 relative">
        <div className="absolute top-1/4 -right-1/3 md:-right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full lg:w-[55%] relative z-10 mx-auto lg:mx-0 text-center lg:text-left">
          <FadeInUp className="relative z-10">
            <p className="font-label text-sm sm:text-base md:text-lg uppercase tracking-[0.18em] text-primary mb-4 bg-primary/6 inline-block px-3 py-1 rounded-full font-semibold">
              Développeur fullstack & IA
            </p>
            <h1 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-on-surface">
              J’aide les entreprises à transformer leurs idées en solutions digitales concrètes.
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-gradient-to-r from-primary via-primary-container to-primary-fixed bg-clip-text text-transparent"
              >
                Sites, applications et automatisations orientés résultat.
              </motion.span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2} className="relative z-10 mt-6 md:mt-8">
            <p className="font-body text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Je conçois des produits web modernes, fiables et performants pour des clients qui veulent gagner du temps, améliorer leur image et vendre mieux en ligne.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.4} className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-8 md:mt-10 relative z-10 justify-center lg:justify-start">
            <motion.a
              href="mailto:adamsdexter3@gmail.com?subject=Projet%20-%20Demande%20d%27information"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-6 sm:px-8 py-3 md:py-4 rounded-lg font-label text-xs sm:text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg text-center w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              Demander un devis
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#projets"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-primary/30 text-primary px-6 sm:px-8 py-3 md:py-4 rounded-lg font-label text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-surface-container-high transition-colors text-center w-full sm:w-auto"
            >
              Voir mes réalisations
            </motion.a>
          </FadeInUp>

          <FadeInUp delay={0.5} className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-low px-4 py-2 text-sm text-on-surface-variant">
                  <Icon size={16} className="text-primary" />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </FadeInUp>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="hidden lg:flex w-[45%] justify-center items-center"
        >
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full max-w-md lg:max-w-xl"
          >
            <motion.img
              src="/export.png"
              alt="Logo"
              className="w-full h-auto drop-shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
