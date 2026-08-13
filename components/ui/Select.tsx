import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

type Variant = 'light' | 'dark'

const variantClasses: Record<
  Variant,
  { label: string; select: string; chevron: string; error: string }
> = {
  light: {
    label: 'text-zidi-text/80 font-medium',
    select:
      'bg-ivory border border-ivory-dark text-zidi-text focus:border-gold focus:ring-2 focus:ring-gold/20',
    chevron: 'text-zidi-muted',
    error: 'text-coral',
  },
  dark: {
    label: 'text-white/70 font-medium',
    select:
      'bg-white/8 border border-white/20 text-white focus:border-gold focus:ring-2 focus:ring-gold/20',
    chevron: 'text-white/50',
    error: 'text-coral',
  },
}

interface Option {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  id: string
  error?: string
  options: Option[]
  variant?: Variant
  className?: string
}

export default function Select({
  label,
  id,
  error,
  options,
  variant = 'light',
  className = '',
  required,
  ...rest
}: SelectProps) {
  const styles = variantClasses[variant]

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className={`text-sm ${styles.label}`}>
          {label}
          {required && <span className="ml-0.5 text-coral" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={`w-full appearance-none rounded-xl px-4 py-3 pr-10 text-sm outline-none transition-all duration-200 cursor-pointer ${styles.select}`}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${styles.chevron}`}
          aria-hidden="true"
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className={`text-xs ${styles.error}`}>
          {error}
        </p>
      )}
    </div>
  )
}
