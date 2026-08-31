"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Alert, Check } from "@/components/ui/icons";

export function StepProgress({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-clay">
          Step {current} of {total}
        </p>
        <p className="text-[0.8125rem] text-ink-50">{label}</p>
      </div>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${current} of ${total}: ${label}`}
        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-clay transition-[width] duration-500 ease-out-soft"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/**
 * One step of a flow. The heading is focused on entry so screen-reader and
 * keyboard users land on the new question rather than at the top of the page.
 */
export function Step({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  return (
    <div key={step} className="animate-[zidi-rise_0.4s_var(--ease-out-soft)_both]">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-[1.875rem] leading-tight tracking-[-0.018em] outline-none md:text-[2.25rem]"
      >
        {title}
      </h2>
      {hint && <p className="mt-3 max-w-[54ch] text-ink-70">{hint}</p>}
      <div className="mt-8 space-y-7">{children}</div>
    </div>
  );
}

export function StepNav({
  onBack,
  canGoBack,
  submitting,
  isLast,
  nextLabel,
  submitLabel,
}: {
  onBack: () => void;
  canGoBack: boolean;
  submitting: boolean;
  isLast: boolean;
  nextLabel?: string;
  submitLabel: string;
}) {
  return (
    <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
      {canGoBack ? (
        <Button
          type="button"
          variant="quiet"
          onClick={onBack}
          disabled={submitting}
          className="justify-center sm:justify-start"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      ) : (
        <span className="hidden sm:block" />
      )}

      <Button
        type="submit"
        size="lg"
        loading={submitting}
        disabled={submitting}
        withArrow={!submitting}
        className="w-full sm:w-auto"
      >
        {submitting ? "Sending…" : isLast ? submitLabel : (nextLabel ?? "Continue")}
      </Button>
    </div>
  );
}

/**
 * The one place submission failures surface. Every message must say what
 * happened and what to do next — never "something went wrong".
 */
export function SubmitError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [message]);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className="mt-8 rounded-md border border-clay bg-clay-50 p-5 outline-none"
    >
      <p className="flex items-start gap-2.5 font-medium text-ink">
        <Alert className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
        <span>{message}</span>
      </p>
      {onRetry && (
        <Button type="button" variant="secondary" size="sm" onClick={onRetry} className="mt-4">
          Try again
        </Button>
      )}
    </div>
  );
}

export function ValidationSummary({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <p role="alert" className="mt-6 flex items-start gap-2.5 text-[0.9375rem] font-medium text-clay">
      <Alert className="mt-0.5 h-4 w-4 shrink-0" />
      <span>
        {count === 1
          ? "One answer still needs your attention below."
          : `${count} answers still need your attention below.`}
      </span>
    </p>
  );
}

/** Shared success screen for both flows. */
export function SuccessPanel({
  title,
  children,
  footer,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="animate-[zidi-rise_0.5s_var(--ease-out-soft)_both] outline-none"
    >
      <span
        aria-hidden="true"
        className="grid h-14 w-14 place-items-center rounded-full bg-clay text-bone"
      >
        <Check className="h-7 w-7" />
      </span>
      <h2 className="mt-6 font-display text-d3">{title}</h2>
      <div className="mt-5 space-y-4 text-ink-70">{children}</div>
      {footer && <div className="mt-9">{footer}</div>}
    </div>
  );
}

export function FormCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-shell p-6 shadow-soft sm:p-8 md:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
