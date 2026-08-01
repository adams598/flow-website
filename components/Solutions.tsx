'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'
import { CalendarDays, ShoppingCart, LayoutDashboard, Smartphone, Users, Boxes, Bot, FileText, Receipt, TrendingUp } from 'lucide-react'

const solutions = [
  { title: 'Système de réservation', icon: CalendarDays },
  { title: 'E-commerce', icon: ShoppingCart },
  { title: 'Dashboard', icon: LayoutDashboard },
  { title: 'Application mobile', icon: Smartphone },
  { title: 'Espace client', icon: Users },
  { title: 'Gestion de stock', icon: Boxes },
  { title: 'Assistant IA', icon: Bot },
  { title: 'Générateur de devis', icon: FileText },
  { title: 'Facturation', icon: Receipt },
  { title: 'CRM', icon: TrendingUp },
]

export const Solutions = () => {
  return (
    <section className="mt-32 md:mt-48 scroll-mt-20" id="solutions">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-12">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">Solutions</p>
            <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Des solutions digitales conçues pour des besoins métier</h2>
            <p className="mt-4 font-body text-on-surface-variant leading-relaxed">
              Du simple site vitrine au système métier complet, je développe des outils concrets qui répondent à un objectif précis.
            </p>
          </div>
        </FadeInUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6"
              >
                <div className="mb-4 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="font-headline font-semibold text-lg text-on-surface">{solution.title}</h3>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
