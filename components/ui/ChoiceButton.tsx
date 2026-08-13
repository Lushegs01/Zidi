'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ChoiceButtonProps {
  selected: boolean
  onClick: () => void
  emoji?: string
  label: string
  sublabel?: string
  value: string
  compact?: boolean
  children?: ReactNode
}

export default function ChoiceButton({
  selected,
  onClick,
  emoji,
  label,
  sublabel,
  compact = false,
}: ChoiceButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={`
        w-full text-left rounded-xl border-2 outline-none
        transition-colors duration-200 ease-in-out
        focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2
        cursor-pointer select-none
        ${compact ? 'flex items-center gap-3 px-4 py-3' : 'flex flex-col gap-1 px-5 py-4'}
        ${
          selected
            ? 'border-gold bg-gold-pale'
            : 'border-ivory-dark bg-ivory hover:border-gold'
        }
      `}
    >
      {compact ? (
        /* ── Compact: single-line with emoji + label side by side ── */
        <>
          {emoji && (
            <span className="text-xl leading-none flex-shrink-0" aria-hidden="true">
              {emoji}
            </span>
          )}
          <span
            className={`text-sm font-medium ${
              selected ? 'text-midnight' : 'text-zidi-text'
            }`}
          >
            {label}
          </span>
          {sublabel && (
            <span className="ml-auto text-xs text-zidi-muted flex-shrink-0">{sublabel}</span>
          )}
          {/* Selected indicator */}
          <span
            className={`ml-auto flex-shrink-0 h-4 w-4 rounded-full border-2 transition-colors duration-200 ${
              selected
                ? 'border-gold bg-gold'
                : 'border-zidi-muted/40 bg-transparent'
            }`}
            aria-hidden="true"
          />
        </>
      ) : (
        /* ── Default: stacked card layout ── */
        <>
          <div className="flex items-start justify-between gap-2">
            {emoji && (
              <span className="text-2xl leading-none" aria-hidden="true">
                {emoji}
              </span>
            )}
            {/* Selected indicator */}
            <span
              className={`flex-shrink-0 h-5 w-5 rounded-full border-2 transition-colors duration-200 ${
                selected
                  ? 'border-gold bg-gold'
                  : 'border-zidi-muted/40 bg-transparent'
              }`}
              aria-hidden="true"
            />
          </div>
          <span
            className={`text-sm font-semibold leading-snug ${
              selected ? 'text-midnight' : 'text-zidi-text'
            }`}
          >
            {label}
          </span>
          {sublabel && (
            <span className="text-xs text-zidi-muted leading-snug">{sublabel}</span>
          )}
        </>
      )}
    </motion.button>
  )
}
