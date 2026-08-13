'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Button from '@/components/ui/Button'

interface WaitlistSectionProps {
  onOpenWaitlist: () => void
}

const comingSoon = [
  'Hausa',
  'French',
  'Chess',
  'Piano',
  'African Dishes',
]

export default function WaitlistSection({ onOpenWaitlist }: WaitlistSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      className="bg-midnight py-20 md:py-28"
      aria-labelledby="waitlist-heading"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">

          {/* Coming-soon subject tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-2 mb-8"
            aria-label="Subjects coming soon"
          >
            {comingSoon.map((subject) => (
              <span
                key={subject}
                className="px-3 py-1.5 rounded-full border border-white/[0.12] text-white/50 text-xs font-medium tracking-wide"
              >
                {subject}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full border border-white/[0.12] text-white/35 text-xs font-medium tracking-wide">
              and more&hellip;
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="waitlist-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display text-display-lg text-ivory mb-5"
          >
            More is coming.
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-white/60 text-base leading-relaxed mb-10"
          >
            Hausa, French, Chess, Piano, African Dishes and more — coming to Zidi
            soon. Join the waitlist and we'll let you know the moment your
            language is ready.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenWaitlist}
            >
              Join the Waitlist →
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
