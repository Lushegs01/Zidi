'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ShieldCheck,
  Eye,
  Lock,
  FileText,
  MessageCircle,
  CheckCircle,
} from 'lucide-react'

interface SafetySectionProps {
  onOpenPolicy: (id: string) => void
}

const safetyPoints = [
  {
    icon: ShieldCheck,
    title: 'Tutor vetting',
    body: 'Every tutor is personally reviewed and background-checked before they teach anyone under 18.',
  },
  {
    icon: Eye,
    title: 'Parent visibility',
    body: 'Parents can sit in on any session. We actively encourage it for younger children.',
  },
  {
    icon: Lock,
    title: 'Controlled communication',
    body: 'Sessions are video-only. No private messaging outside the agreed platform.',
  },
  {
    icon: FileText,
    title: 'Age-appropriate content',
    body: "Tutors deliver sessions suitable for the learner's age. Inappropriate content results in immediate termination.",
  },
  {
    icon: MessageCircle,
    title: 'Reporting channel',
    body: "Something doesn't feel right? Email hello@zeedeelearn.com and we'll investigate promptly.",
  },
]

const vettingSteps = [
  {
    number: '01',
    title: 'Application review',
    subtitle: 'Initial screening of qualifications and experience',
  },
  {
    number: '02',
    title: 'Interview & background check',
    subtitle: 'In-depth interview plus formal criminal record check',
  },
  {
    number: '03',
    title: 'Reference verification',
    subtitle: 'We contact and verify professional references directly',
  },
  {
    number: '04',
    title: 'Safeguarding sign-off',
    subtitle: 'Completion of our child safeguarding training module',
  },
]

const policyLinks = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms & Conditions' },
  { id: 'fair-play', label: 'Fair Play Policy' },
  { id: 'refund', label: 'Refund Policy' },
  { id: 'child-safety', label: 'Child Safety Policy' },
  { id: 'parents-faq', label: 'Parents FAQ' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

export default function SafetySection({ onOpenPolicy }: SafetySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      className="bg-midnight py-20 md:py-28"
      aria-labelledby="safety-heading"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* ── Left: safety points ──────────────────────── */}
          <div>
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-xs font-semibold tracking-widest uppercase text-gold-bright mb-4"
            >
              Learning with confidence
            </motion.p>

            <motion.h2
              id="safety-heading"
              custom={0.08}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-display text-display-lg text-white mb-5"
            >
              Safe, structured, and professionally delivered.
            </motion.h2>

            <motion.p
              custom={0.16}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-white/60 text-base leading-relaxed mb-10"
            >
              We take the safety of every learner seriously. Here is how we
              protect your child and your family.
            </motion.p>

            <ul className="flex flex-col gap-7" role="list">
              {safetyPoints.map((point, i) => (
                <motion.li
                  key={point.title}
                  custom={0.22 + i * 0.08}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="flex items-start gap-4"
                  role="listitem"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] text-gold-bright shrink-0 mt-0.5">
                    <point.icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-semibold text-white text-sm leading-snug mb-1">
                      {point.title}
                    </p>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {point.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ── Right: vetting card ───────────────────────── */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col lg:justify-center"
          >
            <div className="bg-white/[0.04] border border-white/[0.09] rounded-card p-7 md:p-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-gold-bright mb-7">
                Tutor vetting process
              </p>

              <ol className="flex flex-col gap-7" role="list">
                {vettingSteps.map((step, i) => (
                  <li
                    key={step.number}
                    className="flex items-start gap-4"
                    role="listitem"
                  >
                    {/* Step number */}
                    <span className="font-display text-2xl font-bold text-gold-bright leading-none shrink-0 w-8 mt-0.5">
                      {step.number}
                    </span>

                    {/* Text */}
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm leading-snug mb-0.5">
                        {step.title}
                      </p>
                      <p className="text-white/50 text-xs leading-relaxed">
                        {step.subtitle}
                      </p>
                    </div>

                    {/* Checkmark */}
                    <CheckCircle
                      size={18}
                      strokeWidth={1.75}
                      className="text-gold-bright shrink-0 mt-0.5"
                      aria-label="Completed"
                    />
                  </li>
                ))}
              </ol>

              {/* Divider */}
              <div className="mt-8 pt-7 border-t border-white/[0.07]">
                <p className="text-white/40 text-xs leading-relaxed">
                  Every tutor is individually assessed before being admitted to
                  the Zidi platform. No exceptions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Policy links ──────────────────────────────────── */}
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-14 pt-8 border-t border-white/[0.07]"
        >
          <nav aria-label="Policy documents">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 justify-center" role="list">
              {policyLinks.map((link) => (
                <li key={link.id} role="listitem">
                  <button
                    onClick={() => onOpenPolicy(link.id)}
                    className="text-white/40 text-xs underline underline-offset-2 decoration-white/20 hover:text-white/70 hover:decoration-white/40 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 rounded"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </div>
    </section>
  )
}
