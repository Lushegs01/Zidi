'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'gold' | 'dark' | 'outline' | 'outline-dark'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  gold: 'bg-gold text-midnight hover:bg-gold-bright font-semibold shadow-sm',
  dark: 'bg-midnight text-white hover:bg-midnight-2 font-semibold shadow-sm',
  outline: 'bg-transparent border border-white/30 text-white/85 hover:border-gold hover:text-gold font-medium',
  'outline-dark': 'bg-transparent border border-zidi-text/20 text-zidi-text hover:border-gold hover:text-gold font-medium',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none whitespace-nowrap'

const motionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.96 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
}

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children?: ReactNode
  disabled?: boolean
}

type ButtonAsButton = BaseProps & HTMLMotionProps<'button'> & { href?: undefined }
type ButtonAsAnchor = BaseProps & HTMLMotionProps<'a'> & { href: string }

type Props = ButtonAsButton | ButtonAsAnchor

export default function Button({
  variant = 'gold',
  size = 'md',
  className = '',
  children,
  href,
  disabled,
  ...rest
}: Props) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href !== undefined) {
    const anchorProps = rest as HTMLMotionProps<'a'>
    return (
      <motion.a
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        className={`${classes} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        {...motionProps}
        {...anchorProps}
      >
        {children}
      </motion.a>
    )
  }

  const buttonProps = rest as HTMLMotionProps<'button'>
  return (
    <motion.button
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...buttonProps}
    >
      {children}
    </motion.button>
  )
}
