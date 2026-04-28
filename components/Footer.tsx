'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export const Footer = () => {
  const footerLinks = [
    { label: 'Mentions Légales', href: '#' },
    { label: 'Confidentialité', href: '#' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/adams598', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/adams-dexter-tchatchoua-3609931a9/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:adamsdexter3@gmail.com', label: 'Email' },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-surface-container-low w-full py-16 px-6 md:px-8 mt-32 border-t border-outline-variant/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <img src="/export.png" alt="Adams.Dev Logo" className="h-8 w-8 object-contain" />
              <div className="text-2xl font-black text-primary font-headline">Adams.Dev</div>
            </div>
            <p className="text-on-surface-variant text-sm mt-2">Building scalable digital products</p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-8"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-label text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, color: '#00f0ff' }}
                  className="text-on-surface-variant hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-outline-variant/10 pt-8 text-center"
        >
          <p className="font-label text-sm text-on-surface-variant">
            © 2024 Adams.Dev. All rights reserved. Built with premium craftsmanship.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
