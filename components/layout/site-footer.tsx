import Link from "next/link";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";
import { Logo } from "@/components/ui/logo";
import { CtaArrow } from "@/components/ui/button";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark grain bg-kola text-bone">
      <div className="container-page relative z-1 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
          <div className="max-w-md">
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="inline-flex items-center gap-2.5 text-bone"
            >
              <Logo
                className="flex items-center gap-2.5"
                markClassName="text-amber"
                wordmarkClassName="font-display text-[1.75rem] leading-none tracking-[-0.01em]"
              />
            </Link>
            <p className="mt-5 font-display text-[1.5rem] leading-[1.2] tracking-[-0.015em] text-bone/90">
              Learn the language. Keep the connection.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-bone/60">
              We match learners and families with vetted tutors for live lessons in
              Yorùbá, Igbo and more — and stay involved long after the introduction.
            </p>

            <div className="mt-8">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-bone/50">
                New subjects, now and then
              </h2>
              <p className="mt-2 mb-4 text-[0.9375rem] text-bone/60">
                Hausa, French, chess, piano and cooking are on the way.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-labelledby={`footer-${group.title}`}>
                <h2
                  id={`footer-${group.title}`}
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-bone/50"
                >
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.9375rem] text-bone/75 underline-offset-4 transition-colors hover:text-amber hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-kola-600/70 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              <p className="text-[0.9375rem] text-bone/70">
                Questions, or something not covered here?{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="group/btn inline-flex items-center gap-1 text-amber underline-offset-4 hover:underline"
                >
                  {site.email}
                  <CtaArrow className="h-3.5 w-3.5" />
                </a>
              </p>
              <p className="text-[0.8125rem] text-bone/45">
                © {year} {site.name}. Registered in {site.jurisdiction}. Tutors are
                independent professionals, not employees.
              </p>
            </div>

            <ul className="flex flex-wrap items-center gap-2">
              {site.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    rel="me noopener noreferrer"
                    target="_blank"
                    className="inline-flex min-h-10 items-center rounded-full border border-kola-600 px-4 text-[0.875rem] text-bone/70 transition-colors hover:border-amber/60 hover:text-amber"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
