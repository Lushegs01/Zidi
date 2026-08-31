import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLegalDoc, legalDocs } from "@/data/legal";
import { site } from "@/data/site";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/layout";
import { Prose } from "@/components/ui/prose";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ doc: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const legal = getLegalDoc(doc);
  if (!legal) return {};
  return pageMetadata({
    title: legal.title,
    description: legal.seoDescription,
    path: `/legal/${legal.slug}`,
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const legal = getLegalDoc(doc);
  if (!legal) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Policies", path: "/legal" },
    { name: legal.title, path: `/legal/${legal.slug}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Policies"
        title={legal.title}
        lead={legal.summary}
        trail={trail}
      />

      <Section size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <nav aria-label="Policies" className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-50">
                  All policies
                </h2>
                <ul className="mt-4 space-y-1">
                  {legalDocs.map((other) => {
                    const active = other.slug === legal.slug;
                    return (
                      <li key={other.slug}>
                        <Link
                          href={`/legal/${other.slug}`}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "-ml-3 block rounded-md px-3 py-2 text-[0.9375rem] transition-colors",
                            active
                              ? "bg-sand font-medium text-ink"
                              : "text-ink-70 hover:bg-sand/60 hover:text-ink",
                          )}
                        >
                          {other.navTitle}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-8 border-t border-line pt-6 text-[0.875rem] leading-relaxed text-ink-50">
                  Questions about any of this? Email{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-clay underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            </nav>

            <div className="lg:col-span-8 lg:col-start-5">
              <p className="text-[0.875rem] text-ink-50">
                Last updated: <time dateTime="2026-06-01">{legal.updated}</time>
              </p>

              <Prose className="mt-8">
                {legal.blocks.map((block, i) => (
                  <section key={i}>
                    {block.heading && <h2>{block.heading}</h2>}
                    {block.body?.map((paragraph, j) => (
                      <p key={j}>{paragraph}</p>
                    ))}
                    {block.list && (
                      <ul>
                        {block.list.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </Prose>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={jsonLd(breadcrumbSchema(trail))} />
    </>
  );
}
