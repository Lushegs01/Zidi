'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ClipboardList, Users, Calendar, Video } from 'lucide-react'

interface Step {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    icon: <ClipboardList size={20} strokeWidth={1.75} />,
    title: 'Tell us what you need',
    description:
      'Choose your subject, level, and session type. Group or private — whatever works best for how you learn.',
  },
  {
    number: '02',
    icon: <Users size={20} strokeWidth={1.75} />,
    title: 'We find your tutor',
    description:
      'Zidi hand-matches you with the right tutor from our vetted pool. No algorithm. A real person makes every match.',
  },
  {
    number: '03',
    icon: <Calendar size={20} strokeWidth={1.75} />,
    title: 'Choose your schedule',
    description:
      'Pick the days and times that work for you, in your timezone. Morning, evening, weekends — your call.',
  },
  {
    number: '04',
    icon: <Video size={20} strokeWidth={1.75} />,
    title: 'Start learning',
    description:
      'Meet your tutor online and begin. We stay in the background to make sure everything runs smoothly.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
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

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -4,
        boxShadow: '0 16px 40px rgba(14,22,35,0.10)',
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      className="relative bg-white rounded-card border border-black/[0.06] p-8 flex flex-col gap-5 overflow-hidden cursor-default"
    >
      {/* Step number — large, decorative, top-left */}
      <span
        aria-hidden="true"
        className="font-display text-5xl font-bold leading-none text-gold/20 select-none"
      >
        {step.number}
      </span>

      {/* Icon container */}
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gold/[0.10] text-gold">
        {step.icon}
      </span>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold text-zidi-text leading-snug">
          {step.title}
        </h3>
        <p className="text-zidi-muted text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      className="bg-ivory-dark py-16 md:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-14 md:mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="font-display text-display-lg text-zidi-text mb-4"
          >
            Simple. Personal. Yours.
          </h2>
          <p className="text-zidi-muted text-base leading-relaxed">
            Getting started with Zidi takes minutes. We handle the rest.
          </p>
        </motion.div>

        {/* Step cards grid — 2x2 on desktop, 1 column on mobile */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          role="list"
          aria-label="Steps to get started with Zidi"
        >
          {isInView &&
            steps.map((step, i) => (
              <div key={step.number} role="listitem">
                <StepCard step={step} index={i} />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
