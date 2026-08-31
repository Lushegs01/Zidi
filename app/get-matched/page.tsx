import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/layout";
import { PageHeader } from "@/components/layout/page-header";
import { MatchForm } from "@/components/forms/match-form";
import { FormAside } from "@/components/forms/form-aside";
import { FormCard } from "@/components/forms/form-shell";

export const metadata: Metadata = pageMetadata({
  title: "Get matched with a tutor",
  description:
    "Tell us who's learning, what you want to learn and when you're free. A person on the Zidi team picks your tutor and comes back within 24 hours.",
  path: "/get-matched",
});

export default function GetMatchedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get matched"
        title={
          <>
            Tell us who&rsquo;s learning.
            <br />
            We&rsquo;ll find the right person.
          </>
        }
        lead="Eight short questions, about two minutes. Nothing is charged, and nothing is committed to, until you've met your tutor and agreed a schedule."
        trail={[
          { name: "Home", path: "/" },
          { name: "Get matched", path: "/get-matched" },
        ]}
      />

      <Section tone="bone" size="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <FormCard className="min-h-[38rem]">
                    <p className="text-ink-50">Loading the form…</p>
                  </FormCard>
                }
              >
                <MatchForm />
              </Suspense>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <FormAside
                title="What happens next"
                steps={[
                  {
                    label: "A person reads it",
                    detail:
                      "Not an algorithm. Someone on the team goes through your answers and looks at who's free in your timezone.",
                  },
                  {
                    label: "We introduce your tutor",
                    detail:
                      "Within 24 hours, by email and WhatsApp, with a suggested slot and a short note on why we picked them.",
                  },
                  {
                    label: "You start",
                    detail:
                      "Your first invoice comes after you've agreed a schedule — never before. If the fit is wrong in the first two sessions, we rematch you free.",
                  },
                ]}
                footnote="Would rather ask a question first? Write to"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
