'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

// ---------------------------------------------------------------------------
// Trust items
// ---------------------------------------------------------------------------
const TRUST_ITEMS = [
  'Vetted, background-checked tutors',
  'Personalized matching — by people, not algorithms',
  'Flexible scheduling in your timezone',
  'Family-friendly, child-safe sessions',
  'Online via Zoom or Google Meet',
] as const

// ---------------------------------------------------------------------------
// TrustBar
// ---------------------------------------------------------------------------
export default function TrustBar() {
  const reduced = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="bg-forest" role="region" aria-label="Why families trust Zidi">
      <motion.ul
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 max-w-content mx-auto py-4 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {TRUST_ITEMS.map((item) => (
          <motion.li
            key={item}
            variants={itemVariants}
            className="flex items-center gap-2"
          >
            <CheckCircle
              className="flex-shrink-0"
              size={15}
              strokeWidth={2.2}
              style={{ color: 'var(--gold-bright)' }}
              aria-hidden="true"
            />
            <span className="font-body text-sm font-medium text-white/80 whitespace-nowrap">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
