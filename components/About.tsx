'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'
import { Zap, ShieldCheck, Smartphone, Rocket } from 'lucide-react'

const reasons = [
  { title: 'Livraison rapide', description: 'Un suivi clair et une exécution efficace pour avancer sans perdre de temps.', icon: Zap },
  { title: 'Accompagnement personnalisé', description: 'Chaque projet est pensé autour de vos objectifs et de votre contexte.', icon: ShieldCheck },
  { title: 'Développement sur mesure', description: 'Des solutions adaptées à votre métier, pas des templates génériques.', icon: Smartphone },
  { title: 'Performant et évolutif', description: 'Une base technique solide pour faire grandir votre produit.', icon: Rocket },
]

export const About = () => {
  return (
    <section className="mt-32 md:mt-48 max-w-7xl mx-auto px-6 md:px-8 scroll-mt-20" id="apropos">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        <FadeInUp className="lg:w-1/2">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-6 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(var(--color-primary), 0.4) 0%, transparent 70%)',
              }}
            />
            <div className="absolute -inset-3 rounded-full border-2 border-primary/5" />
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src="/photo.jpg"
              alt="Développeur au travail"
              className="relative z-10 w-full h-auto object-cover shadow-2xl"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              }}
            />
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2} className="lg:w-1/2">
          <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">Pourquoi travailler avec moi ?</p>
          <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface mb-8">Un développement orienté impact business</h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-on-surface-variant leading-relaxed text-lg"
          >
            Je combine développement web, applications métier et automatisations IA pour créer des outils utiles, performants et prêts à évoluer. L’objectif n’est pas seulement de coder : c’est de résoudre un vrai besoin avec une solution claire et fiable.
          </motion.p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {reasons.map((reason) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-5"
                >
                  <div className="mb-3 text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-headline font-semibold text-lg text-on-surface">{reason.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">{reason.description}</p>
                </motion.div>
              )
            })}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
