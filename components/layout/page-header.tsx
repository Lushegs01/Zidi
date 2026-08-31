import Link from "next/link";
import type { ReactNode } from "react";
import { Container, IndexLabel } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ trail, onDark }: { trail: Crumb[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${crumb.path}-${i}`} className="flex items-center gap-2">
              {last ? (
                <span
                  aria-current="page"
                  className={onDark ? "text-bone/60" : "text-ink-50"}
                >
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.path}
                    className={cn(
                      "underline-offset-4 hover:underline",
                      onDark ? "text-bone/70 hover:text-amber" : "text-ink-70 hover:text-clay",
                    )}
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className={onDark ? "text-bone/30" : "text-line-strong"}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * The standard opening for every page below the homepage: breadcrumb, index
 * label, one h1, one supporting paragraph, and room for actions or an aside.
 */
export function PageHeader({
  eyebrow,
  index,
  title,
  lead,
  actions,
  aside,
  trail,
  align = "left",
}: {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  trail?: Crumb[];
  align?: "left" | "wide";
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-14 pt-14 md:pb-20 md:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[340px] bg-[radial-gradient(60%_100%_at_15%_0%,rgba(168,65,42,0.06),transparent_70%)]"
      />
      <Container className="relative">
        {trail && (
          <div className="mb-8">
            <Breadcrumbs trail={trail} />
          </div>
        )}
        <div
          className={cn(
            "grid gap-10",
            aside ? "lg:grid-cols-12 lg:gap-16" : align === "wide" ? "" : "max-w-4xl",
          )}
        >
          <div className={aside ? "lg:col-span-7" : undefined}>
            <IndexLabel index={index}>{eyebrow}</IndexLabel>
            <h1 className="mt-6 font-display text-d1">{title}</h1>
            {lead && (
              <div className="mt-6 max-w-[54ch] text-lead text-ink-70">{lead}</div>
            )}
            {actions && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                {actions}
              </div>
            )}
          </div>
          {aside && (
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">{aside}</div>
          )}
        </div>
      </Container>
    </section>
  );
}
