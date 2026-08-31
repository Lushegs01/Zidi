import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import lagos from "@/assets/images/lagos.jpg";
import { getSubject, subjectPages, availableSubjects } from "@/data/subjects";
import { faqGroups } from "@/data/faqs";
import {
  breadcrumbSchema,
  courseSchema,
  faqSchema,
  jsonLd,
  pageMetadata,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SubjectCard } from "@/components/sections/subjects";
import { PricingTable } from "@/components/sections/pricing-table";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export function generateStaticParams() {
  return subjectPages.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject?.page) return {};
  return pageMetadata({
    title: subject.page.seoTitle,
    description: subject.page.seoDescription,
    path: `/learn/${subject.slug}`,
  });
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject?.page) notFound();

  const { page } = subject;
  const others = availableSubjects.filter((s) => s.slug !== subject.slug);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: `${subject.name} lessons`, path: `/learn/${subject.slug}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.heading}
        lead={page.intro}
        trail={trail}
        actions={
          <>
            <ButtonLink
              href={`/get-matched?subject=${subject.slug}`}
              size="lg"
              withArrow
            >
              Get matched with a {subject.name} tutor
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See pricing
            </ButtonLink>
          </>
        }
        aside={
          subject.image && (
            <div className="arch overflow-hidden bg-sand shadow-lift">
              <Image
                src={subject.image}
                alt={subject.imageAlt ?? ""}
                priority
                sizes="(max-width: 1023px) 92vw, 28vw"
                className="h-full w-full object-cover"
                placeholder="blur"
              />
            </div>
          )
        }
      />

      <Section size="md" aria-labelledby="context-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <IndexLabel index="01">About the language</IndexLabel>
                <h2 id="context-heading" className="mt-6 font-display text-d3">
                  Where {subject.nativeName ?? subject.name} is spoken
                </h2>
                <div className="mt-6 space-y-5 text-ink-70">
                  {page.context.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={80}>
                <figure>
                  <div className="overflow-hidden rounded-lg bg-sand">
                    <Image
                      src={lagos}
                      alt="A yellow danfo bus on a Lagos street with the city skyline behind it"
                      sizes="(max-width: 1023px) 92vw, 38vw"
                      className="h-full w-full object-cover"
                      placeholder="blur"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.875rem] text-ink-50">
                    Most of our tutors teach from Nigeria; most of our learners are in the
                    UK, North America and Europe. The lesson meets in the middle.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand" size="md" aria-labelledby="lessons-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <IndexLabel index="02">In the lessons</IndexLabel>
            <h2 id="lessons-heading" className="mt-6 font-display text-d2">
              What tutors usually cover.
            </h2>
            <p className="mt-5 text-lead text-ink-70">
              There is no fixed syllabus — your tutor builds around your level and your
              reason for learning. In practice, most start here.
            </p>
          </Reveal>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2">
            {page.lessons.map((lesson, i) => (
              <Reveal key={lesson.title} delay={i * 50} className="bg-bone p-7">
                <dt className="font-display text-[1.4375rem] leading-snug">
                  {lesson.title}
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink-70">
                  {lesson.detail}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-14">
            <h3 className="font-display text-d3">Who learns with us</h3>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {page.audiences.map((audience) => (
                <div
                  key={audience.title}
                  className="rounded-lg border border-line bg-shell p-6"
                >
                  <h4 className="font-medium">{audience.title}</h4>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-70">
                    {audience.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section size="md" aria-labelledby="subject-pricing-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <IndexLabel index="03">Pricing</IndexLabel>
            <h2 id="subject-pricing-heading" className="mt-6 font-display text-d2">
              {subject.name} lessons, priced monthly.
            </h2>
            <p className="mt-5 text-lead text-ink-70">
              The same rate whichever subject you choose. Sessions are an hour, invoiced
              monthly in advance.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <PricingTable />
          </Reveal>
        </Container>
      </Section>

      {others.length > 0 && (
        <Section tone="sand" size="md" aria-labelledby="also-heading">
          <Container>
            <Reveal>
              <h2 id="also-heading" className="font-display text-d3">
                Also available now
              </h2>
            </Reveal>
            <div
              className={
                others.length > 1
                  ? "mt-8 grid gap-5 sm:grid-cols-2 lg:max-w-2xl"
                  : "mt-8 grid max-w-sm gap-5"
              }
            >
              {others.map((other) => (
                <Reveal key={other.slug}>
                  <SubjectCard subject={other} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <FaqSection
        items={faqGroups[0]!.items}
        heading="Before you start."
        index="04"
        analyticsLabel={subject.slug}
      />

      <FinalCta
        heading={`Start ${subject.nativeName ?? subject.name} with the right tutor.`}
        body={`Tell us who's learning, what level they're at and when you're free. We come back within 24 hours with a ${subject.name} tutor chosen for you.`}
        location={`${subject.slug}_footer`}
      />

      <JsonLd
        data={jsonLd(
          breadcrumbSchema(trail),
          courseSchema(subject.slug),
          faqSchema(faqGroups[0]!.items),
        )}
      />
    </>
  );
}
