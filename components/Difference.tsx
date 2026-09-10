'use client'

import { Search, PenTool, Hammer, TrendingUp } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { SITE } from '@/lib/site'

const pillars = [
  {
    icon: Search,
    title: 'Comprendre',
    description: 'Nous commençons par votre besoin métier, pas par la technologie.',
  },
  {
    icon: PenTool,
    title: 'Concevoir',
    description: 'Nous définissons l’expérience, les fonctionnalités et l’architecture.',
  },
  {
    icon: Hammer,
    title: 'Construire',
    description: 'Nous développons une solution robuste et adaptée à votre contexte.',
  },
  {
    icon: TrendingUp,
    title: 'Faire évoluer',
    description: 'Votre solution peut continuer à évoluer avec votre activité.',
  },
]

export const Difference = () => {
  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="difference">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Pourquoi {SITE.name}
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              Une vision d’ingénieur. Une approche produit.
            </h2>
            <p className="mt-4 font-body text-on-surface-variant leading-relaxed text-lg">
              {SITE.name} ne se contente pas de développer une interface. Nous réfléchissons au
              fonctionnement global de votre solution : utilisateurs, données, parcours, logique
              métier, sécurité, évolutivité et maintenance.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6">
                  <div className="mb-4 text-primary-container">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-headline font-semibold text-lg text-on-surface mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
