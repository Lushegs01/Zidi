import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/data/site";

export function FormAside({
  title,
  steps,
  footnote,
}: {
  title: string;
  steps: { label: string; detail: string }[];
  footnote?: ReactNode;
}) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-lg border border-line bg-sand/60 p-6 md:p-7">
        <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-clay">
          {title}
        </h2>
        <ol className="mt-5 space-y-5">
          {steps.map((step, i) => (
            <li key={step.label} className="grid grid-cols-[auto_1fr] gap-x-4">
              <span
                aria-hidden="true"
                className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[0.6875rem] font-semibold text-bone"
              >
                {i + 1}
              </span>
              <div>
                <p className="font-medium leading-snug">{step.label}</p>
                <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-70">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 rounded-lg border border-line p-6 md:p-7">
        <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-50">
          Your details
        </h2>
        <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-70">
          We ask for the minimum we need to make a good match — a first name at most for
          a learner, never a surname or date of birth. Your matched tutor only ever sees
          the learner&rsquo;s first name, subject, level, availability and timezone.
        </p>
        <p className="mt-3 text-[0.875rem]">
          <Link
            href="/legal/privacy"
            className="text-clay underline underline-offset-4 hover:text-clay-700"
          >
            Read the privacy policy
          </Link>
        </p>
      </div>

      {footnote && (
        <p className="mt-5 text-[0.875rem] leading-relaxed text-ink-50">
          {footnote}{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-clay underline underline-offset-4 hover:text-clay-700"
          >
            {site.email}
          </a>
        </p>
      )}
    </aside>
  );
}
