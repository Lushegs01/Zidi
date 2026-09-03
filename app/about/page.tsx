import type { Metadata } from "next";
import Image from "next/image";
import kitchen from "@/assets/images/kitchen.jpg";
import joy from "@/assets/images/joy.jpg";
import { site } from "@/data/site";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Promises } from "@/components/sections/promises";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description:
    "A managed live-learning service connecting diaspora families with vetted tutors for African languages. Every match is made by a person.",
  path: "/about",
});

const principles = [
  {
    title: "A person makes the match",
    detail:
      "We could build a search page and let you filter. We think it would be worse. Someone reading your answers and choosing is slower for us and better for you.",
  },
  {
    title: "Small on purpose",
    detail:
      "We open a subject when we have tutors who can genuinely cover it — not when we can put a tile on a page. Two languages done properly beats twelve listed.",
  },
  {
    title: "No claims we can't stand behind",
    detail:
      "You won't find a fluency guarantee or a success percentage here. What you'll find is what we actually commit to, and what happens if we don't meet it.",
  },
  {
    title: "The awkward parts are ours",
    detail:
      "If a tutor isn't right, you email us and we handle it. Families should not have to manage the relationship they're paying us to manage.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Zidi"
        title={
          <>
            A distance opened up.
            <br />
            We help close it.
          </>
        }
        lead="Learn with Zidi is a managed live-learning service. We match learners and families — particularly across the African diaspora — with vetted tutors for languages and skills that are hard to find good teaching for."
        trail={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <Section size="md" aria-labelledby="story-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <IndexLabel index="01">Why we exist</IndexLabel>
                <h2 id="story-heading" className="mt-6 font-display text-d2">
                  The problem was never wanting to.
                </h2>
                <div className="mt-6 space-y-5 text-lead text-ink-70">
                  <p>
                    Almost every family we speak to has already tried. An app that taught
                    twenty nouns. A cousin who meant to help. A YouTube channel nobody
                    kept up with. A tutor found in a WhatsApp group who was excellent, and
                    then moved.
                  </p>
                  <p>
                    The difficulty is rarely motivation. It is that finding the right
                    person — someone fluent, reliable, good with children, free at 7pm in
                    your timezone, and still there in six months — is genuinely hard work.
                  </p>
                  <p>
                    So we do that part. We find the tutor, we set the schedule, we stay
                    involved, and if it isn&rsquo;t working we fix it. What you are left
                    with is the thing you actually wanted: an hour a week with someone who
                    can teach.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={80}>
                <div className="overflow-hidden rounded-lg bg-sand">
                  <Image
                    src={kitchen}
                    alt="A family cooking together in a bright home kitchen"
                    sizes="(max-width: 1023px) 92vw, 38vw"
                    className="h-full w-full object-cover"
                    placeholder="blur"
                  />
                </div>
              </Reveal>
              <Reveal delay={140}>
                <div className="mt-6 rounded-lg border border-line bg-sand/50 p-6">
                  <p className="font-display text-[1.5rem] leading-[1.3] tracking-[-0.012em]">
                    &ldquo;We help you find the right person to help you learn, connect,
                    and stay connected to language and culture.&rdquo;
                  </p>
                  <p className="mt-4 text-[0.875rem] text-ink-50">
                    What Zidi is for, in one sentence.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand" size="md" aria-labelledby="principles-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <IndexLabel index="02">How we work</IndexLabel>
            <h2 id="principles-heading" className="mt-6 font-display text-d2">
              Four decisions we keep making.
            </h2>
          </Reveal>

          <dl className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal
                key={principle.title}
                delay={i * 60}
                className="border-t border-line-strong pt-5"
              >
                <dt className="font-display text-[1.5rem] leading-snug tracking-[-0.012em]">
                  {principle.title}
                </dt>
                <dd className="mt-3 leading-relaxed text-ink-70">{principle.detail}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section size="md" aria-labelledby="facts-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <IndexLabel index="03">The company</IndexLabel>
                <h2 id="facts-heading" className="mt-6 font-display text-d2">
                  The plain facts.
                </h2>
                <div className="mt-8 space-y-5 text-ink-70">
                  <p>
                    Learn with Zidi is a matching and coordination service registered in{" "}
                    {site.jurisdiction}. Tutors are independent professionals, not
                    employees — we vet them, match them and coordinate scheduling, but the
                    teaching relationship is with your tutor.
                  </p>
                  <p>
                    Lessons are delivered on Zoom or Google Meet. We do not host sessions
                    on our own platform, and we do not take a cut of anything beyond the
                    published monthly rate.
                  </p>
                  <p>
                    We handle personal data under UK GDPR and the Data Protection Act
                    2018, collect the minimum we need to make a match, and never sell it.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/legal/privacy" variant="secondary">
                    Privacy policy
                  </ButtonLink>
                  <ButtonLink href="/legal/terms" variant="secondary">
                    Terms &amp; conditions
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="quiet" withArrow>
                    Talk to Zidi
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={80}>
                <div className="arch overflow-hidden bg-sand shadow-soft">
                  <Image
                    src={joy}
                    alt="A girl with her arms outstretched riding on her father's shoulders"
                    sizes="(max-width: 1023px) 92vw, 38vw"
                    className="aspect-4/5 h-full w-full object-cover"
                    placeholder="blur"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Promises />
      <FinalCta location="about_footer" />

      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
      />
    </>
  );
}
