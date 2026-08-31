import type { Metadata } from "next";
import { homeFaqs } from "@/data/faqs";
import { breadcrumbSchema, faqSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Subjects } from "@/components/sections/subjects";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "African language classes online",
  description:
    "Live online Yoruba and Igbo lessons with hand-matched tutors, plus Hausa, French, chess, piano and African cooking on the way. For children, teens and adults.",
  path: "/learn",
});

export default function LearnPage() {
  return (
    <>
      <PageHeader
        eyebrow="What you can learn"
        title="Two languages live. More on the way."
        lead="Every subject we open has a vetted tutor pool behind it before it goes live — we would rather offer two things properly than twelve badly."
        trail={[
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
        ]}
        actions={
          <>
            <ButtonLink href="/get-matched" size="lg" withArrow>
              Get matched with a tutor
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See pricing
            </ButtonLink>
          </>
        }
      />

      <Subjects />
      <HowItWorks compact />
      <FaqSection items={homeFaqs} index="04" analyticsLabel="learn" />
      <FinalCta location="learn_footer" />

      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
          ]),
          faqSchema(homeFaqs),
        )}
      />
    </>
  );
}
