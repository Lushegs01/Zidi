import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PricingTable } from "./pricing-table";

export function PricingPreview({ index = "06" }: { index?: string } = {}) {
  return (
    <Section id="pricing" tone="sand" size="lg" aria-labelledby="pricing-heading">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div className="max-w-2xl">
              <IndexLabel index={index}>Pricing</IndexLabel>
              <h2 id="pricing-heading" className="mt-6 font-display text-d2">
                One monthly rate.{" "}
                <em className="not-italic text-clay">Nothing else to work out.</em>
              </h2>
              <p className="mt-5 max-w-[52ch] text-lead text-ink-70">
                Matching, scheduling and our support are included. Invoiced monthly in
                advance — cancel with 30 days&rsquo; notice.
              </p>
            </div>
            <ButtonLink href="/pricing" variant="secondary" withArrow>
              Full pricing details
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <PricingTable />
        </Reveal>
      </Container>
    </Section>
  );
}
