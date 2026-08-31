import type { Metadata } from "next";
import Link from "next/link";
import { allFaqs, faqGroups } from "@/data/faqs";
import { site } from "@/data/site";
import { breadcrumbSchema, faqSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "Questions & answers",
  description:
    "How matching works, how long sessions are, how tutors are vetted, what happens if the fit isn't right, and how payment works at Learn with Zidi.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Questions"
        title="Everything people ask us."
        lead="Grouped by what you're probably trying to work out. If yours isn't here, ask — we'd rather answer it than have you guess."
        trail={[
          { name: "Home", path: "/" },
          { name: "Questions", path: "/faqs" },
        ]}
        actions={
          <ButtonLink href="/contact" variant="secondary" size="lg" withArrow>
            Ask us something else
          </ButtonLink>
        }
      />

      <Section size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <nav aria-label="Question categories" className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-50">
                  Jump to
                </h2>
                <ul className="mt-4 space-y-0.5">
                  {faqGroups.map((group) => (
                    <li key={group.id}>
                      <a
                        href={`#${group.id}`}
                        className="-ml-3 block rounded-md px-3 py-2 text-[0.9375rem] text-ink-70 transition-colors hover:bg-sand/60 hover:text-clay"
                      >
                        {group.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-line pt-6 text-[0.875rem] leading-relaxed text-ink-50">
                  Policies in full:{" "}
                  <Link href="/legal/privacy" className="text-clay underline underline-offset-4">
                    Privacy
                  </Link>
                  ,{" "}
                  <Link href="/legal/terms" className="text-clay underline underline-offset-4">
                    Terms
                  </Link>
                  ,{" "}
                  <Link
                    href="/legal/child-safety"
                    className="text-clay underline underline-offset-4"
                  >
                    Child safety
                  </Link>
                  ,{" "}
                  <Link href="/legal/refunds" className="text-clay underline underline-offset-4">
                    Refunds
                  </Link>
                  .
                </p>
              </div>
            </nav>

            <div className="lg:col-span-8 lg:col-start-5">
              <div className="space-y-16">
                {faqGroups.map((group) => (
                  <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
                    <Reveal>
                      <h2
                        id={`${group.id}-heading`}
                        className="font-display text-d3"
                      >
                        {group.title}
                      </h2>
                      <Accordion
                        items={group.items}
                        className="mt-6"
                        analyticsLabel={group.id}
                      />
                    </Reveal>
                  </section>
                ))}
              </div>

              <Reveal>
                <div className="mt-14 rounded-lg border border-line bg-sand/60 p-7">
                  <h2 className="font-display text-[1.5rem] leading-snug">
                    Still not answered?
                  </h2>
                  <p className="mt-3 text-ink-70">
                    Email{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-clay underline underline-offset-4"
                    >
                      {site.email}
                    </a>{" "}
                    or send us a message. We answer within a few hours during business
                    hours.
                  </p>
                  <ButtonLink href="/contact" className="mt-5" withArrow>
                    Talk to Zidi
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta location="faqs_footer" />

      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Questions", path: "/faqs" },
          ]),
          faqSchema(allFaqs),
        )}
      />
    </>
  );
}
