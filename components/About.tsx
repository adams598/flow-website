'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'

export const About = () => {
  return (
    <section className="mt-32 md:mt-48 max-w-7xl mx-auto px-6 md:px-8 scroll-mt-20" id="apropos">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Image Container */}
        <FadeInUp className="lg:w-1/2">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary-container/5 rounded-2xl blur-2xl pointer-events-none" />
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBikol9UWb5YCzVM838sjBT2yEiEviTrTOvGS_TU_z401J-FyQEMKGLCA2X8A7FAazP1Jql2Ir_1MLtfjybJZuAGRXlqdj8KOP5q_1PhiRvcYvgFq2_9aUA4CVjyBEhLKdt_SbFEYgMY4fSyJ-gVH3d0oA7btoGjlhsrBYuVdXH9zOSqjzErrVmYSF1XOqutWBJsGXlL1QxvlV78AbFHFOaD-_CjV3YM3poaPVn7CKXEar-Htz2i_CmZHGxQK5RdxP4pMAhe-K9ICY"
              alt="Développeur au travail"
              className="rounded-2xl w-full h-auto object-cover border border-outline-variant/10 relative z-10 shadow-[0_40px_80px_rgba(0,240,255,0.05)]"
            />
          </div>
        </FadeInUp>

        {/* Contenu du texte */}
        <FadeInUp delay={0.2} className="lg:w-1/2">
          <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface mb-8">À propos</h2>

          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-xl text-primary leading-relaxed mb-8 border-l-4 border-primary pl-6 italic"
          >
            "L&apos;ingénierie au service de l&apos;impact business."
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-on-surface-variant leading-relaxed text-lg"
          >
            Freelance passionné par les défis techniques complexes, je combine développement fullstack et expertise
            infrastructure pour garantir des produits rapides, sécurisés et évolutifs. Mon approche est résolument
            pragmatique : bâtir des fondations solides aujourd&apos;hui pour supporter la croissance de demain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex gap-4"
          >
            {['1+ ans d\'expérience', 'Fullstack Developer', 'DevOps Specialist'].map((badge) => (
              <motion.span
                key={badge}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-surface-container-high rounded-lg font-label text-xs uppercase tracking-wider text-primary border border-primary/20"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </FadeInUp>
      </div>
    </section>
  )
}
