'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { FlowMark } from '@/components/FlowMark'
import { SITE } from '@/lib/site'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitch } from './LanguageSwitch'
import { useI18n } from './LocaleProvider'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { dict, href } = useI18n()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-5">
        <Link href={href('/')} className="flex items-center gap-3 group">
          <FlowMark tone="cyan" className="h-9 w-9" />
          <span className="font-headline font-extrabold text-xl tracking-tight text-on-surface group-hover:text-primary transition-colors">
            {SITE.name}
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {dict.nav.links.map((link, idx) => (
            <motion.a
              key={link.href}
              href={href(link.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="font-label font-medium text-sm text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch />
          <ThemeToggle />
          <motion.a
            href={href(dict.nav.ctaHref)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-5 py-2.5 rounded-lg font-label text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
          >
            {dict.nav.cta}
          </motion.a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitch />
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary p-1"
            aria-label={isOpen ? dict.nav.closeMenu : dict.nav.openMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-outline-variant/10 bg-surface-container-low"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {dict.nav.links.map((link) => (
              <a
                key={link.href}
                href={href(link.href)}
                onClick={() => setIsOpen(false)}
                className="font-label font-medium text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={href(dict.nav.ctaHref)}
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-primary-container text-on-primary px-4 py-3 rounded-lg font-label text-sm font-semibold mt-2"
            >
              {dict.nav.cta}
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
