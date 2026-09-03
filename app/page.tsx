import type { Metadata } from "next";
import { homeFaqs } from "@/data/faqs";
import { faqSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhyZidi } from "@/components/sections/why-zidi";
import { Subjects } from "@/components/sections/subjects";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Promises } from "@/components/sections/promises";
import { Pathways } from "@/components/sections/pathways";
import { Testimonials } from "@/components/sections/testimonials";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "Learn with Zidi — live Yorùbá & Igbo lessons online",
  description:
    "Online Yoruba and Igbo lessons with vetted tutors, hand-matched by a person within 24 hours. Live 1:1 and small group classes for children, teens and adults.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyZidi />
      <Subjects />
      <HowItWorks />
      <Promises />
      <Pathways />
      <Testimonials />
      <PricingPreview />
      <FaqSection items={homeFaqs} index="07" analyticsLabel="home" />
      <FinalCta />
      <JsonLd data={jsonLd(faqSchema(homeFaqs))} />
    </>
  );
}
