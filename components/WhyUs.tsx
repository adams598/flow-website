'use client'

import { Puzzle, Rocket, UserCheck, Target } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'

const reasons = [
  {
    icon: Puzzle,
    title: 'Sur mesure',
    description:
      'Pas de solution générique imposée lorsque votre activité nécessite quelque chose de spécifique.',
  },
  {
    icon: Rocket,
    title: 'Pensé pour évoluer',
    description: 'Une solution conçue pour accompagner votre croissance.',
  },
  {
    icon: UserCheck,
    title: 'Un interlocuteur technique',
    description:
      'Un échange direct avec la personne qui comprend et construit votre solution.',
  },
  {
    icon: Target,
    title: 'Orienté business',
    description: 'La technologie reste au service de vos objectifs.',
  },
]

export const WhyUs = () => {
  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="pourquoi">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Ce qui change
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              Pourquoi travailler avec nous
            </h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 gap-5">
          {reasons.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-outline-variant/10 bg-surface-container-low p-7">
                  <div className="mb-4 text-primary-container">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-headline font-semibold text-xl text-on-surface mb-2">
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
