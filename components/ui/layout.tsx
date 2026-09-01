import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}

type Tone = "bone" | "sand" | "kola" | "plum" | "shell";

const TONES: Record<Tone, string> = {
  bone: "bg-bone text-ink",
  sand: "bg-sand text-ink",
  shell: "bg-shell text-ink",
  kola: "bg-kola text-bone on-dark grain",
  plum: "bg-plum text-bone on-dark grain",
};

/** Vertical rhythm lives here so section spacing stays consistent site-wide. */
export function Section({
  children,
  className,
  tone = "bone",
  size = "md",
  id,
  as: Tag = "section",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  id?: string;
  as?: ElementType;
  "aria-labelledby"?: string;
}) {
  const pad =
    size === "sm"
      ? "py-14 md:py-20"
      : size === "lg"
        ? "py-24 md:py-32 lg:py-36"
        : "py-20 md:py-28 lg:py-32";
  return (
    <Tag id={id} className={cn(TONES[tone], pad, "relative", className)} {...rest}>
      <div className="relative z-1">{children}</div>
    </Tag>
  );
}

/**
 * Editorial index label — "01 — WHY ZIDI". The rule that follows the number is
 * the same hairline used to divide content elsewhere.
 */
export function IndexLabel({
  index,
  children,
  className,
  onDark,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p className={cn("label-index", onDark ? "text-amber" : "text-clay", className)}>
      {index && (
        <>
          <span className="tabular-nums">{index}</span>
          <span
            aria-hidden="true"
            className={cn("h-px w-6", onDark ? "bg-amber/45" : "bg-clay/35")}
          />
        </>
      )}
      <span className={onDark ? "text-bone/70" : "text-ink-50"}>{children}</span>
    </p>
  );
}
