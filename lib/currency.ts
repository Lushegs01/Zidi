import { Currency, RATES, SYMBOLS } from '@/data/pricing'

export function convertPrice(ngnAmount: number, currency: Currency): string {
  const rate = RATES[currency]
  const symbol = SYMBOLS[currency]
  const converted = Math.round(ngnAmount * rate)

  if (currency === 'NGN') {
    return `${symbol}${converted.toLocaleString()}`
  }

  // For foreign currencies, show cleaner numbers
  if (converted >= 1000) {
    return `${symbol}${converted.toLocaleString()}`
  }
  return `${symbol}${converted.toLocaleString()}`
}
