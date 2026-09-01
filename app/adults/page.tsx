import type { Metadata } from "next";
import Image from "next/image";
import adultsImg from "@/assets/images/adults.jpg";
import { faqGroups } from "@/data/faqs";
import { testimonialsByRole } from "@/data/testimonials";
import { breadcrumbSchema, faqSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Testimonials } from "@/components/sections/testimonials";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "Language lessons for adults",
  description:
    "Live one-to-one Yoruba and Igbo lessons for adults — complete beginners, rusty heritage speakers, and anyone preparing for a trip home.",
  path: "/adults",
});

const cases = [
  {
    label: "Starting from zero",
    title: "You never learned it, and nobody taught you.",
    detail:
      "Very common, and not something to apologise for. Your tutor starts with sound and greeting, not grammar, and moves at whatever pace you set.",
  },
  {
    label: "Rusty",
    title: "You understand more than you can say.",
    detail:
      "The listening is there; the speaking has gone quiet. Conversation-led sessions get it back faster than a course would, because the vocabulary is already in there somewhere.",
  },
  {
    label: "For family",
    title: "There's someone you want to talk to properly.",
    detail:
      "A grandmother, an aunt, a parent whose English runs out at the edges. Tell your tutor who it is and they will teach towards that conversation.",
  },
  {
    label: "Travelling",
    title: "You're going home and want to arrive ready.",
    detail:
      "Market prices, directions, family greetings, the register you use with an elder. Give us the date and we'll shape the sessions around it.",
  },
  {
    label: "Raising children",
    title: "You want to pass on more than you were given.",
    detail:
      "Plenty of our adult learners are parents learning a step ahead of their child — or alongside them, in the same group session.",
  },
  {
    label: "Maintaining",
    title: "You speak it, and you don't want to lose it.",
    detail:
      "An hour a week of real conversation with someone who will correct you. Less a course than a standing appointment with the language.",
  },
];

export default function AdultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="For adult learners"
        title={
          <>
            It&rsquo;s never too late
            <br />
            to <em className="not-italic text-clay">reconnect</em>.
          </>
        }
        lead="Nobody here will make you feel behind. Most of our adult learners are doing exactly what you're thinking about doing — starting a language they should, on paper, already speak."
        trail={[
          { name: "Home", path: "/" },
          { name: "For adult learners", path: "/adults" },
        ]}
        actions={
          <>
            <ButtonLink href="/get-matched" size="lg" withArrow>
              Find me a tutor
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See pricing
            </ButtonLink>
          </>
        }
        aside={
          <div className="arch overflow-hidden bg-sand shadow-lift">
            <Image
              src={adultsImg}
              alt="A woman wearing headphones concentrating on a live lesson on her laptop"
              preload
              sizes="(max-width: 1023px) 92vw, 28vw"
              className="h-full w-full object-cover"
              placeholder="blur"
            />
          </div>
        }
      />

      <Section size="md" aria-labelledby="cases-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <IndexLabel index="01">Where people start</IndexLabel>
            <h2 id="cases-heading" className="mt-6 font-display text-d2">
              Six versions of the same first lesson.
            </h2>
            <p className="mt-5 text-lead text-ink-70">
              Tell us which of these sounds like you in the matching form and your tutor
              will have it before you meet.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((item, i) => (
              <li key={item.label}>
                <Reveal delay={i * 60}>
                  <div className="border-t border-line-strong pt-5">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-clay">
                      {item.label}
                    </p>
                    <h3 className="mt-3 font-display text-[1.5rem] leading-snug tracking-[-0.012em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-70">
                      {item.detail}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="sand" size="md" aria-labelledby="fit-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <IndexLabel index="02">Fitting it in</IndexLabel>
                <h2 id="fit-heading" className="mt-6 font-display text-d2">
                  An hour a week, at an hour that exists.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={70}>
                <div className="space-y-5 text-lead text-ink-70">
                  <p>
                    Most adult learners take one or two evening sessions a week. Because
                    our tutors teach from West Africa, a 7pm slot in London or a 9pm in New
                    York is usually easy to fill — those are the hours we have most of.
                  </p>
                  <p>
                    Sessions are an hour on Zoom or Google Meet, in a fixed slot you keep
                    week to week. If work moves, tell us and we move the slot rather than
                    dropping the week.
                  </p>
                  <p>
                    If you would rather learn with a partner, sibling or friend, group
                    pricing is per person and lower — you just bring your own group of two
                    to four.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <HowItWorks compact />

      <Testimonials
        items={testimonialsByRole("adult-learner")}
        index="04"
        heading="From other adult learners."
      />

      <FaqSection
        items={faqGroups[1]!.items}
        heading="Practical questions."
        index="05"
        analyticsLabel="adults"
      />

      <FinalCta
        heading="Book the hour. The rest follows."
        body="Tell us what you can already do, what you want to be able to do, and when you're free. We'll come back within 24 hours."
        location="adults_footer"
      />

      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "For adult learners", path: "/adults" },
          ]),
          faqSchema(faqGroups[1]!.items),
        )}
      />
    </>
  );
}
