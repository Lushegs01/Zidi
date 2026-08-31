import type { Metadata } from "next";
import Link from "next/link";
import { availableSubjects, upcomingSubjects } from "@/data/subjects";
import { tutorStandards } from "@/data/tutors";
import { site } from "@/data/site";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Check } from "@/components/ui/icons";
import { TutorForm } from "@/components/forms/tutor-form";
import { FormAside } from "@/components/forms/form-aside";

export const metadata: Metadata = pageMetadata({
  title: "Teach with Zidi",
  description:
    "Apply to teach Yoruba, Igbo or another subject. Set your own availability, teach online from anywhere, and be matched with learners by a person.",
  path: "/teach",
});

const lookingFor = [
  {
    title: "Fluent, and able to explain it",
    detail:
      "Native and near-native speakers, but also people who can break a sound down for someone who has never made it before. The second part is the rarer skill.",
  },
  {
    title: "Reliable about time",
    detail:
      "Learners build a weekly rhythm around you. Turning up, on time, in a quiet place with a decent connection, matters more than any qualification.",
  },
  {
    title: "Comfortable with your age group",
    detail:
      "Teaching a seven-year-old and coaching a thirty-year-old are different jobs. Tell us which you actually enjoy — we would rather match you well than often.",
  },
  {
    title: "Willing to be checked",
    detail:
      "If you want to teach under-18s you will need an enhanced DBS check, or the equivalent where you live, plus two references. No exceptions.",
  },
];

const fromUs = [
  "Learners matched to what you actually teach, and to hours you actually have",
  "Your own schedule — say when you're free and we work within it",
  "Teach from anywhere with a stable connection",
  "No cold outreach, no bidding for students, no profile to market",
  "We handle scheduling, invoicing and the awkward conversations",
  "A person to call when something needs changing",
];

const fromYou = [
  "Arrive on time, and give 24 hours' notice if you must cancel",
  "Deliver age-appropriate sessions and keep professional boundaries",
  "Keep learner details private and never pass them on",
  "Raise any safeguarding concern with us immediately",
  "Complete your DBS or equivalent before teaching anyone under 18",
  "Keep arrangements on Zidi rather than taking learners private",
];

