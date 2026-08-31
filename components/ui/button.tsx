import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Spinner } from "./icons";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "quiet"
  | "on-dark"
  | "on-dark-outline";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-clay text-bone hover:bg-clay-700 active:bg-clay-700 shadow-soft hover:shadow-lift",
  secondary:
    "bg-transparent text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/45 hover:bg-ink/[0.035]",
  quiet: "bg-transparent text-ink hover:text-clay px-0",
  "on-dark": "bg-bone text-ink hover:bg-white shadow-soft",
  "on-dark-outline":
    "bg-transparent text-bone ring-1 ring-inset ring-bone/30 hover:ring-bone/70 hover:bg-bone/[0.07]",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-[0.875rem] gap-1.5",
  md: "min-h-12 px-6 text-[0.9375rem] gap-2",
  lg: "min-h-[3.5rem] px-8 text-base gap-2.5",
};

function classes(variant: ButtonVariant, size: ButtonSize, full?: boolean) {
  return cn(
    "group/btn relative inline-flex items-center justify-center rounded-full font-medium",
    "transition-[background-color,box-shadow,color,opacity] duration-200 ease-out-soft",
    "disabled:pointer-events-none disabled:opacity-55",
    variant !== "quiet" && SIZES[size],
    variant === "quiet" && "gap-1.5 text-[0.9375rem] underline-offset-4 hover:underline",
    VARIANTS[variant],
    full && "w-full",
  );
}

/** The arrow that nudges forward on hover — used on every forward-moving CTA. */
export function CtaArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "h-[1.05em] w-[1.05em] shrink-0 transition-transform duration-200 ease-out-soft",
        "group-hover/btn:translate-x-[3px] motion-reduce:transform-none",
        className,
      )}
    />
  );
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  withArrow?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  withArrow,
  loading,
  children,
  className,
  type = "button",
  ...rest
}: CommonProps &
  ComponentPropsWithoutRef<"button"> & { loading?: boolean }) {
  return (
    <button
      type={type}
      className={cn(classes(variant, size, fullWidth), className)}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner className="spinner h-[1.05em] w-[1.05em] shrink-0" />}
      {children}
      {withArrow && !loading && <CtaArrow />}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth,
  withArrow,
  children,
  className,
  href,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(classes(variant, size, fullWidth), className)}
      {...rest}
    >
      {children}
      {withArrow && <CtaArrow />}
    </Link>
  );
}
