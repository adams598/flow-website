'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'

const studies = [
  {
    client: 'BAI Formation Consulting',
    need: 'Moderniser la formation bancaire et rendre les parcours plus digitaux.',
    solution: 'Création d’une plateforme e-learning complète, avec tableau de bord administrateur et parcours adaptés aux équipes.',
    result: 'Meilleure accessibilité, expérience plus fluide et une base prête à évoluer avec l’activité.',
  },
  {
    client: 'DrivinChill',
    need: 'Simplifier la réservation et offrir une expérience mobile fluide.',
    solution: 'Mise en place d’un parcours de réservation rapide, d’un système de gestion simple et d’une interface pensée pour le mobile.',
    result: 'Réduction des frictions utilisateur et meilleure image de marque digitale.',
  },
  {
    client: 'Objectif TCF',
    need: 'Proposer une préparation complète aux examens TCF, TEF et IELTS, avec suivi des abonnements et outils d’administration.',
    solution: 'Développement d’une plateforme web immersive (simulations, feedback) et d’un back-office : offres, paiements, utilisateurs, examens, séries et analytics.',
    result: 'Parcours candidat clair multi-examens et pilotage métier centralisé pour l’équipe.',
  },
]

export const CaseStudies = () => {
  return (
    <section className="mt-32 md:mt-48 scroll-mt-20" id="etudes-de-cas">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-12">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">Études de cas</p>
            <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Des solutions pensées pour des besoins concrets</h2>
            <p className="mt-4 font-body text-on-surface-variant leading-relaxed">
              Chaque projet est abordé comme un enjeu métier : clarifier le besoin, créer une expérience adaptée et livrer une solution robuste.
            </p>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-8">
          {studies.map((study, index) => (
            <motion.article
              key={study.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-container-low rounded-3xl border border-outline-variant/10 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-headline font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-label text-xs uppercase tracking-[0.2em] text-primary">Client</p>
                  <h3 className="font-headline font-semibold text-xl text-on-surface">{study.client}</h3>
                </div>
              </div>

              <div className="space-y-4 text-sm text-on-surface-variant">
                <div>
                  <p className="font-semibold text-on-surface mb-1">Besoin</p>
                  <p>{study.need}</p>
                </div>
                <div>
                  <p className="font-semibold text-on-surface mb-1">Solution</p>
                  <p>{study.solution}</p>
                </div>
                <div>
                  <p className="font-semibold text-on-surface mb-1">Résultat</p>
                  <p>{study.result}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
