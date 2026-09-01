import type { Metadata } from "next";
import { site } from "@/data/site";
import { allFaqs } from "@/data/faqs";
import { availableSubjects } from "@/data/subjects";
import { plans, SESSION_MINUTES } from "@/data/pricing";

const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Learn with Zidi — learn the language, keep the connection.",
};

export function pageMetadata({
  title,
  description,
  path,
  noIndex,
}: {
  title: string;
  description: string;
  /** Path with a leading slash, or "/" for the homepage. */
  path: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------ Structured data */

const ORG_ID = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og-image.jpg`,
    description: site.description,
    email: site.email,
    sameAs: site.social.map((s) => s.href),
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    knowsLanguage: ["en", "yo", "ig"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      availableLanguage: ["English", "Yoruba", "Igbo"],
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-GB",
  };
}

export function faqSchema(items: { q: string; a: string }[] = allFaqs) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function courseSchema(slug: string) {
  const subject = availableSubjects.find((s) => s.slug === slug);
  if (!subject) return null;
  const cheapest = Math.min(...plans.map((p) => p.monthlyNgn));
  return {
    "@type": "Course",
    name: `${subject.name} lessons online`,
    description: subject.page?.seoDescription ?? subject.blurb,
    url: `${site.url}/learn/${subject.slug}`,
    provider: { "@id": ORG_ID },
    inLanguage: "en",
    teaches: subject.name,
    educationalLevel: "Beginner to advanced",
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: `PT${SESSION_MINUTES}M`,
        instructor: { "@id": ORG_ID },
      },
    ],
    offers: {
      "@type": "Offer",
      category: "Subscription",
      price: cheapest,
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
      url: `${site.url}/pricing`,
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

/** Wrap one or more schema objects into a single @graph document. */
export function jsonLd(...nodes: (object | null)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
