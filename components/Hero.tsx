'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { FadeInUp } from './AnimationWrappers'
import { SITE } from '@/lib/site'

const underCta = ['Site web', 'Application métier', 'Plateforme', 'Automatisation']

const MAX_TILT = 20

function FloatingLogo() {
  const ref = useRef<HTMLDivElement>(null)
  const rotateY = useMotionValue(0)
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 22, mass: 0.6 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element) return

    const { left, width } = element.getBoundingClientRect()
    const ratio = (event.clientX - left) / width // 0 gauche → 1 droite
    // Gauche : tourne vers la gauche · Droite : vers la droite (axe vertical)
    rotateY.set((ratio * 2 - 1) * MAX_TILT)
  }

  const handleMouseLeave = () => {
    rotateY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
      className="hidden lg:flex w-[45%] justify-center items-center"
      style={{ perspective: 1100 }}
    >
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full max-w-md lg:max-w-xl"
        style={{ perspective: 1100 }}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative will-change-transform"
        >
          <img
            src="/export.png"
            alt={`Logo ${SITE.name}`}
            className="w-full h-auto drop-shadow-2xl select-none pointer-events-none"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export const Hero = () => {
  return (
    <section className="min-h-[92vh] w-full flex flex-col justify-center relative overflow-hidden pt-28 pb-16">
      <div className="absolute top-1/4 right-0 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-8 relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-12 lg:gap-16">
        <div className="w-full lg:w-[55%] text-center lg:text-left">
          <FadeInUp>
            <p className="font-label text-sm uppercase tracking-[0.22em] text-primary-container mb-6">
              {SITE.name}
            </p>
            <h1 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-on-surface">
              Build digital.
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-container to-primary-fixed bg-clip-text text-transparent">
                Make it flow.
              </span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.15} className="mt-8">
            <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Nous concevons des solutions digitales sur mesure pour simplifier vos processus,
              améliorer vos parcours clients et développer votre activité.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.a
              href={SITE.ctaHref}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-8 py-4 rounded-lg font-label text-sm font-semibold uppercase tracking-wider shadow-lg"
            >
              {SITE.cta}
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="/#realisations"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center border border-primary/30 text-primary px-8 py-4 rounded-lg font-label text-sm font-semibold uppercase tracking-wider hover:bg-surface-container-high transition-colors"
            >
              Voir les réalisations
            </motion.a>
          </FadeInUp>

          <FadeInUp delay={0.4} className="mt-10">
            <p className="font-label text-xs uppercase tracking-[0.18em] text-on-surface-variant">
              {underCta.join(' · ')}
            </p>
          </FadeInUp>
        </div>

        <FloatingLogo />
      </div>
    </section>
  )
}
