import { promises } from "@/data/site";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

/**
 * Promises section — the four brand commitments.
 *
 * Upgrades:
 * - Stat numbers enlarged to text-d1 scale — these are our four biggest guarantees.
 * - An amber accent line under each stat number reinforces the amber system on plum.
 * - adinkra CSS pattern on the section for textured depth on the plum surface.
 * - grain already handled by the Section "plum" tone.
 */
export function Promises() {
  return (
    <Section tone="plum" size="md" aria-labelledby="promises-heading" className="adinkra">
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
                {/* Stat enlarged to display scale — these are headline-level commitments */}
                <span className="block font-display text-d1 leading-none tracking-[-0.025em] text-bone">
                  {item.stat}
                </span>
                {/* Amber underline accent — warm punctuation on the cold plum ground */}
                <span
                  aria-hidden="true"
                  className="mt-2 block h-0.5 w-10 rounded-full bg-amber/60"
                />
                <span className="mt-3 block text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-bone/50">
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
