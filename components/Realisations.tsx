'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'
import { realisations } from '@/lib/site'

export const Realisations = () => {
  return (
    <section className="mt-32 md:mt-40 scroll-mt-20" id="realisations">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="max-w-3xl mb-14">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Réalisations
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface">
              Des preuves concrètes, pas une simple galerie.
            </h2>
            <p className="mt-4 font-body text-on-surface-variant leading-relaxed">
              Chaque projet démontre une compétence précise : produit, parcours, monétisation ou
              outil métier.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realisations.map((item) => (
            <StaggerItem key={item.slug}>
              <motion.article
                whileHover={{ y: -6 }}
                className="h-full flex flex-col overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low group"
              >
                <div className="h-52 bg-surface-container relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-headline font-bold text-xl text-on-surface mb-2">
                    {item.title}
                  </h3>
                  <p className="font-label text-xs uppercase tracking-[0.14em] text-primary-container mb-3">
                    {item.headline}
                  </p>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-surface-container-highest border-l-2 border-primary px-2.5 py-1 rounded font-label text-[11px] text-on-surface-variant"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/realisations/${item.slug}`}
                    className="inline-flex items-center gap-2 font-label text-sm font-semibold text-primary hover:text-primary-container transition-colors"
                  >
                    Voir le projet
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
