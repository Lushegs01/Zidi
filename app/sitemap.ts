import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { subjectPages } from "@/data/subjects";
import { legalDocs } from "@/data/legal";

/**
 * Priorities reflect commercial importance: the conversion pages and the two
 * live subject pages rank above policy documents.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: { path: string; priority: number; frequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, frequency: "weekly" },
    { path: "/learn", priority: 0.9, frequency: "weekly" },
    { path: "/get-matched", priority: 0.9, frequency: "monthly" },
    { path: "/pricing", priority: 0.85, frequency: "monthly" },
    { path: "/how-it-works", priority: 0.8, frequency: "monthly" },
    { path: "/families", priority: 0.8, frequency: "monthly" },
    { path: "/adults", priority: 0.8, frequency: "monthly" },
    { path: "/teach", priority: 0.75, frequency: "monthly" },
    { path: "/faqs", priority: 0.7, frequency: "monthly" },
    { path: "/about", priority: 0.6, frequency: "monthly" },
    { path: "/contact", priority: 0.6, frequency: "monthly" },
  ];

  return [
    ...core.map((entry) => ({
      url: `${site.url}${entry.path === "/" ? "" : entry.path}`,
      lastModified: now,
      changeFrequency: entry.frequency,
      priority: entry.priority,
    })),
    ...subjectPages.map((subject) => ({
      url: `${site.url}/learn/${subject.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...legalDocs.map((doc) => ({
      url: `${site.url}/legal/${doc.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
