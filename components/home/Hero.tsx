'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}

// ---------------------------------------------------------------------------
// Local animation helpers
// ---------------------------------------------------------------------------
function FadeUp({ children, delay = 0, className = '', y = 36 }: FadeUpProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Scroll helper
// ---------------------------------------------------------------------------
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export default function Hero() {
  const reduced = useReducedMotion()

  const imageVariants = {
    hidden: { opacity: 0, scale: reduced ? 1 : 1.06 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      aria-label="Hero — Zidi language tutoring"
    >
      {/* ── Background photo ───────────────────────────────────────────────── */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.pexels.com/photos/33900346/pexels-photo-33900346.jpeg"
          alt="A Nigerian family in traditional attire at home — Zidi language tutoring"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 22%' }}
        />
      </motion.div>

      {/* ── Scrim — dark left-to-right for text legibility ─────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(100deg, rgba(20,18,15,0.92) 0%, rgba(20,18,15,0.80) 24%, rgba(20,18,15,0.48) 46%, rgba(20,18,15,0.12) 66%, rgba(20,18,15,0) 80%)',
        }}
        aria-hidden="true"
      />
      {/* ── Scrim — bottom fade for trust row / stat card legibility ───────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(20,18,15,0.55) 0%, transparent 32%)',
        }}
        aria-hidden="true"
      />

      {/* ── Ankara stripe — far left edge ─────────────────────────────────── */}
      <div
        className="absolute left-0 top-0 h-full w-[7px] z-20 bg-stripe-ankara"
        aria-hidden="true"
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col flex-1 max-w-content mx-auto w-full px-8 lg:px-12 xl:px-0 pt-28 pb-16 lg:pt-32 lg:pb-24">

        <div className="flex flex-col justify-center flex-1 max-w-[640px]">

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 w-fit backdrop-blur-sm mb-7"
          >
            <span className="h-2 w-2 rounded-full bg-gold-bright animate-pulse flex-shrink-0" />
            <span className="text-sm font-body font-medium tracking-wide text-white/80">
              Now enrolling · Yoruba &amp; Igbo
            </span>
          </motion.div>

          {/* Headline */}
          <FadeUp delay={0.2}>
            <h1
              className="font-display text-white"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                lineHeight: '1.04',
                letterSpacing: '-0.03em',
              }}
            >
              Pass your language on.
            </h1>
          </FadeUp>

          {/* Sub-headline */}
          <FadeUp delay={0.35} className="mt-6 lg:mt-7">
            <p className="font-body text-white/70 text-lg lg:text-xl leading-relaxed max-w-[540px]">
              Zidi connects diaspora families and learners with trusted, vetted tutors
              for personalized online Yoruba and Igbo lessons. One-on-one or group.
              Your schedule, your timezone.
            </p>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.5} className="mt-9 lg:mt-10">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('enrol')}
                className="inline-flex items-center justify-center rounded-full bg-ivory text-midnight font-body font-semibold text-base px-8 py-4 hover:bg-white active:scale-[0.97] transition-all duration-200 shadow-lg shadow-black/20"
              >
                Find a Tutor
              </button>
              <button
                onClick={() => scrollTo('subjects')}
                className="inline-flex items-center justify-center rounded-full border border-white/30 text-white font-body font-semibold text-base px-8 py-4 hover:bg-white/[0.1] hover:border-white/50 active:scale-[0.97] transition-all duration-200"
              >
                Explore Languages
              </button>
            </div>
          </FadeUp>

          {/* Trust row */}
          <FadeUp delay={0.65} className="mt-9">
            <div className="border-t border-white/15 pt-5">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  'Vetted tutors',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-body text-white/65"
                  >
                    <span className="text-gold-bright text-base leading-none" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
