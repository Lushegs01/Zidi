import Image from "next/image";
import heroFamily from "@/assets/images/hero-family.jpg";
import heroLesson from "@/assets/images/hero-lesson.jpg";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { TrackedCta } from "@/components/ui/tracked-cta";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 md:pb-28 md:pt-24 lg:pb-32 lg:pt-28">
      {/* A single oversized arch, drawn in the brand's own silhouette. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[24%] -top-[10%] hidden h-[122%] w-[62%] rounded-t-[999px] border border-clay/12 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(70%_100%_at_20%_0%,rgba(168,65,42,0.07),transparent_70%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="label-index text-clay">
              <span aria-hidden="true" className="h-px w-6 bg-clay/40" />
              <span className="text-ink-50">Yorùbá · Igbo · and more</span>
            </p>

            <h1 className="mt-6 font-display text-d1">
              Learn the language.
              <br />
              Keep the <em className="not-italic text-clay">connection</em>.
            </h1>

            <p className="mt-7 max-w-[46ch] text-lead text-ink-70">
              Live one-to-one and small group lessons with tutors matched to you by a
              person — not an algorithm. Tell us who&rsquo;s learning and why, and we&rsquo;ll come
              back within 24 hours.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedCta
                href="/get-matched"
                size="lg"
                withArrow
                location="hero"
                label="Get matched with a tutor"
              >
                Get matched with a tutor
              </TrackedCta>
              <ButtonLink href="/learn" variant="secondary" size="lg">
                Explore what you can learn
              </ButtonLink>
            </div>

            <p className="mt-7 text-[0.9375rem] text-ink-50">
              For children from age 5, teenagers and adults. Scheduled in your timezone,
              wherever you are.
            </p>
          </div>

          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto w-full max-w-[26rem] lg:ml-auto lg:mr-0 lg:max-w-[27rem] xl:max-w-[30rem]">
              <div className="arch relative aspect-4/5 overflow-hidden bg-sand shadow-lift">
                <Image
                  src={heroFamily}
                  alt="A mother and father walking hand in hand with their young daughter along a tree-lined street"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1023px) 92vw, 30vw"
                  className="h-full w-full object-cover"
                  placeholder="blur"
                />
              </div>

              {/* Second frame, overlapping — the online lesson itself. */}
              <div className="absolute -bottom-10 -left-5 w-[54%] max-w-[15rem] overflow-hidden rounded-lg border-4 border-bone bg-sand shadow-lift sm:-left-12 lg:-left-24">
                <Image
                  src={heroLesson}
                  alt="A girl in glasses smiling as she follows her online lesson on a laptop at home"
                  sizes="(max-width: 640px) 52vw, 240px"
                  className="h-full w-full object-cover"
                  placeholder="blur"
                />
              </div>

              <div className="absolute -right-2 top-8 rounded-full border border-line bg-bone/95 px-4 py-2.5 shadow-soft backdrop-blur-sm sm:right-2 lg:-right-4">
                <p className="flex items-center gap-2.5 text-[0.8125rem] font-medium">
                  <span aria-hidden="true" className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-clay/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
                  </span>
                  Matched within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
