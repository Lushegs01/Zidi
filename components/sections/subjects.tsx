import Image from "next/image";
import Link from "next/link";
import { availableSubjects, upcomingSubjects } from "@/data/subjects";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink, CtaArrow } from "@/components/ui/button";

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
          <div className="overflow-hidden rounded-2xl border border-line bg-shell p-8 shadow-soft md:p-10 lg:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Context & Action */}
              <div className="lg:col-span-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-clay">
                  On the way · Coming soon &amp; by request
                </p>
                <h3 className="mt-4 font-display text-[1.875rem] leading-tight md:text-[2.25rem]">
                  More languages &amp; skills in the pipeline.
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-70">
                  We open a subject once we have vetted tutors who can cover the timezones
                  people are asking from. If you are waiting for one of these — or need a
                  different language like Twi, Swahili, Wolof or Amharic — register your
                  interest and you&rsquo;ll hear first.
                </p>
                <div className="mt-7">
                  <ButtonLink href="/contact?topic=waitlist" variant="secondary" withArrow>
                    Register interest / Join waitlist
                  </ButtonLink>
                </div>
              </div>

              {/* Right Column: Combined interactive list of upcoming subjects */}
              <div className="lg:col-span-6">
                <div className="divide-y divide-line rounded-xl border border-line bg-bone p-2 sm:p-3">
                  {upcomingSubjects.map((subject) => (
                    <Link
                      key={subject.slug}
                      href={`/contact?topic=waitlist&subject=${subject.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-lg p-3.5 transition-colors duration-150 hover:bg-sand/70"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-[1.125rem] font-medium leading-none text-ink group-hover:text-clay">
                            {subject.name}
                          </span>
                          <span className="rounded-full bg-sand px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-ink-50">
                            {subject.kind}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-[0.8125rem] text-ink-50">
                          {subject.tagline}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-1 text-[0.8125rem] font-medium text-clay">
                        <span>Waitlist</span>
                        <CtaArrow className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}

                  {/* Something else row */}
                  <Link
                    href="/contact?topic=waitlist"
                    className="group flex items-center justify-between gap-4 rounded-lg p-3.5 transition-colors duration-150 hover:bg-sand/70"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[1.125rem] font-medium leading-none text-clay">
                          Something else?
                        </span>
                        <span className="rounded-full bg-clay/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-clay">
                          By request
                        </span>
                      </div>
                      <p className="mt-1 truncate text-[0.8125rem] text-ink-50">
                        Twi, Swahili, Wolof, Amharic &amp; others
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-[0.8125rem] font-medium text-clay">
                      <span>Ask us</span>
                      <CtaArrow className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
