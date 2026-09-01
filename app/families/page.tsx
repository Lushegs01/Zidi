import type { Metadata } from "next";
import Image from "next/image";
import generations from "@/assets/images/generations.jpg";
import familiesImg from "@/assets/images/families.jpg";
import { faqGroups } from "@/data/faqs";
import { breadcrumbSchema, faqSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Check } from "@/components/ui/icons";
import { Testimonials } from "@/components/sections/testimonials";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { testimonialsByRole } from "@/data/testimonials";

export const metadata: Metadata = pageMetadata({
  title: "Yoruba & Igbo classes for children",
  description:
    "Yoruba and Igbo classes for children from age 5, with DBS-checked tutors matched by a person. Live video lessons at home, in your timezone.",
  path: "/families",
});

const reasons = [
  {
    title: "So they can talk to their grandparents",
    detail:
      "This is the reason most parents give us, and it is the one that tends to hold. A phone call that doesn't need a translator changes a relationship.",
  },
  {
    title: "So the culture has a way in",
    detail:
      "Proverbs, jokes, food names, the way respect is built into how you greet someone older. Much of it only really exists inside the language.",
  },
  {
    title: "So they aren't the only one who can't",
    detail:
      "Children notice when cousins switch languages and they can't follow. Starting early means never having to be the one outside the joke.",
  },
  {
    title: "So it's theirs to keep",
    detail:
      "What they do with it later is up to them. Our job is to make sure the option is still open when they want it.",
  },
];

const safety = [
  "Enhanced DBS check, or the equivalent abroad, before a tutor's first session with anyone under 18",
  "Two references, at least one speaking to their suitability to work with children",
  "Video-only sessions on Zoom or Google Meet, in a visible, appropriate setting",
  "No recording without written consent from a parent or guardian",
  "No private chat with a child outside the agreed platform",
  "A designated safeguarding lead, and concerns referred to statutory authorities without delay",
];

export default function FamiliesPage() {
  return (
    <>
      <PageHeader
        eyebrow="For families"
        title={
          <>
            Give them more than a language.
            <br />
            Give them a <em className="not-italic text-clay">connection</em>.
          </>
        }
        lead="Lessons pitched to a child's age and attention span, with a tutor chosen for them rather than assigned at random. From age 5, in your timezone, with you welcome in the room."
        trail={[
          { name: "Home", path: "/" },
          { name: "For families", path: "/families" },
        ]}
        actions={
          <>
            <ButtonLink href="/get-matched" size="lg" withArrow>
              Find my child a tutor
            </ButtonLink>
            <ButtonLink href="#safety" variant="secondary" size="lg">
              How we keep children safe
            </ButtonLink>
          </>
        }
        aside={
          <div className="arch overflow-hidden bg-sand shadow-lift">
            <Image
              src={familiesImg}
              alt="A mother and her two children playing a board game together in their living room"
              preload
              sizes="(max-width: 1023px) 92vw, 28vw"
              className="h-full w-full object-cover"
              placeholder="blur"
            />
          </div>
        }
      />

      <Section size="md" aria-labelledby="reasons-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <IndexLabel index="01">Why parents start</IndexLabel>
                <h2 id="reasons-heading" className="mt-6 font-display text-d2">
                  The reasons we hear most.
                </h2>
                <p className="mt-5 max-w-[44ch] text-lead text-ink-70">
                  We won&rsquo;t promise you a bilingual child in six months. What we can
                  say is what the parents already with us were hoping for.
                </p>
              </Reveal>

              <Reveal delay={80} className="mt-10">
                <div className="overflow-hidden rounded-lg bg-sand">
                  <Image
                    src={generations}
                    alt="Parents and their young child smiling together outdoors"
                    sizes="(max-width: 1023px) 92vw, 38vw"
                    className="h-full w-full object-cover"
                    placeholder="blur"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <dl className="border-t border-line-strong">
                {reasons.map((reason, i) => (
                  <Reveal
                    key={reason.title}
                    delay={i * 60}
                    className="border-b border-line-strong py-7"
                  >
                    <dt className="font-display text-[1.5rem] leading-snug tracking-[-0.012em]">
                      {reason.title}
                    </dt>
                    <dd className="mt-3 max-w-[56ch] leading-relaxed text-ink-70">
                      {reason.detail}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="kola" size="md" id="safety" aria-labelledby="safety-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <IndexLabel index="02" onDark>
                  Safeguarding
                </IndexLabel>
                <h2 id="safety-heading" className="mt-6 font-display text-d2 text-bone">
                  What we check, before anyone meets your child.
                </h2>
                <p className="mt-5 max-w-[44ch] text-lead text-bone/70">
                  This is the part of the business we are least willing to be casual
                  about. Everything here applies to every tutor, every time.
                </p>
                <ButtonLink
                  href="/legal/child-safety"
                  variant="on-dark-outline"
                  size="lg"
                  withArrow
                  className="mt-8"
                >
                  Read the Child Safety Policy
                </ButtonLink>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={80}>
                <ul className="space-y-4">
                  {safety.map((item) => (
                    <li key={item} className="flex items-start gap-3.5 text-bone/80">
                      <Check className="mt-1 h-4.5 w-4.5 shrink-0 text-amber" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 rounded-md border border-kola-600 bg-kola-800 p-5 text-[0.9375rem] leading-relaxed text-bone/70">
                  You are welcome to sit in on any session, and for younger children we
                  encourage it. Many parents check in for the first few minutes, then step
                  back so the child can build a rapport with their tutor.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <HowItWorks compact />

      <Testimonials items={testimonialsByRole("parent")} index="04" heading="From other parents." />

      <FaqSection
        items={faqGroups[2]!.items}
        heading="What parents ask first."
        index="05"
        analyticsLabel="families"
      />

      <FinalCta
        heading="Start with one lesson a week."
        body="Tell us your child's age, level and when they're free. We'll come back within 24 hours with a DBS-checked tutor chosen for them."
        location="families_footer"
      />

      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "For families", path: "/families" },
          ]),
          faqSchema(faqGroups[2]!.items),
        )}
      />
    </>
  );
}
