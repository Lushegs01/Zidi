"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import joy from "@/assets/images/joy.jpg";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { TrackedCta } from "@/components/ui/tracked-cta";

/**
 * Final CTA section.
 *
 * Upgrades:
 * - adinkra CSS pattern adds concentric-arch texture at low opacity over the kola surface.
 * - The heading word "conversation" gets an amber-sweep rule that animates in on scroll.
 *   We watch for the Reveal data-shown attribute to fire the sweep.
 */
export function FinalCta({
  heading = "Start with one conversation.",
  body = "Tell us who's learning and why. A person reads it, picks your tutor, and comes back within 24 hours. No payment until you've agreed a schedule.",
  location = "final_cta",
}: {
  heading?: string;
  body?: string;
  location?: string;
}) {
  const ruleRef = useRef<HTMLSpanElement>(null);

  /* Watch the Reveal parent for data-shown, then fire the amber sweep. */
  useEffect(() => {
    const el = ruleRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      const reveal = el.closest("[data-shown]");
      if (reveal?.getAttribute("data-shown") === "true") {
        el.setAttribute("data-active", "true");
        observer.disconnect();
      }
    });
    const reveal = el.closest("[data-shown]") ?? el.parentElement;
    if (reveal) observer.observe(reveal, { attributes: true, attributeFilter: ["data-shown"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="on-dark grain adinkra relative overflow-hidden bg-kola text-bone"
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
          {/*
            The heading wraps an amber-rule-wrap span around the key word.
            The amber sweep rule fires once the Reveal animation completes.
          */}
          <h2 id="final-cta-heading" className="font-display text-d1 text-bone">
            Start with one{" "}
            <span className="amber-rule-wrap" ref={ruleRef}>
              conversation
            </span>
            .
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
