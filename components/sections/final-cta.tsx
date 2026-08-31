import Image from "next/image";
import Link from "next/link";
import joy from "@/assets/images/joy.jpg";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { TrackedCta } from "@/components/ui/tracked-cta";

export function FinalCta({
  heading = "Start with one conversation.",
  body = "Tell us who's learning and why. A person reads it, picks your tutor, and comes back within 24 hours. No payment until you've agreed a schedule.",
  location = "final_cta",
}: {
  heading?: string;
  body?: string;
  location?: string;
}) {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="on-dark grain relative overflow-hidden bg-kola text-bone"
    >
      <Image
        src={joy}
        alt=""
        aria-hidden="true"
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
        placeholder="blur"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-kola via-kola/88 via-45% to-kola/45"
      />

      <Container className="relative z-1 py-24 md:py-32 lg:py-36">
        <Reveal className="max-w-2xl">
          <h2 id="final-cta-heading" className="font-display text-d1 text-bone">
            {heading}
          </h2>
          <p className="mt-6 max-w-[48ch] text-lead text-bone/75">{body}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedCta
              href="/get-matched"
              variant="on-dark"
              size="lg"
              withArrow
              location={location}
              label="Get matched with a tutor"
            >
              Get matched with a tutor
            </TrackedCta>
            <ButtonLink href="/contact" variant="on-dark-outline" size="lg">
              Talk to Zidi first
            </ButtonLink>
          </div>

          <p className="mt-8 text-[0.9375rem] text-bone/55">
            Prefer to teach?{" "}
            <Link
              href="/teach"
              className="text-amber underline underline-offset-4 hover:text-bone"
            >
              Apply to teach with Zidi
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
