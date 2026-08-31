import type { Metadata } from "next";
import Link from "next/link";
import { billingFacts } from "@/data/pricing";
import { faqGroups } from "@/data/faqs";
import { breadcrumbSchema, faqSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PricingTable } from "@/components/sections/pricing-table";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "Pricing & lesson plans",
  description:
    "Private lessons from ₦36,000 a month for four hour-long sessions; group from ₦25,000 per person. Matching, scheduling and support included.",
  path: "/pricing",
});

const choosing = [
  {
    title: "Choose private if…",
    points: [
      "The learner is a complete beginner and needs full attention",
      "Your schedule changes often and needs flexibility",
      "You have a specific goal — a trip, an exam, a conversation you want to hold",
    ],
  },
  {
    title: "Choose group if…",
    points: [
      "You have 2–4 people who already know each other and are at a similar level",
      "Siblings or cousins who will practise between sessions",
      "You want the lower per-person rate and don't mind sharing the hour",
    ],
  },
  {
    title: "Choose twice weekly if…",
    points: [
      "You want visible progress rather than slow maintenance",
      "The learner forgets between weekly sessions",
      "You're working towards something with a date on it",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="One monthly rate. Nothing hidden underneath."
        lead="Matching, scheduling and our ongoing support are part of the price — there is no separate platform or joining fee. Invoiced monthly in advance, cancel with 30 days' notice."
        trail={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
        actions={
          <ButtonLink href="/get-matched" size="lg" withArrow>
            Get matched with a tutor
          </ButtonLink>
        }
      />

      <Section size="md" aria-labelledby="plans-heading">
        <Container>
          <h2 id="plans-heading" className="sr-only">
            Plans
          </h2>
          <Reveal>
            <PricingTable />
          </Reveal>
        </Container>
      </Section>

      <Section tone="sand" size="md" aria-labelledby="choosing-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <IndexLabel index="01">Choosing</IndexLabel>
            <h2 id="choosing-heading" className="mt-6 font-display text-d2">
              Which plan is right?
            </h2>
            <p className="mt-5 text-lead text-ink-70">
              If you are not sure, say so in the matching form and we will recommend one
              based on the learner. Changing plan later is a message to us, not a
              renegotiation.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {choosing.map((block, i) => (
              <Reveal key={block.title} delay={i * 70}>
                <div className="h-full rounded-lg border border-line bg-shell p-7">
                  <h3 className="font-display text-[1.5rem] leading-snug">{block.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {block.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 text-[0.9375rem] leading-relaxed text-ink-70 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-clay/60"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md" aria-labelledby="billing-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <IndexLabel index="02">Billing</IndexLabel>
                <h2 id="billing-heading" className="mt-6 font-display text-d2">
                  How payment actually works.
                </h2>
                <p className="mt-5 text-ink-70">
                  Nothing is charged until you have met your tutor and agreed a schedule.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="border-t border-line-strong">
                {billingFacts.map((fact, i) => (
                  <Reveal
                    key={fact.title}
                    delay={i * 60}
                    className="border-b border-line-strong py-6"
                  >
                    <dt className="font-display text-[1.4375rem] leading-snug">
                      {fact.title}
                    </dt>
                    <dd className="mt-2.5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-70">
                      {fact.detail}
                    </dd>
                  </Reveal>
                ))}
              </dl>
              <Reveal>
                <p className="mt-6 text-[0.875rem] text-ink-50">
                  The full terms are in our{" "}
                  <Link href="/legal/refunds" className="text-clay underline underline-offset-4">
                    Refund Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/legal/terms" className="text-clay underline underline-offset-4">
                    Terms &amp; Conditions
                  </Link>
                  .
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection
        items={faqGroups[3]!.items}
        heading="Questions about money."
        index="03"
        analyticsLabel="pricing"
      />

      <FinalCta
        heading="No charge until you've met your tutor."
        body="Send us your details and we'll come back within 24 hours with a tutor and a suggested slot. You decide from there."
        location="pricing_footer"
      />

      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          faqSchema(faqGroups[3]!.items),
        )}
      />
    </>
  );
}
