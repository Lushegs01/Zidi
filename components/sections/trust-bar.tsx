import { trustSignals } from "@/data/site";
import { Container } from "@/components/ui/layout";
import { Check } from "@/components/ui/icons";

/**
 * Trust bar — the first section below the hero.
 *
 * Upgrades:
 * - Full bg-sand (no opacity) for crisp contrast against the ivory page.
 * - font-medium on each signal so text reads as designed intent.
 * - Diamond ◆ separator glyphs in clay/25 between each signal.
 */
export function TrustBar() {
  return (
    <section aria-label="What's included" className="border-b border-line bg-sand">
      <Container className="py-6 md:py-7">
        <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3">
          {trustSignals.map((signal, i) => (
            <li
              key={signal}
              className="flex items-center"
            >
              {/* Diamond separator between items */}
              {i > 0 && (
                <span aria-hidden="true" className="mx-3 text-[0.5rem] text-clay/30 sm:mx-4">
                  ◆
                </span>
              )}
              <span className="flex items-center gap-2 text-[0.875rem] font-medium leading-snug text-ink-70">
                <Check className="h-4 w-4 shrink-0 text-clay" />
                {signal}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
