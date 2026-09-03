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

  const privatePlans = plans.filter((p) => p.format === "private");
  const groupPlans = plans.filter((p) => p.format === "group");

  return (
    <div>
      {/* ── Currency switcher ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div
          role="radiogroup"
          aria-label="Display prices in"
          className="inline-flex gap-1 rounded-full border border-line-strong bg-bone p-1"
        >
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={currency === c}
              onClick={() => choose(c)}
              className={cn(
                "min-h-9 rounded-full px-4 text-[0.8125rem] font-semibold tracking-[0.04em] transition-all duration-200",
                currency === c
                  ? "bg-kola text-bone shadow-soft"
                  : "text-ink-50 hover:bg-sand hover:text-ink",
              )}
            >
              <span className="sr-only">Show prices in </span>
              {c}
              <span className="sr-only"> ({CURRENCY_LABELS[c]})</span>
            </button>
          ))}
        </div>
        <p className="text-[0.8125rem] text-ink-50">
          Quoted in naira · converted for guidance
        </p>
      </div>

      {/* ── Plan grid ─────────────────────────────────────────────── */}
      <div className={cn("mt-10 grid gap-10", compact ? "" : "lg:gap-12")}>

        {/* Private lessons */}
        <div>
          {/* Section header */}
          <div className="mb-6 flex items-center gap-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-50">
              Private · one-to-one
            </p>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>

          <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
            {privatePlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} currency={currency} />
            ))}
          </div>
        </div>

        {/* Group lessons */}
        <div>
          <div className="mb-6 flex items-center gap-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-50">
              Group · 2–4 people you already know
            </p>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>

          <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
            {groupPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} currency={currency} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Footnote ──────────────────────────────────────────────── */}
      <p className="mt-8 text-[0.8125rem] text-ink-50">
        Every session is {SESSION_MINUTES} minutes. Group pricing is per person — you bring
        the group, we don&rsquo;t place strangers together.
      </p>
    </div>
  );
}

/* ── Individual plan card ────────────────────────────────────────── */
function PlanCard({
  plan,
  currency,
}: {
  plan: (typeof plans)[number];
  currency: Currency;
}) {
  const recommended = !!plan.recommended;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl transition-shadow duration-300",
        recommended
          ? "bg-kola text-bone shadow-lift"
          : "border border-line bg-bone shadow-soft hover:shadow-lift",
      )}
    >
      {/* Recommended glow strip at top */}
      {recommended && (
        <div
          aria-hidden="true"
          className="h-[3px] w-full bg-linear-to-r from-amber via-amber-bright to-amber"
        />
      )}

      <div className="flex flex-1 flex-col p-7 md:p-8">
        {/* Eyebrow */}
        <div className="flex items-center justify-between gap-3">
          <p
            className={cn(
              "text-[0.6875rem] font-semibold uppercase tracking-[0.16em]",
              recommended ? "text-amber" : "text-clay",
            )}
          >
            {plan.cadence}
          </p>
          {recommended && (
            <span className="rounded-full bg-amber/20 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-amber">
              Most chosen
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-6">
          <p
            className={cn(
              "font-display text-[3rem] leading-none tracking-[-0.03em] tabular-nums",
              recommended ? "text-bone" : "text-ink",
            )}
          >
            {formatPrice(plan.monthlyNgn, currency)}
          </p>
          <p
            className={cn(
              "mt-2 text-[0.8125rem]",
              recommended ? "text-bone/55" : "text-ink-50",
            )}
          >
            {plan.unit}
          </p>
        </div>

        {/* Divider */}
        <div
          className={cn(
            "my-6 h-px w-full",
            recommended ? "bg-bone/15" : "bg-line",
          )}
        />

        {/* Best for */}
        <p
          className={cn(
            "text-[0.9375rem] leading-relaxed",
            recommended ? "text-bone/70" : "text-ink-70",
          )}
        >
          {plan.bestFor}
        </p>

        {/* Includes */}
        <ul className="mt-5 flex-1 space-y-3">
          {plan.includes.map((item) => (
            <li
              key={item}
              className={cn(
                "flex items-start gap-3 text-[0.875rem]",
                recommended ? "text-bone/75" : "text-ink-70",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                  recommended ? "bg-amber/25" : "bg-clay/10",
                )}
              >
                <Check
                  className={cn(
                    "h-2.5 w-2.5",
                    recommended ? "text-amber" : "text-clay",
                  )}
                />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={`/get-matched?plan=${plan.id}`}
          onClick={() => track("pricing_cta_click", { plan: plan.id, currency })}
          className={cn(
            "group/btn mt-8 inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium transition-all duration-200",
            recommended
              ? "bg-amber text-kola hover:bg-amber-bright"
              : "bg-ink text-bone hover:bg-ink/85",
          )}
        >
          Choose this plan
          <CtaArrow />
        </Link>
      </div>
    </article>
  );
}
