import { promises } from "@/data/site";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

/**
 * These are commitments the business already makes, not marketing numbers.
 * Every figure here is reflected in the policies under /legal.
 */
export function Promises() {
  return (
    <Section tone="plum" size="md" aria-labelledby="promises-heading">
      <Container>
        <Reveal className="max-w-2xl">
          <IndexLabel index="04" onDark>
            What we commit to
          </IndexLabel>
          <h2 id="promises-heading" className="mt-6 font-display text-d2 text-bone">
            Four promises we&rsquo;ll be held to.
          </h2>
        </Reveal>

        <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((item, i) => (
            <Reveal key={item.stat} delay={i * 70} className="border-t border-bone/20 pt-5">
                <dt>
                  <span className="block font-display text-[2.5rem] leading-none tracking-[-0.02em] text-bone">
                    {item.stat}
                  </span>
                  <span className="mt-2 block text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-bone/50">
                    {item.label}
                  </span>
                </dt>
                <dd className="mt-4 text-[0.9375rem] leading-relaxed text-bone/70">
                  {item.detail}
                </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
