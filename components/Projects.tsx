'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimationWrappers'

interface Project {
  id: number
  title: string
  description: string
  image: string
  alt: string
  tags: string[]
  githubLink: string
  siteLink: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'BAI Formation Consulting',
    description: 'Plateforme d\'e-learning bancaire complète. Digitalisation de la formation pour les employés avec architecture scalable.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi8aK9TIotmo6xpa8kOCCKCqXoD9-EJGpc4ncf-MqZ0g4BMYmJLovKtROV6Qpl_CKIvgPF4d8m_KCjjSXhbTIM8gSUY7MZT_x6bh_y8J_0JYtpDDu67zRk_XxfzAlz2hTUu-k4j1D2MJazrBZXJOCfNOlrCZBRMr-PQL4Pvv4vPxwJ4UNybtrWOoc1PKdbKoby5fqfRNSgHfQoV2kR6o8aZrjDE4czIvmGCPBG1vy0IW8PwtVKB0CqwxGnSLgZ-61HSnAdVWMXzIQ',
    alt: 'Dashboard e-learning bancaire',
    tags: ['React', 'Node', 'Scalable Arch'],
    githubLink: 'https://github.com/adams598/bai-consulting-et-formation',
    siteLink: 'https://olivedrab-hornet-656554.hostingersite.com/',
  },
  {
    id: 2,
    title: 'Réservation Cinéma',
    description: 'Système complet de réservation. Intégration QR codes, paiement sécurisé et tableau de bord administrateur robuste.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuTZnykJvhz6EQh0y8xavTl0WT4w1qEMY-5jLrwXRNgBbMKMBTeXrzbtEc-PpzM2UI94iqBJDFU1v4MHaN3BD88L6FL4OxF9zFZXcq-cNXspjPM7xiD8KXk8mOueX1e4VDUHVMnUNlhDbNwmoZHZwBrBpCfPXWq9L6QR5PZkyEPRRIFVi8ur_DmiGk45-aJtBMJShheyMhD1MhK_ana40u7JHW2XO-fStaVQwFRiwa0NmZNZ0Gyo1NAMFceJGnF944jusIZN2YBhY',
    alt: 'Application mobile de réservation',
    tags: ['Web', 'Mobile', 'Admin Dashboard'],
    githubLink: 'https://github.com/adams598/drivin-chill',
    siteLink: 'https://drivinnchill.fr/',
  },
]

export const Projects = () => {
  return (
    <section className="mt-32 md:mt-48 scroll-mt-20" id="projets">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeInUp className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
          <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Projets Sélectionnés</h2>
          <span className="font-label text-sm uppercase tracking-[0.1em] text-primary">Études de cas</span>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-surface-container-low rounded-2xl overflow-hidden group border border-outline-variant/5 hover:border-primary/20 transition-colors"
              >
                {/* Image Container */}
                <div className="h-64 bg-surface-container relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-40" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="bg-surface-container-highest border-l-2 border-primary px-3 py-1 rounded font-label text-xs text-on-surface-variant cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <h3 className="font-headline font-bold text-2xl mb-4 text-primary">{project.title}</h3>
                  <p className="font-body text-on-surface-variant leading-relaxed">{project.description}</p>

                  {/* Links */}
                  <div className="flex gap-4 mt-6 pt-6 border-t border-outline-variant/10">
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors font-label text-sm"
                    >
                      <Github size={16} />
                      
                    </motion.a>
                    <motion.a
                      href={project.siteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors font-label text-sm"
                    >
                      <ExternalLink size={16} />
                      
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
