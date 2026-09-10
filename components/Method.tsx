'use client'

import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'

const steps = [
  {
    number: '01',
    title: 'Découverte',
    description:
      'Compréhension de votre activité, de vos utilisateurs et de votre problématique.',
  },
  {
    number: '02',
    title: 'Conception',
    description: 'Définition des fonctionnalités, parcours et architecture.',
  },
  {
    number: '03',
    title: 'Développement',
    description: 'Construction progressive de la solution.',
  },
  {
    number: '04',
    title: 'Mise en ligne',
    description: 'Déploiement, configuration et accompagnement au lancement.',
  },
  {
    number: '05',
    title: 'Évolution',
    description: 'Maintenance, amélioration et nouvelles fonctionnalités.',
  },
]

export const Method = () => {
  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="methode">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Méthode
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              De l’idée à la mise en production.
            </h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-5 gap-4">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="h-full rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6">
                <div className="font-label text-xs uppercase tracking-[0.2em] text-primary-container mb-4">
                  {step.number}
                </div>
                <h3 className="font-headline font-semibold text-lg text-on-surface mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
