"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Alert } from "@/components/ui/icons";
import { track } from "@/lib/analytics";

type State = "idle" | "sending" | "done" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState("error");
      setMessage("That email address doesn't look right — check for a typo.");
      return;
    }

    setState("sending");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setState("error");
        setMessage(
          data.error ??
            "We couldn't save that just now. Please try again in a moment.",
        );
        return;
      }
      setState("done");
      track("waitlist_interest", { source: "footer_newsletter" });
    } catch {
      setState("error");
      setMessage(
        "We couldn't reach our server. Check your connection and try again.",
      );
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-start gap-2.5 text-[0.9375rem] text-bone/80">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
        <span>
          You&rsquo;re on the list. We&rsquo;ll write when a new language or subject opens up —
          and not otherwise.
        </span>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address for new subject announcements
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            aria-invalid={state === "error" ? true : undefined}
            aria-describedby={state === "error" ? "newsletter-error" : undefined}
            className="min-h-12 w-full rounded-md border border-kola-600 bg-kola-800 px-4 py-3 text-bone placeholder:text-bone/40 transition-colors hover:border-bone/40 focus:border-amber focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber aria-[invalid=true]:border-amber"
          />
        </div>
        <Button
          type="submit"
          variant="on-dark"
          loading={state === "sending"}
          disabled={state === "sending"}
          className="sm:shrink-0"
        >
          {state === "sending" ? "Adding you…" : "Keep me posted"}
        </Button>
      </div>

      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="newsletter-company">Company website</label>
        <input
          id="newsletter-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <p aria-live="polite" className="min-h-5">
        {state === "error" && (
          <span
            id="newsletter-error"
            className="flex items-start gap-1.5 text-[0.875rem] font-medium text-amber"
          >
            <Alert className="mt-0.5 h-4 w-4 shrink-0" />
            {message}
          </span>
        )}
      </p>
    </form>
  );
}
