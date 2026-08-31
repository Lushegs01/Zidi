import Image from "next/image";
import { tutors, tutorStandards } from "@/data/tutors";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

/**
 * Renders real tutor profiles once `data/tutors.ts` has them, and the vetting
 * standards until then. Both answer the same question — who will be teaching?
 */
export function TutorStandards() {
  const hasRoster = tutors.length > 0;

  return (
    <Section tone="sand" size="lg" aria-labelledby="tutors-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <IndexLabel index="06">The people behind the lessons</IndexLabel>
              <h2 id="tutors-heading" className="mt-6 font-display text-d2">
                {hasRoster
                  ? "Meet the people behind the lessons."
                  : "Nobody teaches here by accident."}
              </h2>
              <p className="mt-5 max-w-[46ch] text-lead text-ink-70">
                {hasRoster
                  ? "A few of the tutors in our pool. Every one of them has been through the process below."
                  : "Speaking a language and teaching it are different skills. We look for both — and then we check, before anyone meets a learner."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/teach" variant="secondary" size="lg">
                  Teach with Zidi
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {hasRoster ? (
              <ul className="grid gap-6 sm:grid-cols-2">
                {tutors.map((tutor, i) => (
                  <li key={tutor.id}>
                    <Reveal delay={i * 70}>
                      <article className="h-full overflow-hidden rounded-lg border border-line bg-shell shadow-soft">
                        {tutor.photo && (
                          <div className="aspect-4/5 overflow-hidden bg-sand">
                            <Image
                              src={tutor.photo}
                              alt={tutor.photoAlt ?? `${tutor.name}, a Zidi tutor`}
                              sizes="(max-width: 639px) 92vw, 22vw"
                              className="h-full w-full object-cover"
                              placeholder="blur"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="font-display text-[1.5rem] leading-none">
                            {tutor.name}
                          </h3>
                          <p className="mt-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-clay">
                            {tutor.subjects.join(" · ")} · {tutor.experience}
                          </p>
                          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-70">
                            {tutor.story}
                          </p>
                          <p className="mt-3 text-[0.875rem] text-ink-50">
                            {tutor.based} · {tutor.ageGroups.join(", ")}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            ) : (
              <ol className="border-t border-line-strong">
                {tutorStandards.map((standard, i) => (
                  <li key={standard.step}>
                    <Reveal delay={i * 60}>
                      <div className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line-strong py-6 md:gap-x-8">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 font-display text-[1.125rem] tabular-nums text-clay/60"
                        >
                          0{i + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-[1.4375rem] leading-snug tracking-[-0.012em]">
                            {standard.step}
                          </h3>
                          <p className="mt-2 max-w-[56ch] text-[0.9375rem] leading-relaxed text-ink-70">
                            {standard.detail}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
