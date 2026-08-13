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
// Noise texture — inline SVG data-URI for a subtle grain overlay
// ---------------------------------------------------------------------------
const NOISE_STYLE: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '160px 160px',
  opacity: 0.035,
  mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
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
    hidden: { opacity: 0, scale: reduced ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
    },
  }

  return (
    <section
      className="relative min-h-screen bg-midnight overflow-hidden flex flex-col"
      aria-label="Hero — Zidi language tutoring"
    >
      {/* ── Noise texture overlay ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0" style={NOISE_STYLE} aria-hidden="true" />

      {/* ── Ankara stripe — far left edge ─────────────────────────────────── */}
      <div
        className="absolute left-0 top-0 h-full w-[7px] z-10 bg-stripe-ankara"
        aria-hidden="true"
      />

      {/* ── Ghost text — ÈDÈ ──────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 z-0 select-none leading-none font-display text-gold"
        style={{
          fontSize: 'clamp(8rem, 22vw, 22rem)',
          opacity: 0.03,
          lineHeight: 1,
          paddingBottom: '2rem',
          paddingRight: '1rem',
          letterSpacing: '-0.04em',
        }}
        aria-hidden="true"
      >
        ÈDÈ
      </div>

      {/* ── Main content grid ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1 max-w-content mx-auto w-full px-8 lg:px-12 xl:px-0 pt-28 pb-16 lg:pt-32 lg:pb-24 gap-12 lg:gap-0">

        {/* ── LEFT — copy ─────────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center lg:w-[58%] lg:pr-16 xl:pr-20">

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 w-fit backdrop-blur-sm mb-7"
          >
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse flex-shrink-0" />
            <span className="text-sm font-body font-medium tracking-wide text-white/70">
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
            <p className="font-body text-white/60 text-lg lg:text-xl leading-relaxed max-w-[540px]">
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
                className="inline-flex items-center justify-center rounded-full bg-gold text-midnight font-body font-semibold text-base px-8 py-4 hover:bg-gold-bright active:scale-[0.97] transition-all duration-200 shadow-lg shadow-gold/20"
              >
                Find a Tutor
              </button>
              <button
                onClick={() => scrollTo('subjects')}
                className="inline-flex items-center justify-center rounded-full border border-white/20 text-white font-body font-semibold text-base px-8 py-4 hover:bg-white/[0.08] hover:border-white/40 active:scale-[0.97] transition-all duration-200 backdrop-blur-sm"
              >
                Explore Languages
              </button>
            </div>
          </FadeUp>

          {/* Trust row */}
          <FadeUp delay={0.65} className="mt-9">
            <div className="border-t border-white/[0.08] pt-5">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  'Vetted tutors',
                  'DBS checked for children',
                  'Match within 24 hours',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-body text-white/40"
                  >
                    <span className="text-gold/70 text-base leading-none" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>

        {/* ── RIGHT — photographic composition ───────────────────────────── */}
        <div className="lg:w-[42%] flex items-center justify-center lg:justify-end order-first lg:order-last">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full max-w-[480px] lg:max-w-none lg:w-full aspect-[4/5] rounded-card overflow-hidden shadow-2xl shadow-black/50"
          >
            {/* Warm colour grade overlay */}
            <div
              className="absolute inset-0 z-10 rounded-card pointer-events-none"
              style={{
                background:
                  'linear-gradient(160deg, rgba(201,138,0,0.08) 0%, transparent 50%, rgba(14,22,35,0.55) 100%)',
              }}
              aria-hidden="true"
            />

            <Image
              src="https://images.pexels.com/photos/6550044/pexels-photo-6550044.jpeg"
              alt="African mother and child learning together — Zidi language tutoring"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="object-cover object-center"
            />

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5, ease: 'easeOut' }}
              className="absolute bottom-5 left-5 z-20 rounded-xl bg-midnight/80 backdrop-blur-md border border-white/10 px-4 py-3 shadow-xl"
            >
              <p className="font-display text-gold text-2xl leading-none">200+</p>
              <p className="font-body text-white/60 text-xs mt-0.5 tracking-wide">
                Families learning with Zidi
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom gradient fade into next section ────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(14,22,35,0.6))',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
