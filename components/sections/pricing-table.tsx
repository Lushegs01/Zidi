"use client";

import Link from "next/link";
import {
  CURRENCY_LABELS,
  currencies,
  formatPrice,
  plans,
  SESSION_MINUTES,
  type Currency,
} from "@/data/pricing";
import { setCurrency, useCurrency } from "@/lib/currency-store";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { Check } from "@/components/ui/icons";
import { CtaArrow } from "@/components/ui/button";

export function PricingTable({ compact = false }: { compact?: boolean }) {
  const currency = useCurrency();

  function choose(next: Currency) {
    setCurrency(next);
    track("pricing_currency_changed", { currency: next });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <div
          role="radiogroup"
          aria-label="Display prices in"
          className="inline-flex rounded-full border border-line-strong bg-shell p-1"
        >
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={currency === c}
              onClick={() => choose(c)}
              className={cn(
                "min-h-9 rounded-full px-3.5 text-[0.875rem] font-medium transition-colors duration-150",
                currency === c
                  ? "bg-ink text-bone"
                  : "text-ink-70 hover:bg-sand hover:text-ink",
              )}
            >
              <span className="sr-only">Show prices in </span>
              {c}
              <span className="sr-only"> ({CURRENCY_LABELS[c]})</span>
            </button>
          ))}
        </div>
        <p className="text-[0.875rem] text-ink-50">
          Quoted in naira and converted for guidance. You can pay in any of the four.
        </p>
      </div>

      <div
        className={cn(
          "mt-8 grid gap-5",
          compact ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-4",
        )}
      >
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={cn(
              "relative flex flex-col rounded-lg border bg-shell p-6 transition-shadow duration-300 md:p-7",
              plan.recommended
                ? "border-clay shadow-lift ring-1 ring-clay"
                : "border-line shadow-soft hover:shadow-lift",
            )}
          >
            {plan.recommended && (
              <span className="absolute -top-3 left-6 rounded-full bg-clay px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-bone">
                Most chosen
              </span>
            )}

            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-50">
              {plan.format === "private" ? "Private · one-to-one" : "Group · 2–4 people"}
            </p>
            <h3 className="mt-3 font-display text-[1.75rem] leading-none tracking-[-0.015em]">
              {plan.cadence}
            </h3>

            <p className="mt-6">
              <span className="font-display text-[2.75rem] leading-none tracking-[-0.025em] tabular-nums">
                {formatPrice(plan.monthlyNgn, currency)}
              </span>
              <span className="mt-1.5 block text-[0.875rem] text-ink-50">{plan.unit}</span>
            </p>

            <p className="mt-5 border-t border-line pt-5 text-[0.9375rem] leading-relaxed text-ink-70">
              {plan.bestFor}
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ink-70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/get-matched?plan=${plan.id}`}
              onClick={() => track("pricing_cta_click", { plan: plan.id, currency })}
              className={cn(
                "group/btn mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium transition-colors duration-200",
                plan.recommended
                  ? "bg-clay text-bone hover:bg-clay-700"
                  : "bg-transparent text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/45 hover:bg-ink/[0.035]",
              )}
            >
              Choose this plan
              <CtaArrow />
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-6 text-[0.875rem] text-ink-50">
        Every session is {SESSION_MINUTES} minutes. Group pricing is per person, and you
        bring your own group of 2–4 — we don&rsquo;t place strangers together.
      </p>
    </div>
  );
}
