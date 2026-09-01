import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/layout";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { FormCard } from "@/components/forms/form-shell";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = pageMetadata({
  title: "Talk to Zidi",
  description:
    "Questions about lessons, pricing, tutors or safeguarding? Message the Zidi team — we answer within a few hours during business hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to Zidi."
        lead="A real person reads every message. We answer within a few hours during business hours, and by the next working day otherwise."
        trail={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <Section size="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <FormCard className="min-h-[46rem]">
                    <p className="text-ink-50">Loading the form…</p>
                  </FormCard>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-lg border border-line bg-sand/60 p-6 md:p-7">
                  <h2 className="font-display text-[1.5rem] leading-snug">
                    Ready to start instead?
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-70">
                    If you already know what you want to learn, the matching form gets you
                    a tutor faster than a back-and-forth here.
                  </p>
                  <ButtonLink href="/get-matched" withArrow className="mt-5" fullWidth>
                    Get matched with a tutor
                  </ButtonLink>
                </div>

                <div className="mt-5 rounded-lg border border-line p-6 md:p-7">
                  <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-50">
                    Direct
                  </h2>
                  <p className="mt-4 text-[0.9375rem] text-ink-70">
                    Email{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-clay underline underline-offset-4 hover:text-clay-700"
                    >
                      {site.email}
                    </a>
                  </p>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-70">
                    Applying to teach?{" "}
                    <Link href="/teach" className="text-clay underline underline-offset-4">
                      Use the tutor application
                    </Link>{" "}
                    — it asks the things we need and gets a reply within 48 hours.
                  </p>
                </div>

                <div className="mt-5 rounded-lg border border-clay/40 bg-clay-50/60 p-6 md:p-7">
                  <h2 className="font-medium text-ink">Safeguarding concerns</h2>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-70">
                    If you have a concern about a child&rsquo;s welfare, email{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-clay underline underline-offset-4"
                    >
                      {site.email}
                    </a>{" "}
                    and mark it urgent. If a child is at immediate risk, contact your local
                    emergency services or children&rsquo;s services first.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
