/**
 * Pricing is quoted in naira and converted on the client, exactly as the
 * business quotes it today. Update `RATES` when the business revises them.
 */
export const currencies = ["NGN", "GBP", "USD", "CAD"] as const;
export type Currency = (typeof currencies)[number];

export const RATES: Record<Currency, number> = {
  NGN: 1,
  USD: 1 / 1400,
  GBP: 1 / 1900,
  CAD: 1 / 1000,
};

export const SYMBOLS: Record<Currency, string> = {
  NGN: "₦",
  GBP: "£",
  USD: "$",
  CAD: "CA$",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  NGN: "Naira",
  GBP: "Pounds",
  USD: "US dollars",
  CAD: "Canadian dollars",
};

export function convert(ngn: number, currency: Currency): number {
  return Math.round(ngn * RATES[currency]);
}

export function formatPrice(ngn: number, currency: Currency): string {
  return SYMBOLS[currency] + convert(ngn, currency).toLocaleString("en-GB");
}

export type PlanFormat = "private" | "group";

export interface Plan {
  id: string;
  format: PlanFormat;
  /** Human label for the cadence, e.g. "Once a week". */
  cadence: string;
  frequencyPerWeek: 1 | 2;
  monthlyNgn: number;
  sessionsPerMonth: number;
  /** Shown under the price so the unit is never ambiguous. */
  unit: string;
  bestFor: string;
  includes: string[];
  /** Marks the plan the business recommends. Exactly one should be true. */
  recommended?: boolean;
}

export const SESSION_MINUTES = 60;
export const GROUP_MIN = 2;
export const GROUP_MAX = 4;

export const plans: Plan[] = [
  {
    id: "private-1x",
    format: "private",
    cadence: "Once a week",
    frequencyPerWeek: 1,
    monthlyNgn: 36000,
    sessionsPerMonth: 4,
    unit: "total per month",
    bestFor:
      "A steady start, or a busy week that only has room for one fixed hour.",
    includes: [
      "4 private sessions a month, 1 hour each",
      "One tutor, matched to your goals",
      "A fixed weekly slot in your timezone",
      "Rematch free within your first two sessions",
    ],
  },
  {
    id: "private-2x",
    format: "private",
    cadence: "Twice a week",
    frequencyPerWeek: 2,
    monthlyNgn: 55000,
    sessionsPerMonth: 8,
    unit: "total per month",
    bestFor:
      "Learners who want momentum. Two contacts a week is where most people stop forgetting between lessons.",
    includes: [
      "8 private sessions a month, 1 hour each",
      "One tutor, matched to your goals",
      "Two fixed weekly slots in your timezone",
      "Rematch free within your first two sessions",
    ],
    recommended: true,
  },
  {
    id: "group-1x",
    format: "group",
    cadence: "Once a week",
    frequencyPerWeek: 1,
    monthlyNgn: 25000,
    sessionsPerMonth: 4,
    unit: "per person, per month",
    bestFor:
      "Siblings, cousins or a few friends learning together — you bring the group.",
    includes: [
      "4 group sessions a month, 1 hour each",
      "Groups of 2–4 people who already know each other",
      "One tutor for the whole group",
      "Priced per person",
    ],
  },
  {
    id: "group-2x",
    format: "group",
    cadence: "Twice a week",
    frequencyPerWeek: 2,
    monthlyNgn: 40000,
    sessionsPerMonth: 8,
    unit: "per person, per month",
    bestFor:
      "A group that wants real pace without private-lesson pricing.",
    includes: [
      "8 group sessions a month, 1 hour each",
      "Groups of 2–4 people who already know each other",
      "One tutor for the whole group",
      "Priced per person",
    ],
  },
];

export const planChoices = plans.map((p) => ({
  value: p.id,
  label: `${p.format === "private" ? "Private" : "Group"} · ${p.cadence.toLowerCase()}`,
}));

/** Facts that belong next to the price, not buried in terms. */
export const billingFacts = [
  {
    title: "Invoiced monthly, in advance",
    detail:
      "We email an invoice at the start of each billing period. Pay by bank transfer in naira, pounds, US dollars or Canadian dollars. Card payment is not available yet.",
  },
  {
    title: "One rate covers everything",
    detail:
      "Tutor matching, scheduling, and our support if anything needs changing. There is no separate matching or platform fee.",
  },
  {
    title: "Cancel with 30 days' notice",
    detail:
      "Email us and the next billing period stops. The current period is not refunded once two sessions have been delivered.",
  },
  {
    title: "If the fit is wrong, we fix it",
    detail:
      "Tell us within your first two sessions and we rematch you at no extra cost, or refund the unused sessions in that period minus a £10 / ₦10,000 admin fee.",
  },
];
