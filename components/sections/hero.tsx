"use client";

import Image from "next/image";
import heroFamily from "@/assets/images/hero-family.jpg";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { TrackedCta } from "@/components/ui/tracked-cta";
import { useEffect, useRef } from "react";

/**
 * Full-bleed opening frame.
 *
 * The photograph is the background. A directional scrim keeps every piece of
 * type clear of WCAG AA against it: vertical below lg, where the copy sits over
 * the middle of the image, and horizontal from lg up, where it sits to the left
 * of the subjects.
 *
 * Visual upgrades:
 * - Curved arch bottom edge via clip-path, echoing the Zidi doorway logo mark.
 * - Two ambient glow blobs (kola-600 + amber) that drift slowly behind the headline.
 * - rAF-driven micro-parallax on the background image (respects prefers-reduced-motion).
 * - Amber glow halo around the "connection" word.
 */
export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (imgRef.current) {
          imgRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        }
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className="on-dark relative isolate -mt-18 flex min-h-[38.5rem] items-center overflow-hidden bg-kola pb-36 pt-[11.5rem] text-bone md:-mt-20 md:min-h-[45rem] md:pb-40 md:pt-[13rem] lg:min-h-[52rem]"
      style={{
        clipPath: "ellipse(110% 100% at 50% 0%)",
        WebkitClipPath: "ellipse(110% 100% at 50% 0%)",
      }}
    >
      {/* Background photograph with parallax wrapper */}
      <div ref={imgRef} className="absolute inset-0 -z-20 will-change-transform">
        <Image
          src={heroFamily}
          alt="A mother and father walking hand in hand with their young daughter along a tree-lined street"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[62%_38%] md:object-[58%_42%]"
        />
      </div>

      {/* Directional photo scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-kola/96 from-2% via-kola/84 via-52% to-kola/52 lg:bg-linear-to-r lg:from-kola lg:from-2% lg:via-kola/80 lg:via-46% lg:to-kola/15"
      />
      {/* Header legibility strip */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-kola/72 to-transparent lg:h-36 lg:from-kola/65"
      />

      {/* Ambient glow blob — kola-600, behind headline */}
      <div
        aria-hidden="true"
        className="drift pointer-events-none absolute -left-24 top-1/3 -z-[5] h-[28rem] w-[28rem] rounded-full bg-kola-600/60 blur-[80px]"
        style={{ animationDelay: "0ms" }}
      />
      {/* Ambient glow blob — amber, smaller, offset */}
      <div
        aria-hidden="true"
        className="drift pointer-events-none absolute left-1/4 top-1/2 -z-[5] h-[18rem] w-[18rem] rounded-full bg-amber/10 blur-[60px]"
        style={{ animationDelay: "2400ms" }}
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
            Keep the{" "}
            <span className="relative inline-block">
              <em className="not-italic text-amber-bright">connection</em>
              {/* Soft amber glow behind the accent word */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[-0.2em] inset-y-[-0.15em] -z-10 rounded-full bg-amber/15 blur-md"
              />
            </span>
            .
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
