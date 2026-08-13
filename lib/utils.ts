export type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean | undefined | null } | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim()
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isPhone(value: string): boolean {
  return /^\+?[\d\s\-()]{7,20}$/.test(value)
}
