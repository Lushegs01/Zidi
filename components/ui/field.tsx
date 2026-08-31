"use client";

import { useId, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Alert, Check } from "./icons";

/* ------------------------------------------------------------------ Field */

interface FieldProps {
  label: string;
  /** Rendered under the label. Use it to explain, never to repeat the label. */
  hint?: string;
  error?: string;
  /** Fields are required unless this is set — the optional ones say so. */
  optional?: boolean;
  children: (props: {
    id: string;
    "aria-describedby": string | undefined;
    "aria-invalid": true | undefined;
  }) => ReactNode;
  className?: string;
}

export function Field({ label, hint, error, optional, children, className }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-[0.9375rem] font-medium text-ink">
        {label}
        {optional && <span className="ml-2 font-normal text-ink-50">Optional</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-[0.875rem] leading-relaxed text-ink-50">
          {hint}
        </p>
      )}
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })}
      {error && <FieldError id={errorId!}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-1.5 text-[0.875rem] font-medium text-clay">
      <Alert className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/**
 * A fieldset's legend cannot be described by aria-describedby, so grouped
 * controls get their hint and error rendered inside the legend's flow instead.
 */
export function FieldGroup({
  legend,
  hint,
  error,
  optional,
  children,
  className,
}: {
  legend: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cn("min-w-0 space-y-3", className)}>
      <legend className="text-[0.9375rem] font-medium text-ink">
        {legend}
        {optional && <span className="ml-2 font-normal text-ink-50">Optional</span>}
      </legend>
      {hint && <p className="text-[0.875rem] leading-relaxed text-ink-50">{hint}</p>}
      {children}
      {error && <FieldError>{error}</FieldError>}
    </fieldset>
  );
}

/* ----------------------------------------------------------------- Inputs */

const control =
  "w-full rounded-md border border-line-strong bg-shell px-4 py-3 text-ink placeholder:text-ink-50/70 " +
  "transition-colors duration-150 hover:border-ink/35 focus:border-clay focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay " +
  "aria-[invalid=true]:border-clay aria-[invalid=true]:bg-clay-50/60";

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(control, "min-h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cn(control, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          control,
          "min-h-12 cursor-pointer appearance-none bg-none pr-11",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-50"
      >
        <path
          d="m5 8 5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------ Choice tiles */

const tile =
  "group relative flex w-full min-h-14 cursor-pointer items-start gap-3 rounded-md border p-4 text-left " +
  "transition-[border-color,background-color,box-shadow] duration-150 " +
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay";

const tileIdle = "border-line-strong bg-shell hover:border-ink/40 hover:bg-sand/50";
const tileOn = "border-clay bg-clay-50 shadow-soft";

function Marker({ checked, round }: { checked: boolean; round: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-colors duration-150",
        round ? "rounded-full" : "rounded-xs",
        checked ? "border-clay bg-clay text-bone" : "border-line-strong bg-shell",
      )}
    >
      {checked &&
        (round ? (
          <span className="h-2 w-2 rounded-full bg-bone" />
        ) : (
          <Check className="h-3.5 w-3.5" />
        ))}
    </span>
  );
}

export interface Choice {
  value: string;
  label: string;
  hint?: string;
}

/** Radio group rendered as tiles. Native inputs, so keyboard behaviour is free. */
export function RadioTiles({
  name,
  options,
  value,
  onChange,
  columns = 1,
}: {
  name: string;
  options: readonly Choice[];
  value: string | undefined;
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3;
}) {
  const cols =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "grid-cols-1";
  return (
    <div className={cn("grid gap-3", cols)} role="none">
      {options.map((o) => {
        const checked = value === o.value;
        return (
          <label key={o.value} className={cn(tile, checked ? tileOn : tileIdle)}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={checked}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <Marker checked={checked} round />
            <span className="min-w-0">
              <span className="block font-medium leading-snug">{o.label}</span>
              {o.hint && (
                <span className="mt-0.5 block text-[0.875rem] leading-snug text-ink-50">
                  {o.hint}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function CheckboxTiles({
  options,
  values,
  onChange,
  columns = 2,
}: {
  options: readonly Choice[];
  values: string[];
  onChange: (values: string[]) => void;
  columns?: 1 | 2 | 3;
}) {
  const cols =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "grid-cols-1";
  return (
    <div className={cn("grid gap-3", cols)}>
      {options.map((o) => {
        const checked = values.includes(o.value);
        return (
          <label key={o.value} className={cn(tile, checked ? tileOn : tileIdle)}>
            <input
              type="checkbox"
              value={o.value}
              checked={checked}
              onChange={() =>
                onChange(
                  checked ? values.filter((v) => v !== o.value) : [...values, o.value],
                )
              }
              className="sr-only"
            />
            <Marker checked={checked} round={false} />
            <span className="min-w-0">
              <span className="block font-medium leading-snug">{o.label}</span>
              {o.hint && (
                <span className="mt-0.5 block text-[0.875rem] leading-snug text-ink-50">
                  {o.hint}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

/** Compact multi-select for short labels — days of the week, age bands. */
export function ChipGroup({
  options,
  values,
  onChange,
}: {
  options: readonly { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const checked = values.includes(o.value);
        return (
          <label
            key={o.value}
            className={cn(
              "min-h-11 cursor-pointer rounded-full border px-4 py-2.5 text-[0.9375rem] font-medium leading-tight transition-colors duration-150",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay",
              checked
                ? "border-clay bg-clay text-bone"
                : "border-line-strong bg-shell text-ink hover:border-ink/40",
            )}
          >
            <input
              type="checkbox"
              value={o.value}
              checked={checked}
              onChange={() =>
                onChange(
                  checked ? values.filter((v) => v !== o.value) : [...values, o.value],
                )
              }
              className="sr-only"
            />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  children,
  error,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors duration-150",
          "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay",
          error ? "border-clay bg-clay-50/60" : "border-line-strong bg-shell hover:border-ink/40",
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          className="sr-only"
        />
        <Marker checked={checked} round={false} />
        <span className="text-[0.9375rem] leading-relaxed text-ink-70">{children}</span>
      </label>
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

/** Hidden honeypot. Never shown, never announced, always empty for humans. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
      <label htmlFor="company-website">Company website</label>
      <input
        id="company-website"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
