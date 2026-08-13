'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  User,
  UserCheck,
  Shield,
  Clock,
  RotateCcw,
  ChevronDown,
} from 'lucide-react'

const preferences = ['Subject', 'Level', 'Schedule', 'Timezone']

const guarantees = [
  {
    icon: Shield,
    title: 'Vetted & verified',
    body: 'Background-checked and personally reviewed',
  },
  {
    icon: Clock,
    title: 'Within 24 hours',
    body: 'We aim to match you within a day',
  },
  {
    icon: RotateCcw,
    title: 'Free rematch',
    body: "Not happy? We'll find someone better at no cost",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

function FlowArrow() {
  return (
    <div className="flex flex-col items-center gap-0 my-1" aria-hidden="true">
      <div className="w-px h-8 bg-gradient-to-b from-gold/30 to-gold/60" />
      <ChevronDown size={14} className="text-gold/70 -mt-1" strokeWidth={2} />
    </div>
  )
}

function MatchingDiagram({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto select-none">
      {/* YOU card */}
      <motion.div
        custom={0.1}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="w-full bg-white border border-black/[0.08] rounded-card px-5 py-4 flex items-center gap-3 shadow-sm"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ivory-dark text-zidi-text shrink-0">
          <User size={18} strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-zidi-muted leading-none mb-0.5">
            Learner
          </p>
          <p className="font-display text-lg font-semibold text-zidi-text leading-none">
            You
          </p>
        </div>
      </motion.div>

      <FlowArrow />

      {/* Preference chips */}
      <motion.div
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-wrap justify-center gap-2"
      >
        {preferences.map((pref) => (
          <span
            key={pref}
            className="px-3 py-1 rounded-full bg-ivory text-zidi-text border border-black/[0.07] text-xs font-medium tracking-wide"
          >
            {pref}
          </span>
        ))}
      </motion.div>

      <FlowArrow />

      {/* ZIDI node */}
      <motion.div
        custom={0.3}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative"
      >
        {/* Pulsing ring */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gold/20"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gold shadow-[0_0_30px_rgba(201,138,0,0.35)]">
          <span className="font-display font-bold text-midnight text-base tracking-widest uppercase">
            Zidi
          </span>
        </div>
      </motion.div>

      <FlowArrow />

      {/* YOUR TUTOR card */}
      <motion.div
        custom={0.4}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="w-full bg-midnight border border-white/[0.09] rounded-card px-5 py-4 flex items-center gap-3 shadow-md"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold/10 text-gold shrink-0">
          <UserCheck size={18} strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gold leading-none mb-0.5">
            Matched
          </p>
          <p className="font-display text-lg font-semibold text-white leading-snug">
            Your tutor
          </p>
          <p className="text-white/50 text-xs leading-none mt-1">
            Within 24 hours
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function TutorMatching() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-ivory-dark py-20 md:py-28"
      aria-labelledby="tutor-matching-heading"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: text ────────────────────────────────── */}
          <div>
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-xs font-semibold tracking-widest uppercase text-gold mb-4"
            >
              Tutor matching
            </motion.p>

            <motion.h2
              id="tutor-matching-heading"
              custom={0.08}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-display text-display-lg text-zidi-text mb-5"
            >
              We find the right person for you.
            </motion.h2>

            <motion.p
              custom={0.16}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-zidi-muted text-base leading-relaxed max-w-md mb-12"
            >
              Tell us who is learning, what they want to learn, and when they
              are free. We do the rest — personally, not algorithmically.
            </motion.p>

            {/* Guarantee callouts */}
            <div className="flex flex-col gap-6">
              {guarantees.map((g, i) => (
                <motion.div
                  key={g.title}
                  custom={0.22 + i * 0.1}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="flex items-start gap-4"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/[0.10] text-gold shrink-0 mt-0.5">
                    <g.icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-semibold text-zidi-text text-sm leading-snug mb-0.5">
                      {g.title}
                    </p>
                    <p className="text-zidi-muted text-sm leading-relaxed">
                      {g.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: matching diagram ───────────────────── */}
          <div className="flex justify-center lg:justify-end">
            <MatchingDiagram inView={isInView} />
          </div>
        </div>
      </div>
    </section>
  )
}
