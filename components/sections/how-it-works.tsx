import { steps } from "@/data/journey";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { TrackedCta } from "@/components/ui/tracked-cta";

export function HowItWorks({ compact = false }: { compact?: boolean }) {
  return (
    <Section
      tone="sand"
      size={compact ? "md" : "lg"}
      id="how-it-works"
      aria-labelledby="how-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28">
              <IndexLabel index="03">How it works</IndexLabel>
              <h2 id="how-heading" className="mt-6 font-display text-d2">
                Four steps, and{" "}
                <em className="not-italic text-clay">one of them is ours</em>.
              </h2>
              <p className="mt-5 max-w-[42ch] text-lead text-ink-70">
                You tell us what you need. We do the searching. Most families are in
                their first lesson within a week.
              </p>
              <TrackedCta
                href="/get-matched"
                size="lg"
                withArrow
                className="mt-8"
                location="how_it_works"
                label="Start the match"
              >
                Start now — it takes 2 minutes
              </TrackedCta>
            </Reveal>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {steps.map((step, i) => (
              <li key={step.n}>
                <Reveal delay={i * 70}>
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line-strong py-8 md:gap-x-10 md:py-10">
                    {/* Step number — raised to clay/70 so it anchors the row visually */}
                    <p
                      aria-hidden="true"
                      className="font-display text-[2rem] leading-none tabular-nums text-clay/70 md:text-[2.5rem]"
                    >
                      {step.n}
                    </p>
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 className="font-display text-d3">{step.title}</h3>
                        <span className="rounded-full bg-bone px-3 py-1 text-[0.75rem] font-medium text-ink-50 ring-1 ring-line">
                          {step.aside}
                        </span>
                      </div>
                      {/* Left accent border: a clay hairline ties steps together as a sequence */}
                      <p className="mt-3 max-w-[54ch] border-l-[3px] border-clay/30 pl-4 text-ink-70">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
