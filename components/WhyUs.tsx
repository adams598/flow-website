'use client'

import { Puzzle, Rocket, UserCheck, Target } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { useI18n } from './LocaleProvider'

const icons = {
  custom: Puzzle,
  scale: Rocket,
  contact: UserCheck,
  business: Target,
} as const

export const WhyUs = () => {
  const { dict } = useI18n()

  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="pourquoi">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="kicker mb-4">
              {dict.why.kicker}
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              {dict.why.title}
            </h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 gap-5">
          {dict.why.items.map((item) => {
            const Icon = icons[item.key as keyof typeof icons]
            return (
              <StaggerItem key={item.key}>
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
