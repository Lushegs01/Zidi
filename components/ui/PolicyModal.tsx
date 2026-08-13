'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { policies } from '@/data/policies'

interface PolicyModalProps {
  policyId: string | null
  onClose: () => void
}

export default function PolicyModal({ policyId, onClose }: PolicyModalProps) {
  const policy = policyId ? policies[policyId] : null

  useEffect(() => {
    if (policyId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [policyId])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {policyId && policy && (
        <>
          {/* Overlay */}
          <motion.div
            key="policy-overlay"
            className="fixed inset-0 z-[2000] bg-black/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="policy-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
            className="fixed inset-0 z-[2001] overflow-y-auto flex items-start justify-center p-4 py-8 sm:py-12"
          >
            <motion.div
              className="relative bg-white rounded-[12px] w-full max-w-2xl mx-auto shadow-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-black/5 text-zidi-muted hover:bg-black/10 hover:text-zidi-text transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="p-8 sm:p-12">
                <h2
                  id="policy-modal-title"
                  className="font-display text-3xl font-bold text-zidi-text mb-1"
                >
                  {policy.title}
                </h2>
                <p className="text-sm text-zidi-muted mb-8">
                  Last updated: {policy.lastUpdated}
                </p>

                <div className="space-y-5 text-zidi-text">
                  {policy.sections.map((section, i) => (
                    <div key={i}>
                      {section.heading && (
                        <h3 className="font-display text-base font-bold mb-2 mt-6">
                          {section.heading}
                        </h3>
                      )}
                      {section.content && (
                        <p className="text-sm leading-relaxed text-zidi-text/80 mb-2">
                          {section.content}
                        </p>
                      )}
                      {section.isList && section.items && (
                        <ul className="list-disc list-outside ml-5 space-y-1.5">
                          {section.items.map((item, j) => (
                            <li key={j} className="text-sm leading-relaxed text-zidi-text/80">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
