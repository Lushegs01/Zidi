'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

interface WaitlistDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const FORMSPREE_URL = 'https://formspree.io/f/mjgneead'

export default function WaitlistDrawer({ isOpen, onClose }: WaitlistDrawerProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Reset form on close
      setTimeout(() => {
        setSubmitted(false)
        setError('')
      }, 300)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or email us at hello@zeedeelearn.com.')
      }
    } catch {
      setError('Something went wrong. Please try again or email us at hello@zeedeelearn.com.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="wl-overlay"
            className="fixed inset-0 z-[900] bg-[rgba(20,18,15,0.75)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="wl-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Join the Waitlist"
            className="fixed top-0 right-0 bottom-0 z-[901] w-full max-w-[480px] bg-midnight border-l border-white/8 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="p-8 sm:p-10 min-h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-ivory leading-tight">
                    Join the Waitlist
                  </h3>
                  <p className="text-sm text-ivory/45 mt-1.5">
                    We&apos;ll reach out as soon as your language is available.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 mt-0.5 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-white/7 text-ivory/60 hover:bg-white/14 hover:text-ivory transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              {submitted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full border-[1.5px] border-gold-bright bg-gold-bright/15 flex items-center justify-center mb-5">
                    <CheckCircle size={26} className="text-gold-bright" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-ivory mb-2">
                    You&apos;re on the list!
                  </h4>
                  <p className="text-sm text-ivory/50 leading-relaxed max-w-[30ch]">
                    We&apos;ll message you as soon as your language becomes available.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                  <div className="flex-1 space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-ivory/45 uppercase tracking-[0.06em] mb-1.5">
                          First Name <span className="text-gold-bright">*</span>
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          placeholder="e.g. Ama"
                          required
                          className="w-full bg-white/6 border border-white/10 rounded-[6px] px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/25 outline-none focus:border-gold-bright focus:bg-white/9 transition-colors font-body"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ivory/45 uppercase tracking-[0.06em] mb-1.5">
                          Last Name <span className="text-gold-bright">*</span>
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="e.g. Mensah"
                          required
                          className="w-full bg-white/6 border border-white/10 rounded-[6px] px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/25 outline-none focus:border-gold-bright focus:bg-white/9 transition-colors font-body"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ivory/45 uppercase tracking-[0.06em] mb-1.5">
                        Email Address <span className="text-gold-bright">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        className="w-full bg-white/6 border border-white/10 rounded-[6px] px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/25 outline-none focus:border-gold-bright focus:bg-white/9 transition-colors font-body"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ivory/45 uppercase tracking-[0.06em] mb-1.5">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder="+234 800 000 0000"
                        className="w-full bg-white/6 border border-white/10 rounded-[6px] px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/25 outline-none focus:border-gold-bright focus:bg-white/9 transition-colors font-body"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ivory/45 uppercase tracking-[0.06em] mb-1.5">
                        Which language(s) are you waiting for? <span className="text-gold-bright">*</span>
                      </label>
                      <input
                        type="text"
                        name="language"
                        placeholder="e.g. Hausa, Twi, Swahili…"
                        required
                        className="w-full bg-white/6 border border-white/10 rounded-[6px] px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/25 outline-none focus:border-gold-bright focus:bg-white/9 transition-colors font-body"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ivory/45 uppercase tracking-[0.06em] mb-1.5">
                        Who are the classes for? <span className="text-gold-bright">*</span>
                      </label>
                      <select
                        name="learner_type"
                        required
                        className="w-full bg-white/6 border border-white/10 rounded-[6px] px-3.5 py-2.5 text-sm text-ivory outline-none focus:border-gold-bright focus:bg-white/9 transition-colors font-body appearance-none"
                      >
                        <option value="" disabled>Select an option</option>
                        <option value="My child / children">My child / children</option>
                        <option value="Myself (adult)">Myself (adult)</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>

                    {error && (
                      <p className="text-sm text-coral">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-6 bg-ivory hover:bg-white text-midnight font-body font-bold text-sm py-3.5 rounded-[6px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Joining…' : 'Join the Waitlist'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
