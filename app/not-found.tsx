import type { Metadata } from "next";
import Link from "next/link";
import { availableSubjects } from "@/data/subjects";
import { Container } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page isn't here. Find Yorùbá and Igbo lessons, pricing, and how tutor matching works at Learn with Zidi.",
  robots: { index: false, follow: true },
};

const elsewhere = [
  { href: "/learn", label: "What you can learn" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faqs", label: "Questions" },
  { href: "/teach", label: "Teach with Zidi" },
  { href: "/contact", label: "Talk to Zidi" },
];

export default function NotFound() {
  return (
    <Container className="flex min-h-[68vh] flex-col justify-center py-20">
      <div className="max-w-2xl">
        <p className="label-index text-clay">
          <span aria-hidden="true" className="h-px w-6 bg-clay/40" />
          <span className="text-ink-50">404</span>
        </p>
        <h1 className="mt-6 font-display text-d1">This page isn&rsquo;t here.</h1>
        <p className="mt-6 max-w-[48ch] text-lead text-ink-70">
          The link may be old, or we may have moved something. Nothing you were doing is
          lost — any form you had started is still saved in this tab.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" withArrow>
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/get-matched" variant="secondary" size="lg">
            Get matched with a tutor
          </ButtonLink>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-50">
            Or try one of these
          </h2>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {[
              ...availableSubjects.map((s) => ({
                href: `/learn/${s.slug}`,
                label: `${s.nativeName ?? s.name} lessons`,
              })),
              ...elsewhere,
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9375rem] text-ink-70 underline-offset-4 transition-colors hover:text-clay hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
