'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { pricingPlans, type Currency } from '@/data/pricing'
import { convertPrice } from '@/lib/currency'

interface PricingProps {
  onEnroll?: (planId: string) => void
}

const currencies: Currency[] = ['NGN', 'USD', 'GBP', 'CAD']

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

function PriceDisplay({ price }: { price: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={price}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="font-display text-4xl font-bold leading-none text-white"
      >
        {price}
      </motion.span>
    </AnimatePresence>
  )
}

interface PricingCardProps {
  plan: (typeof pricingPlans)[number]
  currency: Currency
  onEnroll?: (planId: string) => void
  index: number
  inView: boolean
}

function PricingCard({ plan, currency, onEnroll, index, inView }: PricingCardProps) {
  const price = convertPrice(plan.priceNGN, currency)

  function handleCta() {
    onEnroll?.(plan.id)
    const el = document.getElementById('enrol')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.article
      custom={0.1 + index * 0.1}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
      className={`relative rounded-card overflow-hidden flex flex-col backdrop-blur-xl border ${
        plan.featured
          ? 'bg-white/[0.07] border-gold-bright/40 ring-1 ring-gold-bright/40 shadow-[0_8px_40px_rgba(126,145,105,0.15)]'
          : 'bg-white/[0.045] border-white/10'
      }`}
    >
      {/* Featured badge */}
      {plan.featured && plan.badge && (
        <div className="absolute top-5 right-5 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold-bright text-midnight text-xs font-bold tracking-wide uppercase">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 px-7 pt-7 pb-7 gap-5">
        {/* Type + name */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-1.5">
            {plan.type === 'private' ? 'Private' : 'Group'}
          </p>
          <h3 className="font-display text-xl font-semibold text-white leading-snug">
            {plan.name}
          </h3>
        </div>

        {/* Frequency */}
        <div className="flex items-center gap-2 text-white/45 text-sm">
          <Calendar size={14} strokeWidth={1.75} />
          <span>{plan.frequencyLabel}</span>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <PriceDisplay price={price} />
          <p className="text-xs text-white/40 leading-none">
            {plan.cadenceLabel}
          </p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2.5 flex-1" role="list">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-sm text-white/75 leading-snug">
              <Check
                size={14}
                strokeWidth={2.5}
                className="text-gold-bright mt-0.5 shrink-0"
              />
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant="dark"
          size="md"
          className="w-full mt-2"
          onClick={handleCta}
        >
          Get started
        </Button>
      </div>
    </motion.article>
  )
}

export default function Pricing({ onEnroll }: PricingProps) {
  const [currency, setCurrency] = useState<Currency>('NGN')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative bg-midnight py-20 md:py-28 overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      {/* ── Ambient glow orbs ─────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(126,145,105,0.28) 0%, rgba(173,136,98,0.14) 45%, transparent 75%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] z-0"
        style={{
          background: 'radial-gradient(circle, rgba(99,117,79,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-content mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-gold-bright mb-4">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="font-display text-display-lg text-white mb-4"
          >
            One simple monthly rate.
          </h2>
          <p className="text-white/55 text-base leading-relaxed max-w-lg mx-auto">
            Covers tutor matching, scheduling, and all your sessions. No hidden
            fees. Cancel anytime with 30 days' notice.
          </p>
        </motion.div>

        {/* Currency toggle */}
        <motion.div
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex justify-center mb-10"
          role="group"
          aria-label="Select currency"
        >
          <div className="inline-flex rounded-xl overflow-hidden border border-white/10 bg-white/[0.05] backdrop-blur-sm p-1 gap-1">
            {currencies.map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                aria-pressed={currency === c}
                className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright/60 ${
                  currency === c
                    ? 'bg-gold-bright text-midnight shadow-sm'
                    : 'bg-transparent text-white/55 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Price cards — 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {pricingPlans.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              currency={currency}
              onEnroll={onEnroll}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

        {/* Footer notes */}
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center space-y-1"
        >
          <p className="text-white/40 text-xs">
            Invoiced monthly, prepaid. Accepted in NGN, GBP, CAD, and USD.
          </p>
          <p className="text-white/40 text-xs">
            Groups are 2–4 people who know each other. Pricing is per person.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
