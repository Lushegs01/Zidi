'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Drawer({ isOpen, onClose, children }: DrawerProps) {
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
          {/* ── Backdrop ── */}
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(3px)' }}
            aria-hidden="true"
          />

          {/* ── Drawer panel ── */}
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className={`
              fixed top-0 right-0 bottom-0 z-50
              w-full max-w-[480px]
              bg-midnight
              border-l border-white/10
              flex flex-col
              overflow-hidden
              sm:max-w-[480px]
              max-[519px]:max-w-full max-[519px]:border-l-0
            `}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
