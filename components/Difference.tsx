'use client'

import { Search, PenTool, Hammer, TrendingUp } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { useI18n } from './LocaleProvider'

const icons = {
  understand: Search,
  design: PenTool,
  build: Hammer,
  evolve: TrendingUp,
} as const

export const Difference = () => {
  const { dict } = useI18n()

  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="difference">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="kicker mb-4">
              {dict.difference.kicker}
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              {dict.difference.title}
            </h2>
            <p className="mt-4 font-body text-on-surface-variant leading-relaxed text-lg">
              {dict.difference.intro}
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dict.difference.items.map((item) => {
            const Icon = icons[item.key as keyof typeof icons]
            return (
              <StaggerItem key={item.key}>
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
