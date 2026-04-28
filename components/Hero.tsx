'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'

export const Hero = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
      <div className="max-w-7xl w-full px-4 sm:px-6 md:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-12 lg:gap-16 relative">
        {/* Decorative Glow */}
        <div className="absolute top-1/4 -right-1/3 md:-right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Content Container */}
        <div className="w-full md:w-1/2 relative z-10 mx-auto md:mx-0 max-w-none text-center md:text-left">
          {/* Main Heading */}
          <FadeInUp className="relative z-10">
            <h1 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-on-surface">
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
          <FadeInUp delay={0.2} className="relative z-10 mt-6 md:mt-8">
            <p className="font-body text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed">
              Développeur Fullstack & Expert DevOps. J&apos;accompagne les particuliers, les startups et entreprises dans la création de
              plateformes performantes, de l&apos;architecture initiale au déploiement automatisé.
            </p>
          </FadeInUp>

          {/* CTA Buttons */}
          <FadeInUp delay={0.4} className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-8 md:mt-12 relative z-10 justify-center md:justify-start">
            <motion.a
              href="mailto:adamsdexter3@gmail.com?subject=Projet%20-%20Demande%20d%27information"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-6 sm:px-8 py-3 md:py-4 rounded-lg font-label text-xs sm:text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg text-center w-full sm:w-auto"
            >
              Discuter de votre projet
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
        </div>

        {/* Logo - Responsive sizing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="hidden md:flex w-1/2 justify-center items-center md:mt-0"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full max-w-md md:max-w-lg lg:max-w-xl"
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