export default function TeachPage() {
  return (
    <>
      <PageHeader
        eyebrow="Teach with Zidi"
        title={
          <>
            Teach the language
            <br />
            you grew up in.
          </>
        }
        lead="We're building a small pool of tutors we would happily send our own families to. If that sounds like you, the application takes about four minutes and we reply within 48 hours."
        trail={[
          { name: "Home", path: "/" },
          { name: "Teach with Zidi", path: "/teach" },
        ]}
        actions={
          <>
            <ButtonLink href="#apply" size="lg" withArrow>
              Apply to teach
            </ButtonLink>
            <ButtonLink href="#process" variant="secondary" size="lg">
              See the process first
            </ButtonLink>
          </>
        }
      />

      <Section tone="sand" size="md" aria-labelledby="looking-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <IndexLabel index="01">Who we&rsquo;re looking for</IndexLabel>
                <h2 id="looking-heading" className="mt-6 font-display text-d2">
                  Four things we care about.
                </h2>
                <p className="mt-5 text-ink-70">
                  Formal teaching qualifications help, but they are not what decides it.
                  We have taken on people whose whole CV was &ldquo;I taught my
                  cousins&rdquo; — and turned down some with degrees.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="border-t border-line-strong">
                {lookingFor.map((item, i) => (
                  <Reveal
                    key={item.title}
                    delay={i * 60}
                    className="border-b border-line-strong py-6"
                  >
                    <dt className="font-display text-[1.4375rem] leading-snug tracking-[-0.012em]">
                      {item.title}
                    </dt>
                    <dd className="mt-2.5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-70">
                      {item.detail}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="md" aria-labelledby="subjects-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <IndexLabel index="02">What you&rsquo;d teach</IndexLabel>
            <h2 id="subjects-heading" className="mt-6 font-display text-d2">
              Live now, and opening next.
            </h2>
            <p className="mt-5 text-lead text-ink-70">
              We open a subject once we have vetted tutors who can cover the timezones
              people are asking from — so applying is often what opens one.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-line bg-shell p-7">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-clay">
                  Teaching now
                </h3>
                <ul className="mt-5 space-y-3">
                  {availableSubjects.map((s) => (
                    <li key={s.slug} className="flex items-baseline gap-3">
                      <span className="font-display text-[1.75rem] leading-none">
                        {s.nativeName ?? s.name}
                      </span>
                      <span className="text-[0.875rem] text-ink-50">{s.tagline}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-line bg-sand/60 p-7">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-50">
                  Actively recruiting for
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {upcomingSubjects.map((s) => (
                    <li
                      key={s.slug}
                      className="rounded-full border border-line-strong bg-bone px-3.5 py-1.5 text-[0.875rem]"
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-70">
                  Teach something else worth learning? Put it in the application. We have
                  opened subjects off the back of a single good application before.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="kola" size="md" id="process" aria-labelledby="process-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <IndexLabel index="03" onDark>
                  The process
                </IndexLabel>
                <h2 id="process-heading" className="mt-6 font-display text-d2 text-bone">
                  From application to first lesson.
                </h2>
                <p className="mt-5 text-bone/70">
                  Usually a week to ten days, most of which is waiting on the background
                  check. We will tell you where you are at each stage.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ol className="border-t border-kola-600">
                {tutorStandards.map((standard, i) => (
                  <li key={standard.step}>
                    <Reveal delay={i * 60}>
                      <div className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-kola-600 py-6 md:gap-x-8">
                        <span
                          aria-hidden="true"
                          className="mt-1 font-display text-[1.125rem] tabular-nums text-amber"
                        >
                          0{i + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-[1.4375rem] leading-snug text-bone">
                            {standard.step}
                          </h3>
                          <p className="mt-2 max-w-[58ch] text-[0.9375rem] leading-relaxed text-bone/65">
                            {standard.detail}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand" size="md" aria-labelledby="expectations-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <IndexLabel index="04">The arrangement</IndexLabel>
            <h2 id="expectations-heading" className="mt-6 font-display text-d2">
              What you get, and what we ask.
            </h2>
            <p className="mt-5 text-lead text-ink-70">
              Tutors are independent professionals, not employees. You set your rate
              expectation and your hours; we bring the learners and handle everything
              around the lesson.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-lg border border-line bg-shell p-7">
                <h3 className="font-display text-d3">From us</h3>
                <ul className="mt-6 space-y-3">
                  {fromUs.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-ink-70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="h-full rounded-lg border border-line bg-shell p-7">
                <h3 className="font-display text-d3">From you</h3>
                <ul className="mt-6 space-y-3">
                  {fromYou.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-ink-70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[0.875rem] text-ink-50">
                  Set out in full in our{" "}
                  <Link href="/legal/fair-play" className="text-clay underline underline-offset-4">
                    Fair Play Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/legal/child-safety" className="text-clay underline underline-offset-4">
                    Child Safety Policy
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="apply" size="md" aria-labelledby="apply-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <IndexLabel index="05">Apply</IndexLabel>
            <h2 id="apply-heading" className="mt-6 font-display text-d2">
              Apply to teach.
            </h2>
            <p className="mt-5 text-lead text-ink-70">
              Five short steps. We read every application ourselves and reply within 48
              hours either way.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <TutorForm />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <FormAside
                title="After you apply"
                steps={[
                  {
                    label: "We read it",
                    detail:
                      "Within 48 hours, and we reply either way — a yes, a no, or a question.",
                  },
                  {
                    label: "A short call and a sample lesson",
                    detail:
                      "Fifteen minutes of teaching tells us more than any CV. Teach us something you would teach a beginner.",
                  },
                  {
                    label: "Checks, then your first match",
                    detail:
                      "DBS or equivalent plus two references if you will teach under-18s. Then we introduce you to a learner who fits your hours.",
                  },
                ]}
                footnote={`Questions before you apply? Write to`}
              />
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Teach with Zidi", path: "/teach" },
          ]),
          {
            "@type": "JobPosting",
            title: "Online language tutor — Yorùbá, Igbo and more",
            description:
              "Teach live one-to-one and small group lessons online. Set your own availability, teach from anywhere, and be matched with learners by a person.",
            employmentType: "CONTRACTOR",
            hiringOrganization: { "@id": `${site.url}/#organization` },
            jobLocationType: "TELECOMMUTE",
            applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
            directApply: true,
          },
        )}
      />
    </>
  );
}
