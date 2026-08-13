export type Currency = 'NGN' | 'USD' | 'GBP' | 'CAD'

export const RATES: Record<Currency, number> = {
  NGN: 1,
  USD: 1 / 1400,
  GBP: 1 / 1900,
  CAD: 1 / 1000,
}

export const SYMBOLS: Record<Currency, string> = {
  NGN: '₦',
  USD: '$',
  GBP: '£',
  CAD: 'CA$',
}

export const CURRENCY_LABELS: Record<Currency, string> = {
  NGN: '₦ NGN',
  USD: '$ USD',
  GBP: '£ GBP',
  CAD: '$ CAD',
}

export interface PricingPlan {
  id: string
  type: 'private' | 'group'
  name: string
  frequency: 'once' | 'twice'
  frequencyLabel: string
  priceNGN: number
  sessionsPerMonth: number
  cadenceLabel: string
  featured: boolean
  badge?: string
  features: string[]
  gradient: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'private-once',
    type: 'private',
    name: 'Private · Once Weekly',
    frequency: 'once',
    frequencyLabel: 'Once per week',
    priceNGN: 36000,
    sessionsPerMonth: 4,
    cadenceLabel: 'total per month',
    featured: false,
    gradient: 'from-[#211E17] to-[#14120F]',
    features: [
      '4 sessions per month',
      '1-on-1 with your tutor',
      'Flexible scheduling',
      'Tutor matched to your level',
    ],
  },
  {
    id: 'private-twice',
    type: 'private',
    name: 'Private · Twice Weekly',
    frequency: 'twice',
    frequencyLabel: 'Twice per week',
    priceNGN: 55000,
    sessionsPerMonth: 8,
    cadenceLabel: 'total per month',
    featured: true,
    badge: 'Most popular',
    gradient: 'from-[#63754F] to-[#14120F]',
    features: [
      '8 sessions per month',
      '1-on-1 with your tutor',
      'Ideal for faster progress',
      'Tutor matched to your level',
    ],
  },
  {
    id: 'group-once',
    type: 'group',
    name: 'Group · Once Weekly',
    frequency: 'once',
    frequencyLabel: 'Once per week',
    priceNGN: 25000,
    sessionsPerMonth: 4,
    cadenceLabel: 'per person, per month',
    featured: false,
    gradient: 'from-forest to-[#14120F]',
    features: [
      '4 group sessions per month',
      'Groups of 2–4 people',
      'Great for families or friends',
      'Pricing is per person',
    ],
  },
  {
    id: 'group-twice',
    type: 'group',
    name: 'Group · Twice Weekly',
    frequency: 'twice',
    frequencyLabel: 'Twice per week',
    priceNGN: 40000,
    sessionsPerMonth: 8,
    cadenceLabel: 'per person, per month',
    featured: false,
    gradient: 'from-[#8B5A3C] to-[#14120F]',
    features: [
      '8 group sessions per month',
      'Groups of 2–4 people',
      'Best value for group learning',
      'Pricing is per person',
    ],
  },
]
