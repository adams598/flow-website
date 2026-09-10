'use client'

import { Lightbulb, Workflow, Globe, Users } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { SITE } from '@/lib/site'

const situations = [
  {
    icon: Lightbulb,
    title: 'Vous avez une idée',
    description:
      'Vous souhaitez lancer une plateforme, un service ou un nouveau produit digital.',
  },
  {
    icon: Workflow,
    title: 'Vos processus sont trop manuels',
    description:
      'Excel, emails, formulaires et tâches répétitives ralentissent votre activité.',
  },
  {
    icon: Globe,
    title: 'Votre site ne suffit plus',
    description:
      'Vous avez besoin d’un espace client, d’un paiement, d’une réservation ou d’un véritable outil métier.',
  },
  {
    icon: Users,
    title: 'Vous avez besoin d’un partenaire technique',
    description:
      'Vous cherchez quelqu’un capable de concevoir et développer la solution de bout en bout.',
  },
]

export const Problems = () => {
  return (
    <section className="mt-16 md:mt-24 scroll-mt-20" id="besoins">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Votre contexte
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              Votre activité évolue. Vos outils doivent suivre.
            </h2>
            <p className="mt-4 font-body text-on-surface-variant leading-relaxed text-lg">
              Votre entreprise grandit, mais vos outils deviennent trop limités ?
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 gap-5">
          {situations.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.title}>
                <div className="context-card group relative h-full rounded-2xl">
                  <div
                    className="context-card-beam-wrap pointer-events-none absolute -inset-px rounded-2xl overflow-hidden"
                    aria-hidden
                  >
                    <div className="card-border-beam absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2" />
                  </div>

                  <div className="context-card-surface relative h-full overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low p-7">
                    <div className="context-card-fill pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
                    <div className="relative z-10">
                      <div className="context-card-icon mb-4 text-primary-container">
                        <Icon size={22} />
                      </div>
                      <h3 className="context-card-title font-headline font-semibold text-xl text-on-surface mb-2">
                        {item.title}
                      </h3>
                      <p className="context-card-text font-body text-sm text-on-surface-variant leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <FadeInUp delay={0.2} className="mt-12">
          <p className="font-headline font-semibold text-xl md:text-2xl text-on-surface">
            {SITE.name} transforme ces besoins en solutions digitales concrètes.
          </p>
        </FadeInUp>
      </div>
    </section>
  )
}
