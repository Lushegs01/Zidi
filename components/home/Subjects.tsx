'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { liveSubjects, comingSoonSubjects, type Subject } from '@/data/subjects'

// ─── Animation variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
}

// ─── Ankara stripe ───────────────────────────────────────────────────────────
// A 3px left-edge stripe cycling gold → coral → forest

function AnkaraStripe() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-card"
      style={{
        background:
          'linear-gradient(180deg, #63754F 0%, #63754F 33%, #AD8862 33%, #AD8862 66%, #3F4A34 66%, #3F4A34 100%)',
      }}
    />
  )
}

// ─── Live subject card ────────────────────────────────────────────────────────

interface LiveCardProps {
  subject: Subject
  index: number
  onEnroll?: (id: string) => void
}

function LiveCard({ subject, index, onEnroll }: LiveCardProps) {
  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -4,
        boxShadow: '0 20px 48px rgba(20,18,15,0.30)',
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      onClick={() => onEnroll?.(subject.id)}
      className={`relative rounded-card p-8 flex flex-col gap-6 cursor-pointer overflow-hidden focus-within:ring-2 focus-within:ring-gold/50 outline-none ${
        index % 2 === 0 ? 'bg-midnight' : 'bg-forest'
      }`}
      tabIndex={0}
      role="button"
      aria-label={`Enrol in ${subject.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onEnroll?.(subject.id)
        }
      }}
    >
      <AnkaraStripe />

      {/* Available now badge */}
      <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-gold-bright/40 text-gold-bright text-xs font-semibold tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-bright inline-block" />
        Available now
      </span>

      {/* Language name */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl font-semibold text-white leading-tight">
          {subject.name}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed">
          {subject.longDescription ?? subject.description}
        </p>
      </div>

      {/* CTA */}
      <motion.span
        className="mt-auto inline-flex items-center gap-2 text-gold-bright text-sm font-semibold"
        whileHover="hovered"
        initial="idle"
      >
        Enrol now
        <motion.span
          variants={{
            idle: { x: 0 },
            hovered: { x: 4 },
          }}
          transition={{ duration: 0.18 }}
          aria-hidden="true"
        >
          →
        </motion.span>
      </motion.span>
    </motion.article>
  )
}

// ─── Coming soon card ─────────────────────────────────────────────────────────

interface SoonCardProps {
  subject: Subject
  index: number
  onWaitlist?: () => void
}

function SoonCard({ subject, index, onWaitlist }: SoonCardProps) {
  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="relative bg-ivory-dark border border-black/[0.07] rounded-card p-6 flex flex-col gap-4 opacity-70"
    >
      {/* Coming soon badge */}
      <span className="self-start inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/[0.06] text-zidi-muted text-xs font-semibold tracking-wide">
        Coming soon
      </span>

      {/* Emoji + name */}
      <div className="flex items-center gap-3">
        <span className="text-2xl leading-none" aria-hidden="true">
          {subject.emoji}
        </span>
        <h3 className="font-display text-lg font-semibold text-zidi-text">
          {subject.name}
        </h3>
      </div>

      <p className="text-zidi-muted text-sm leading-relaxed flex-1">
        {subject.description}
      </p>

      {/* Waitlist link */}
      <button
        onClick={onWaitlist}
        className="mt-auto self-start inline-flex items-center gap-1.5 text-zidi-muted text-sm font-semibold hover:text-zidi-text transition-colors duration-150 focus:outline-none focus-visible:underline"
        aria-label={`Join waitlist for ${subject.name}`}
      >
        Join Waitlist
        <span aria-hidden="true">→</span>
      </button>
    </motion.article>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

interface SubjectsProps {
  onEnroll?: (subject: string) => void
  onWaitlist?: () => void
}

export default function Subjects({ onEnroll, onWaitlist }: SubjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="subjects"
      ref={sectionRef}
      className="bg-ivory py-16 md:py-24"
      aria-labelledby="subjects-heading"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-12 md:mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
            What you can learn
          </p>
          <h2
            id="subjects-heading"
            className="font-display text-display-lg text-zidi-text mb-4"
          >
            Choose your language.
          </h2>
          <p className="text-zidi-muted text-base leading-relaxed">
            Start with Yoruba or Igbo — with more subjects coming soon as Zidi
            grows.
          </p>
        </motion.div>

        {/* Live subjects — 2 columns desktop, stacked mobile */}
        {isInView && (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8"
              role="list"
              aria-label="Available subjects"
            >
              {liveSubjects.map((subject, i) => (
                <div key={subject.id} role="listitem">
                  <LiveCard
                    subject={subject}
                    index={i}
                    onEnroll={onEnroll}
                  />
                </div>
              ))}
            </div>

            {/* Coming soon divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-black/[0.07]" />
              <span className="text-zidi-muted text-xs font-semibold tracking-widest uppercase whitespace-nowrap">
                More on the way
              </span>
              <div className="flex-1 h-px bg-black/[0.07]" />
            </div>

            {/* Coming soon subjects — 3+ columns */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4"
              role="list"
              aria-label="Coming soon subjects"
            >
              {comingSoonSubjects.map((subject, i) => (
                <div key={subject.id} role="listitem">
                  <SoonCard
                    subject={subject}
                    index={i + liveSubjects.length}
                    onWaitlist={onWaitlist}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
