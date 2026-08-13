'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  date?: string
  children: ReactNode
  className?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  date,
  children,
  className = '',
}: ModalProps) {
  /* ── Escape key ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  /* ── Body scroll lock ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Overlay ── */}
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
            aria-hidden="true"
          />

          {/* ── Dialog ── */}
          <motion.div
            key="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none`}
          >
            <div
              className={`relative w-full max-w-2xl bg-white rounded-card shadow-2xl pointer-events-auto flex flex-col max-h-[90vh] ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header ── */}
              {(title || date) && (
                <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-ivory-dark">
                  {title && (
                    <h2
                      id="modal-title"
                      className="font-display text-2xl text-midnight leading-tight"
                    >
                      {title}
                    </h2>
                  )}
                  {date && (
                    <p className="mt-1 text-xs text-zidi-muted tracking-wide">{date}</p>
                  )}
                </div>
              )}

              {/* ── Close button ── */}
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute top-4 right-4 p-1.5 rounded-lg text-zidi-muted hover:text-zidi-text hover:bg-ivory-dark transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                <X className="h-4 w-4" />
              </button>

              {/* ── Scrollable content ── */}
              <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
