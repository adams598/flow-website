'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Projets', href: '#projets' },
    { label: 'Services', href: '#services' },
    { label: 'Stack', href: '#stack' },
    { label: 'À propos', href: '#apropos' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-[0_20px_40px_rgba(0,240,255,0.04)]"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-black text-primary tracking-tighter font-headline"
        >
          Adams.Dev
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="font-label font-semibold text-sm tracking-wide uppercase text-on-surface-variant hover:text-primary-container transition-colors duration-300"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="mailto:adamsdexter3@gmail.com?subject=Projet%20-%20Demande%20d%27information"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="hidden md:block bg-surface-container-high border border-outline-variant/20 text-primary px-6 py-2 rounded-md font-label text-sm uppercase tracking-wide hover:bg-surface-container-highest transition-colors"
        >
          Discuter de votre projet
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-outline-variant/10 bg-surface-container-low"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-label font-semibold text-sm tracking-wide uppercase text-on-surface-variant hover:text-primary-container transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:adamsdexter3@gmail.com?subject=Projet%20-%20Demande%20d%27information"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-primary-container text-on-primary px-4 py-2 rounded-md font-label text-sm uppercase tracking-wide hover:opacity-90 mt-4"
            >
              Discuter de votre projet
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
