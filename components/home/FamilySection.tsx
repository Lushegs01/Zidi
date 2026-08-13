'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  UserCheck,
  Heart,
  Calendar,
  Globe,
  Shield,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: UserCheck,
    title: 'Vetted tutors',
    description: 'Every tutor is background-checked and personally reviewed.',
  },
  {
    icon: Heart,
    title: 'Child-focused learning',
    description: "Sessions designed for children's attention spans and learning styles.",
  },
  {
    icon: Calendar,
    title: 'Flexible scheduling',
    description: "Choose days and times that fit your family's routine.",
  },
  {
    icon: Globe,
    title: 'Your timezone',
    description: 'Tutors work across UK, Nigeria, US, and Canada timezones.',
  },
  {
    icon: Shield,
    title: 'Safe sessions',
    description: 'Video-only sessions via Zoom or Google Meet. Parents welcome to observe.',
  },
  {
    icon: RotateCcw,
    title: 'Free rematch',
    description: "Not happy after two sessions? We'll find a better match at no cost.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
}

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="bg-white rounded-card p-4 border border-black/5 shadow-sm flex flex-col gap-3"
    >
      {/* Icon container */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'rgba(201,138,0,0.12)' }}
        aria-hidden="true"
      >
        <Icon size={18} className="text-gold" strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div>
        <p className="font-body font-semibold text-zidi-text text-sm mb-0.5">
          {feature.title}
        </p>
        <p className="font-body text-zidi-muted text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function FamilySection() {
  const textRef = useRef<HTMLDivElement>(null)
  const isTextInView = useInView(textRef, { once: true, margin: '-80px' })

  return (
    <section
      className="bg-ivory"
      aria-labelledby="family-section-heading"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* LEFT: Text + CTA */}
          <div ref={textRef} className="lg:sticky lg:top-28">
            {/* Eyebrow */}
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              className="font-body text-sm font-semibold tracking-[0.18em] uppercase text-gold mb-5"
            >
              For parents
            </motion.p>

            {/* Heading */}
            <motion.h2
              id="family-section-heading"
              custom={0.08}
              variants={fadeUp}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              className="font-display text-zidi-text mb-6 leading-[1.06] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              A better way to
              <br />
              pass it on.
            </motion.h2>

            {/* Sub */}
            <motion.p
              custom={0.18}
              variants={fadeUp}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              className="font-body text-zidi-muted text-base leading-relaxed mb-10 max-w-md"
            >
              Zidi was built with diaspora families in mind. Whether you want your children
              to speak with their grandparents, or you want to reconnect with your own
              heritage \u2014 we make it easy.
            </motion.p>

            {/* CTA */}
            <motion.div
              custom={0.26}
              variants={fadeUp}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
            >
              <a
                href="#enrol"
                className="inline-flex items-center gap-2 bg-gold text-white font-body font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200 hover:bg-gold-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Find a Tutor
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Feature grid 2x3 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delay={i * 0.07}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
