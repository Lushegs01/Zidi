"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "@/components/ui/layout";
import { Button, ButtonLink } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[zidi] unhandled page error", error);
  }, [error]);

  return (
    <Container className="flex min-h-[68vh] flex-col justify-center py-20">
      <div className="max-w-2xl">
        <p className="label-index text-clay">
          <span aria-hidden="true" className="h-px w-6 bg-clay/40" />
          <span className="text-ink-50">Something broke</span>
        </p>
        <h1 className="mt-6 font-display text-d1">That&rsquo;s our fault, not yours.</h1>
        <p className="mt-6 max-w-[48ch] text-lead text-ink-70">
          This page failed to load properly. Trying again usually fixes it. If it
          doesn&rsquo;t, email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-clay underline underline-offset-4"
          >
            {site.email}
          </a>{" "}
          and we&rsquo;ll sort it out — you can start a tutor match by email just as
          easily.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={reset} withArrow>
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            Back to the homepage
          </ButtonLink>
        </div>

        {error.digest && (
          <p className="mt-10 text-[0.8125rem] text-ink-50">
            If you email us, quoting this reference helps:{" "}
            <code className="rounded-xs bg-sand px-1.5 py-0.5 font-mono">{error.digest}</code>
          </p>
        )}

        <p className="mt-6 text-[0.875rem] text-ink-50">
          <Link href="/faqs" className="underline underline-offset-4 hover:text-clay">
            Browse questions
          </Link>
        </p>
      </div>
    </Container>
  );
}
