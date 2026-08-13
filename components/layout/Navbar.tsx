'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

interface NavbarProps {
  onOpenPolicy: (id: string) => void
  onOpenWaitlist: () => void
}

const navLinks = [
  { label: 'Learn', href: '#subjects' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'For Parents', href: '#for-parents' },
]

function ZidiLogo({ dark = false }: { dark?: boolean }) {
  const barColor = dark ? 'bg-gold-bright' : 'bg-midnight'
  const wordmarkColor = dark ? 'text-ivory' : 'text-midnight'
  return (
    <a
      href="#"
      aria-label="Zidi — home"
      className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-full"
    >
      <span className="inline-flex items-center gap-2">
        {/* Ascending bar chart logo mark */}
        <span className="inline-flex items-end gap-[3px]" aria-hidden="true">
          <span className={`block w-2 rounded-sm ${barColor}`} style={{ height: '0.4rem' }} />
          <span className={`block w-2 rounded-sm ${barColor}`} style={{ height: '0.7rem' }} />
          <span className={`block w-2 rounded-sm ${barColor}`} style={{ height: '1rem' }} />
          <span className={`block w-2 rounded-sm ${barColor}`} style={{ height: '1.4rem' }} />
        </span>
        <span className={`font-display font-bold text-base tracking-wide leading-none ${wordmarkColor}`}>
          ZIDI
        </span>
      </span>
    </a>
  )
}

export default function Navbar({ onOpenPolicy: _onOpenPolicy, onOpenWaitlist }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-ivory/90 backdrop-blur-md border-b border-midnight/[0.07] shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-content mx-auto flex items-center justify-between py-4 px-5 md:py-5 md:px-6">
          {/* Logo */}
          <ZidiLogo dark={!scrolled} />

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-7" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => scrollTo(href)}
                  className={`text-sm font-medium transition-colors duration-200 focus:outline-none ${
                    scrolled
                      ? 'text-zidi-text/65 hover:text-gold focus-visible:text-gold'
                      : 'text-white/80 hover:text-gold-bright focus-visible:text-gold-bright'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={onOpenWaitlist}
                className={`text-sm font-medium transition-colors duration-200 focus:outline-none ${
                  scrolled
                    ? 'text-zidi-text/65 hover:text-gold focus-visible:text-gold'
                    : 'text-white/80 hover:text-gold-bright focus-visible:text-gold-bright'
                }`}
              >
                Waitlist
              </button>
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button variant="gold" size="sm" onClick={() => scrollTo('#enrol')}>
              Find a Tutor
            </Button>
          </div>

          {/* Hamburger button (mobile) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-md"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={`block w-6 h-[2px] rounded-full origin-center ${scrolled ? 'bg-midnight' : 'bg-white'}`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={`block w-6 h-[2px] rounded-full ${scrolled ? 'bg-midnight' : 'bg-white'}`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={`block w-6 h-[2px] rounded-full origin-center ${scrolled ? 'bg-midnight' : 'bg-white'}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-midnight/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel from right */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm bg-midnight flex flex-col md:hidden shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <ZidiLogo dark />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/8 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M4 4L16 16M16 4L4 16"
                      stroke="white"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav
                className="flex flex-col flex-1 px-6 pt-8 gap-1 overflow-y-auto"
                aria-label="Mobile navigation"
              >
                {navLinks.map(({ label, href }, i) => (
                  <motion.button
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.25 }}
                    onClick={() => scrollTo(href)}
                    className="text-left text-xl font-medium text-white/80 hover:text-gold-bright py-4 border-b border-white/6 transition-colors duration-200 focus:outline-none focus-visible:text-gold-bright"
                  >
                    {label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + navLinks.length * 0.06, duration: 0.25 }}
                  onClick={() => {
                    setMenuOpen(false)
                    onOpenWaitlist()
                  }}
                  className="text-left text-xl font-medium text-white/80 hover:text-gold-bright py-4 border-b border-white/6 transition-colors duration-200 focus:outline-none focus-visible:text-gold-bright"
                >
                  Waitlist
                </motion.button>
              </nav>

              {/* CTA at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.3 }}
                className="px-6 pb-10 pt-6"
              >
                <Button
                  variant="dark"
                  size="md"
                  className="w-full"
                  onClick={() => scrollTo('#enrol')}
                >
                  Find a Tutor
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
