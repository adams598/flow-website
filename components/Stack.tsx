'use client'

import { FadeInUp } from './AnimationWrappers'

const stackItems = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Docker',
  'Cloud',
]

export const Stack = () => {
  return (
    <section className="mt-24 md:mt-32 scroll-mt-20" id="stack">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Technologies
          </p>
          <h2 className="font-headline font-semibold text-xl text-on-surface mb-6">
            Technologies utilisées
          </h2>
          <p className="font-body text-on-surface-variant text-sm md:text-base tracking-wide">
            {stackItems.join(' · ')}
          </p>
        </FadeInUp>
      </div>
    </section>
  )
}
