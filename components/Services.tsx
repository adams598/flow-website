'use client'

import { motion } from 'framer-motion'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { Zap, Cloud, Cpu } from 'lucide-react'

interface Service {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

const services: Service[] = [
  {
    id: 1,
    title: 'Création Web & Plateformes',
    description: 'Développement d\'applications web orientées performance et conversion, avec une expérience utilisateur fluide.',
    icon: <Zap className="w-8 h-8" />,
  },
  {
    id: 2,
    title: 'Infrastructure & DevOps',
    description: 'Mise en place de pipelines CI/CD, orchestration Docker/Kubernetes pour une fiabilité maximale.',
    icon: <Cloud className="w-8 h-8" />,
  },
  {
    id: 3,
    title: 'Optimisation & Scalabilité',
    description: 'Conception d\'architectures robustes capables d\'absorber la croissance sans compromis sur la vitesse.',
    icon: <Cpu className="w-8 h-8" />,
  },
]

export const Services = () => {
  return (
    <section className="mt-32 md:mt-48 scroll-mt-20" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface mb-16">Expertise Technique</h2>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <motion.div
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(219, 252, 255, 0.1)' }}
                className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, color: '#00f0ff' }}
                  className="text-primary mb-6 group-hover:text-primary-container transition-colors"
                >
                  {service.icon}
                </motion.div>
                <h3 className="font-headline font-semibold text-xl mb-4 text-on-surface">{service.title}</h3>
                <p className="font-body text-on-surface-variant leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
