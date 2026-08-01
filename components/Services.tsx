'use client'

import { motion } from 'framer-motion'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { Globe, Bot, Sparkles } from 'lucide-react'

interface Service {
  id: number
  title: string
  description: string
  items: string[]
  icon: React.ReactNode
}

const services: Service[] = [
  {
    id: 1,
    title: 'Développement Web',
    description: 'Landing pages, sites vitrines et refontes pensées pour convertir.',
    items: ['Landing page', 'Site vitrine', 'Refonte SEO'],
    icon: <Globe className="w-8 h-8" />,
  },
  {
    id: 2,
    title: 'Développement d’applications',
    description: 'SaaS, dashboards, CRM et outils métier sur mesure.',
    items: ['SaaS', 'Dashboard', 'CRM', 'Outil métier'],
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    id: 3,
    title: 'IA & automatisation',
    description: 'Chatbots, workflows n8n et assistants IA pour gagner du temps.',
    items: ['Chatbot', 'Workflow n8n', 'Assistant IA', 'Automatisation'],
    icon: <Bot className="w-8 h-8" />,
  },
]

export const Services = () => {
  return (
    <section className="mt-32 md:mt-48 scroll-mt-20" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-16">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">Mes services</p>
            <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Des solutions conçues pour des besoins précis</h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <motion.div
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(219, 252, 255, 0.1)' }}
                className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 group h-full"
              >
                <motion.div whileHover={{ scale: 1.1, color: '#00f0ff' }} className="text-primary mb-6 group-hover:text-primary-container transition-colors">
                  {service.icon}
                </motion.div>
                <h3 className="font-headline font-semibold text-xl mb-4 text-on-surface">{service.title}</h3>
                <p className="font-body text-on-surface-variant leading-relaxed text-sm">{service.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-on-surface-variant">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
