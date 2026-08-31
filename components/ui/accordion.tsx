"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

export interface AccordionItem {
  q: string;
  a: string;
}

/**
 * Disclosure list. Uses a real button + region rather than <details> so the
 * open/close transition is smooth and identical in every browser; the
 * grid-rows 0fr→1fr trick animates height without measuring anything.
 */
export function Accordion({
  items,
  className,
  analyticsLabel,
}: {
  items: AccordionItem[];
  className?: string;
  analyticsLabel?: string;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpen(isOpen ? null : i);
                  if (!isOpen) {
                    track("faq_open", { question: item.q, group: analyticsLabel });
                  }
                }}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-clay md:py-7"
              >
                <span className="font-display text-[1.3125rem] leading-snug tracking-[-0.012em] md:text-[1.5rem]">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ring-1 ring-line-strong transition-colors group-hover:ring-clay"
                >
                  <span className="absolute h-px w-2.5 bg-current" />
                  <span
                    className={cn(
                      "absolute h-2.5 w-px bg-current transition-transform duration-300 ease-out-soft",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out-soft",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-7 pr-10 text-ink-70">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
