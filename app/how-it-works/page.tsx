import type { Metadata } from "next";
import { faqGroups } from "@/data/faqs";
import { breadcrumbSchema, faqSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Promises } from "@/components/sections/promises";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = pageMetadata({
  title: "How it works",
  description:
    "How Zidi matches you with a tutor: tell us what you need, a person picks your tutor within 24 hours, and lessons run live on Zoom or Google Meet.",
  path: "/how-it-works",
});

const included = [
  {
    title: "Matching, done by a person",
    detail:
      "Someone on the team reads your answers and picks a tutor. No shortlist to sift, no profiles to compare, no bidding.",
  },
  {
    title: "Scheduling and rescheduling",
    detail:
      "We set the weekly slots and move them when your life changes. You never have to negotiate a time directly.",
  },
  {
    title: "A free rematch",
    detail:
      "If the fit is wrong in your first two sessions, tell us and we find someone else at no extra cost.",
  },
  {
    title: "Someone to complain to",
    detail:
      "If a session was poor, or a tutor missed it, that is ours to fix. You email us, not your tutor.",
  },
];

const practical = [
  { q: "Where lessons happen", a: "Zoom or Google Meet. Your tutor sends a link before each session — no account needed, nothing to install beyond the browser." },
  { q: "How long they run", a: "One hour, every time. Warm-up, focused work, and a short review at the end." },
  { q: "What you need", a: "A stable connection, a device with a camera, and somewhere quiet enough to speak out loud." },
  { q: "When you pay", a: "After you have agreed a schedule, never before. Invoiced monthly in advance by bank transfer in naira, pounds, US or Canadian dollars." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title={
          <>
            You tell us what you need.
            <br />
            We do the searching.
          </>
        }
        lead="Zidi is a managed service, not a marketplace. There is no directory to scroll and no profiles to compare — a person on our team makes the match and stays involved afterwards."
        trail={[
          { name: "Home", path: "/" },
          { name: "How it works", path: "/how-it-works" },
        ]}
        actions={
          <>
            <ButtonLink href="/get-matched" size="lg" withArrow>
              Get matched with a tutor
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See pricing
            </ButtonLink>
          </>
        }
      />

      <HowItWorks compact />

      <Section size="md" aria-labelledby="included-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <IndexLabel index="05">What the fee covers</IndexLabel>
                <h2 id="included-heading" className="mt-6 font-display text-d2">
                  One rate. No separate matching fee.
                </h2>
                <p className="mt-5 max-w-[46ch] text-lead text-ink-70">
                  Everything below is included in the monthly price. There is no platform
                  fee, no joining fee, and nothing charged for a rematch.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {included.map((item, i) => (
                  <Reveal
                    key={item.title}
                    delay={i * 60}
                    className="border-t border-line-strong pt-5"
                  >
                    <dt className="font-display text-[1.375rem] leading-snug">
                      {item.title}
                    </dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-70">
                      {item.detail}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand" size="md" aria-labelledby="practical-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <IndexLabel index="06">The practical bits</IndexLabel>
            <h2 id="practical-heading" className="mt-6 font-display text-d2">
              Everything else you were about to ask.
            </h2>
          </Reveal>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2">
            {practical.map((item, i) => (
              <Reveal key={item.q} delay={i * 50} className="bg-bone p-7">
                <dt className="font-display text-[1.375rem] leading-snug">{item.q}</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink-70">
                  {item.a}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Promises />

      <FaqSection
        items={faqGroups[1]!.items}
        heading="Questions about lessons."
        index="08"
        analyticsLabel="how-it-works"
      />

      <FinalCta location="how_it_works_footer" />

      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How it works", path: "/how-it-works" },
          ]),
          faqSchema(faqGroups[1]!.items),
        )}
      />
    </>
  );
}
