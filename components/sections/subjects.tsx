import Image from "next/image";
import Link from "next/link";
import { availableSubjects, upcomingSubjects } from "@/data/subjects";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { CtaArrow } from "@/components/ui/button";

export function SubjectCard({
  subject,
  preload,
}: {
  subject: (typeof availableSubjects)[number];
  preload?: boolean;
}) {
  return (
    <Link
      href={`/learn/${subject.slug}`}
      className="group relative flex aspect-3/4 flex-col justify-end overflow-hidden bg-kola text-bone shadow-soft transition-shadow duration-300 hover:shadow-lift sm:aspect-4/5 lg:aspect-3/4"
      style={{ borderRadius: "80px 80px 14px 14px" }}
    >
      {subject.image && (
        <Image
          src={subject.image}
          alt={subject.imageAlt ?? ""}
          preload={preload}
          sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 32vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.05] motion-reduce:transform-none"
          placeholder="blur"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-kola via-kola/70 via-35% to-kola/5"
      />

      <div className="relative z-1 p-6 md:p-7">
        <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-amber">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
          Available now
        </p>
        <h3 className="mt-3 font-display text-[2.25rem] leading-none tracking-[-0.02em] md:text-[2.75rem]">
          {subject.nativeName ?? subject.name}
        </h3>
        <p className="mt-2.5 font-display text-[1.25rem] italic leading-snug text-bone/80">
          {subject.tagline}
        </p>
        <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed text-bone/60">
          {subject.blurb}
        </p>
        <p className="group/btn mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-bone">
          <span className="relative">
            See {subject.name} lessons
            {/* Static amber underline that brightens on hover — emphasis, not reveal */}
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-amber/40 transition-[background-color,transform] duration-300 ease-out-soft group-hover:bg-amber"
            />
          </span>
          <CtaArrow className="h-4 w-4 text-amber" />
        </p>
      </div>
    </Link>
  );
}

export function Subjects() {
  return (
    <Section id="subjects" size="lg" aria-labelledby="subjects-heading">
      <Container>
        <Reveal className="max-w-3xl">
          <IndexLabel index="02">What you can learn</IndexLabel>
          <h2 id="subjects-heading" className="mt-6 font-display text-d2">
            What do you want to learn?
          </h2>
          <p className="mt-5 max-w-[52ch] text-lead text-ink-70">
            Two languages are live today, with a tutor pool behind each. More are on the
            way — tell us which and we&rsquo;ll open it sooner.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-14 lg:gap-6">
          {availableSubjects.map((subject, i) => (
            <Reveal key={subject.slug} delay={i * 90}>
              <SubjectCard subject={subject} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 md:mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-8">
            <h3 className="font-display text-d3">On the way</h3>
            <p className="max-w-[46ch] text-[0.9375rem] text-ink-50">
              We open a subject once we have vetted tutors who can cover the timezones
              people are asking from. Register interest and you&rsquo;ll hear first.
            </p>
          </div>

          {/* Upcoming subjects — arch top radius on each card, warm sand container */}
          <div className="mt-8 overflow-hidden rounded-lg bg-sand">
            <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {upcomingSubjects.map((subject) => (
                <li key={subject.slug} className="bg-bone">
                  <Link
                    href={`/contact?topic=waitlist&subject=${subject.slug}`}
                    className="group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-sand/70"
                    style={{ borderRadius: "40px 40px 0 0" }}
                  >
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-50">
                      Coming soon
                    </span>
                    <span className="mt-3 font-display text-[1.75rem] leading-none tracking-[-0.015em]">
                      {subject.name}
                    </span>
                    <span className="mt-2 text-[0.9375rem] italic text-ink-70">
                      {subject.tagline}
                    </span>
                    <span className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-ink-50">
                      {subject.blurb}
                    </span>
                    <span className="group/btn mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-clay">
                      Register interest
                      <CtaArrow className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
              <li className="bg-sand/70">
                <Link
                  href="/contact?topic=waitlist"
                  className="group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-sand"
                >
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-clay">
                    Something else?
                  </span>
                  <span className="mt-3 font-display text-[1.75rem] leading-none tracking-[-0.015em]">
                    Ask us anyway
                  </span>
                  <span className="mt-2 text-[0.9375rem] italic text-ink-70">
                    Twi, Swahili, Wolof, Amharic&hellip;
                  </span>
                  <span className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-ink-50">
                    If you need a language or skill we haven&rsquo;t listed, tell us. We
                    have found tutors for one-off requests before and we will try again.
                  </span>
                  <span className="group/btn mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-clay">
                    Tell us what you need
                    <CtaArrow className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
