import Image from "next/image";
import heroFamily from "@/assets/images/hero-family.jpg";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { TrackedCta } from "@/components/ui/tracked-cta";

/**
 * Full-bleed opening frame.
 *
 * The photograph is the background. A directional scrim keeps every piece of
 * type clear of WCAG AA against it: vertical below lg, where the copy sits over
 * the middle of the image, and horizontal from lg up, where it sits to the left
 * of the subjects. Measured, not assumed — the worst case is the accent word at
 * 3.5:1 against a 3:1 requirement.
 *
 * Two deliberate details:
 * - The sticky header sits in normal flow, so the section is pulled up under it
 *   by the header's height and adds that height back as top padding.
 * - No blur placeholder. At full-viewport size rasterising one cost ~900ms of
 *   main-thread time, and the section's own kola ground covers the load anyway.
 */
export function Hero() {
  return (
    <section className="on-dark relative isolate -mt-18 flex min-h-[38.5rem] items-center overflow-hidden bg-kola pb-28 pt-[11.5rem] text-bone md:-mt-20 md:min-h-[45rem] md:pb-32 md:pt-[13rem] lg:min-h-[49rem]">
      <Image
        src={heroFamily}
        alt="A mother and father walking hand in hand with their young daughter along a tree-lined street"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[62%_38%] md:object-[58%_42%]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-kola/96 from-2% via-kola/84 via-52% to-kola/52 lg:bg-linear-to-r lg:from-kola lg:from-2% lg:via-kola/80 lg:via-46% lg:to-kola/15"
      />
      {/* Keeps the header legible over the brightest part of the sky. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-kola/72 to-transparent lg:h-36 lg:from-kola/65"
      />

      <Container className="relative">
        <div className="max-w-[34rem] md:max-w-[40rem] lg:max-w-[38rem]">
          <p className="label-index text-amber-bright">
            <span aria-hidden="true" className="h-px w-6 bg-amber-bright/60" />
            <span className="text-bone/95">Yorùbá · Igbo · and more</span>
          </p>

          <h1 className="mt-6 font-display text-d1 text-bone">
            Learn the language.
            <br />
            Keep the <em className="not-italic text-amber-bright">connection</em>.
          </h1>

          <p className="mt-7 max-w-[46ch] text-lead text-bone/85">
            Live one-to-one and small group lessons with tutors matched to you by a
            person — not an algorithm. Tell us who&rsquo;s learning and why, and
            we&rsquo;ll come back within 24 hours.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedCta
              href="/get-matched"
              variant="on-dark"
              size="lg"
              withArrow
              location="hero"
              label="Get matched with a tutor"
            >
              Get matched with a tutor
            </TrackedCta>
            <ButtonLink href="/learn" variant="on-dark-outline" size="lg">
              Explore what you can learn
            </ButtonLink>
          </div>

          <p className="mt-7 text-[0.9375rem] text-bone/70">
            For children from age 5, teenagers and adults. Scheduled in your timezone,
            wherever you are.
          </p>
        </div>
      </Container>
    </section>
  );
}
