import Link from "next/link";
import type { Faq } from "@/data/faqs";
import { site } from "@/data/site";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";

export function FaqSection({
  items,
  heading = "Questions people ask before they start.",
  index = "08",
  showAllLink = true,
  analyticsLabel,
}: {
  items: Faq[];
  heading?: string;
  index?: string;
  showAllLink?: boolean;
  analyticsLabel?: string;
}) {
  return (
    <Section tone="sand" size="lg" id="faqs" aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28">
              <IndexLabel index={index}>Questions</IndexLabel>
              <h2 id="faq-heading" className="mt-6 font-display text-d2">
                {heading}
              </h2>
              <p className="mt-5 max-w-[38ch] text-ink-70">
                Can&rsquo;t find yours?{" "}
                <Link
                  href="/contact"
                  className="text-clay underline underline-offset-4 hover:text-clay-700"
                >
                  Talk to Zidi
                </Link>{" "}
                or email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-clay underline underline-offset-4 hover:text-clay-700"
                >
                  {site.email}
                </a>
                . We answer within a few hours in business hours.
              </p>
              {showAllLink && (
                <p className="mt-5">
                  <Link
                    href="/faqs"
                    className="text-[0.9375rem] font-medium text-ink underline underline-offset-4 hover:text-clay"
                  >
                    Read every question
                  </Link>
                </p>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <Accordion items={items} analyticsLabel={analyticsLabel} />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
