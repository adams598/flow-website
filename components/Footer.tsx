'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { FlowMark } from '@/components/FlowMark'
import { SITE } from '@/lib/site'
import { useI18n } from './LocaleProvider'

export const Footer = () => {
  const { dict, href } = useI18n()

  const socialLinks = [
    { icon: Github, href: SITE.github, label: 'GitHub' },
    { icon: Linkedin, href: SITE.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${SITE.email}`, label: 'Email' },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-surface-container-low w-full py-16 px-6 md:px-8 mt-24 border-t border-outline-variant/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
          <div>
            <Link href={href('/')} className="flex items-center gap-3">
              <FlowMark tone="cyan" className="h-8 w-8" />
              <span className="text-2xl font-black text-primary font-headline">{SITE.name}</span>
            </Link>
            <p className="text-on-surface-variant text-sm mt-3 max-w-sm">
              {SITE.tagline}
              <br />
              {dict.footer.blurb}
            </p>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 mt-4 font-label text-sm text-on-surface hover:text-primary transition-colors"
            >
              <Phone size={16} />
              {SITE.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            {dict.nav.links.map((link) => (
              <a
                key={link.label}
                href={href(link.href)}
                className="font-label text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={href(dict.nav.ctaHref)}
              className="font-label text-sm text-primary hover:opacity-80 transition-opacity"
            >
              {dict.nav.cta}
            </a>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-on-surface-variant hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </div>

        <div className="border-t border-outline-variant/10 pt-8 text-center">
          <p className="font-label text-sm text-on-surface-variant">
            © {new Date().getFullYear()} {SITE.name}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
