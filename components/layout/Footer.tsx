'use client'

import { motion } from 'framer-motion'

interface FooterProps {
  onOpenPolicy: (id: string) => void
}

const navigateLinks = [
  { label: 'Learn', href: '#subjects' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Find a Tutor', href: '#enrol' },
  { label: 'Waitlist', href: '#waitlist' },
]

const policyLinks = [
  { label: 'Parents FAQ', id: 'parents-faq' },
  { label: 'Child Safety', id: 'child-safety' },
  { label: 'Privacy Policy', id: 'privacy-policy' },
  { label: 'Terms & Conditions', id: 'terms' },
  { label: 'Refund Policy', id: 'refund-policy' },
  { label: 'Fair Play Policy', id: 'fair-play' },
]

const trustItems = ['Vetted tutors', 'Safe online sessions', 'Your timezone']

function FooterLogo() {
  return (
    <a
      href="#"
      aria-label="Zidi — home"
      className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-md"
    >
      {/* Ascending bar chart mark — no white bg in footer */}
      <span className="inline-flex items-end gap-[3px]" aria-hidden="true">
        <span className="block w-[6px] rounded-sm bg-gold-bright" style={{ height: '0.35rem' }} />
        <span className="block w-[6px] rounded-sm bg-gold-bright" style={{ height: '0.6rem' }} />
        <span className="block w-[6px] rounded-sm bg-gold-bright" style={{ height: '0.85rem' }} />
        <span className="block w-[6px] rounded-sm bg-gold-bright" style={{ height: '1.15rem' }} />
      </span>
      <span className="font-display font-bold text-sm tracking-wide leading-none text-white">
        ZIDI
      </span>
    </a>
  )
}

function FooterColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-widest font-semibold text-white/25 mb-5">
      {children}
    </p>
  )
}

export default function Footer({ onOpenPolicy }: FooterProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="bg-midnight border-t border-white/6">
      <div className="max-w-content mx-auto px-6 pt-16 pb-8">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Column 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col gap-5"
          >
            <FooterLogo />
            <p className="font-display italic text-lg leading-snug text-white/55 whitespace-pre-line">
              {'Learn the language.\nKeep the connection.'}
            </p>
            <a
              href="mailto:hello@zeedeelearn.com"
              className="text-xs text-white/35 hover:text-gold-bright transition-colors duration-200 focus:outline-none focus-visible:text-gold-bright w-fit"
            >
              hello@zeedeelearn.com
            </a>
          </motion.div>

          {/* Column 2 — Navigate */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
          >
            <FooterColumnLabel>Navigate</FooterColumnLabel>
            <ul className="flex flex-col gap-3" role="list">
              {navigateLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-sm text-white/45 hover:text-gold-bright transition-colors duration-200 focus:outline-none focus-visible:text-gold-bright text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Resources & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.16 }}
          >
            <FooterColumnLabel>Resources &amp; Legal</FooterColumnLabel>
            <ul className="flex flex-col gap-3" role="list">
              {policyLinks.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => onOpenPolicy(id)}
                    className="text-sm text-white/45 hover:text-gold-bright transition-colors duration-200 focus:outline-none focus-visible:text-gold-bright text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/20 leading-relaxed">
            © 2026 Learn with Zidi. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6" role="list">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                {/* Subtle checkmark dot */}
                <span className="block w-1 h-1 rounded-full bg-gold-bright/50" aria-hidden="true" />
                <span className="text-xs text-white/30">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
