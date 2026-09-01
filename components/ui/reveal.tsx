"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One IntersectionObserver for the whole page rather than one per element.
 * Elements unobserve themselves once shown, so this costs nothing after the
 * first scroll through.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.shown = "true";
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
  );
  return observer;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Milliseconds. Use small, deliberate offsets for grouped items. */
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.shown = "true";
      return;
    }
    // Already in view on load (above the fold) — show without waiting.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      node.dataset.shown = "true";
      return;
    }
    const io = getObserver();
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
