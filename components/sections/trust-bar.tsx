import { trustSignals } from "@/data/site";
import { Container } from "@/components/ui/layout";
import { Check } from "@/components/ui/icons";

export function TrustBar() {
  return (
    <section aria-label="What's included" className="border-y border-line bg-sand/60">
      <Container className="py-6 md:py-7">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-5">
          {trustSignals.map((signal) => (
            <li
              key={signal}
              className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-ink-70"
            >
              <Check className="mt-px h-4 w-4 shrink-0 text-clay" />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
