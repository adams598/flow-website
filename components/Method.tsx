'use client'

import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { useI18n } from './LocaleProvider'

export const Method = () => {
  const { dict } = useI18n()

  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="methode">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="kicker mb-4">
              {dict.method.kicker}
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              {dict.method.title}
            </h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-5 gap-4">
          {dict.method.steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="h-full rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6">
                <div className="font-label text-xs uppercase tracking-[0.2em] text-kicker mb-4">
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
