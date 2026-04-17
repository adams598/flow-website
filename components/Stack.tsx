'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'

const stackItems = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Docker',
  'Kubernetes',
  'Jenkins',
  'Redis',
  'PostgreSQL',
  'MongoDB',
  'GraphQL',
  'REST API',
]

export const Stack = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section
      className="mt-32 md:mt-48 bg-surface-container-low py-24 md:py-32 border-y border-outline-variant/5 scroll-mt-20"
      id="stack"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <FadeInUp>
          <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface mb-16">Stack Technique</h2>
        </FadeInUp>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {stackItems.map((item) => (
            <motion.div
              key={item}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: '0 10px 30px rgba(0, 240, 255, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-surface-container-highest px-4 md:px-6 py-3 rounded-lg font-label text-xs md:text-sm uppercase tracking-wide text-primary border-l-2 border-primary cursor-default transition-colors hover:bg-surface-container-high"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
