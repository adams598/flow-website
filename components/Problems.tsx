'use client'

import { Lightbulb, Workflow, Globe, Users } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { useI18n } from './LocaleProvider'

const icons = {
  idea: Lightbulb,
  manual: Workflow,
  site: Globe,
  partner: Users,
} as const

export const Problems = () => {
  const { dict } = useI18n()

  return (
    <section className="mt-16 md:mt-24 scroll-mt-20" id="besoins">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="kicker mb-4">
              {dict.problems.kicker}
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              {dict.problems.title}
            </h2>
            <p className="mt-4 font-body text-on-surface-variant leading-relaxed text-lg">
              {dict.problems.intro}
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 gap-5">
          {dict.problems.items.map((item) => {
            const Icon = icons[item.key as keyof typeof icons]
            return (
              <StaggerItem key={item.key}>
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
            {dict.problems.closing}
          </p>
        </FadeInUp>
      </div>
    </section>
  )
}
