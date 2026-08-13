import type { ReactNode } from 'react'

type Variant = 'live' | 'soon' | 'gold' | 'white'

const variantClasses: Record<Variant, string> = {
  live: 'border border-gold text-gold bg-midnight/80 font-medium',
  soon: 'border border-zidi-muted/30 text-zidi-muted bg-ivory-dark font-medium',
  gold: 'bg-gold text-midnight font-semibold',
  white: 'bg-white text-midnight font-semibold shadow-sm',
}

interface BadgeProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

export default function Badge({ variant = 'gold', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {variant === 'live' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
        </span>
      )}
      {children}
    </span>
  )
}
