import type { InputHTMLAttributes } from 'react'

type Variant = 'light' | 'dark'

const variantClasses: Record<
  Variant,
  { wrapper: string; label: string; input: string; error: string }
> = {
  light: {
    wrapper: '',
    label: 'text-zidi-text/80 font-medium',
    input:
      'bg-ivory border border-ivory-dark text-zidi-text placeholder:text-zidi-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/20',
    error: 'text-coral',
  },
  dark: {
    wrapper: '',
    label: 'text-white/70 font-medium',
    input:
      'bg-white/8 border border-white/20 text-white placeholder:text-white/35 focus:border-gold focus:ring-2 focus:ring-gold/20',
    error: 'text-coral',
  },
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id: string
  error?: string
  variant?: Variant
  className?: string
}

export default function Input({
  label,
  id,
  error,
  variant = 'light',
  className = '',
  required,
  ...rest
}: InputProps) {
  const styles = variantClasses[variant]

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className={`text-sm ${styles.label}`}>
          {label}
          {required && <span className="ml-0.5 text-coral" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={id}
        required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 ${styles.input}`}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className={`text-xs ${styles.error}`}>
          {error}
        </p>
      )}
    </div>
  )
}
