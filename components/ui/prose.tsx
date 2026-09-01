import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reading column for long-form policy and article text. Deliberately narrow —
 * around 68 characters per line at the body size.
 */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-ink-70",
        "[&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-[1.75rem] [&_h2]:leading-tight [&_h2]:tracking-[-0.015em] [&_h2]:text-ink md:[&_h2]:text-[2rem]",
        "[&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-[1.375rem] [&_h3]:leading-snug [&_h3]:text-ink",
        "[&_p]:mt-4 [&_p]:leading-[1.75]",
        "[&_ul]:mt-4 [&_ul]:space-y-2.5 [&_li]:relative [&_li]:pl-6",
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-clay/60",
        "[&_a]:text-clay [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-clay-700",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}
