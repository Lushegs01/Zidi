"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/data/site";
import { subjects } from "@/data/subjects";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { postForm } from "@/lib/submit";
import { track } from "@/lib/analytics";
import { Field, Honeypot, Input, Select, Textarea } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { FormCard, SubmitError, SuccessPanel } from "./form-shell";

export const contactTopics = [
  { value: "matching", label: "Finding a tutor" },
  { value: "waitlist", label: "A language or subject you don't offer yet" },
  { value: "pricing", label: "Pricing or billing" },
  { value: "existing", label: "An existing enrolment" },
  { value: "teaching", label: "Teaching with Zidi" },
  { value: "safeguarding", label: "A safeguarding concern" },
  { value: "other", label: "Something else" },
];

export function ContactForm() {
  const params = useSearchParams();
  const topicParam = params.get("topic");
  const subjectParam = params.get("subject");
  const prefillTopic = contactTopics.some((t) => t.value === topicParam)
    ? topicParam!
    : "";
  const prefillSubject = subjects.find((s) => s.slug === subjectParam);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(prefillTopic);
  const [message, setMessage] = useState(
    prefillSubject
      ? `I'd like to know when ${prefillSubject.name} lessons become available.`
      : "",
  );
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [submitError, setSubmitError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const parsed = contactSchema.safeParse({ name, email, topic, message, company: "" });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setStatus("sending");
    setSubmitError("");

    const result = await postForm("/api/contact", { ...parsed.data, company });
    if (!result.ok) {
      setStatus("error");
      setSubmitError(result.error ?? "");
      if (result.fieldErrors) setErrors(result.fieldErrors);
      track("contact_failed", { topic });
      return;
    }

    setStatus("done");
    track("contact_submitted", { topic });
  }

  if (status === "done") {
    return (
      <FormCard>
        <SuccessPanel
          title="Message sent."
          footer={
            <ButtonLink href="/" variant="secondary">
              Back to the homepage
            </ButtonLink>
          }
        >
          <p>
            Thank you — we&rsquo;ve got it. We answer within a few hours during business
            hours, and by the next working day otherwise.
          </p>
          {topic === "safeguarding" && (
            <p className="rounded-md border border-clay bg-clay-50 p-4 text-ink">
              If a child is at immediate risk of harm, please contact your local
              emergency services or children&rsquo;s services now rather than waiting for
              our reply.
            </p>
          )}
        </SuccessPanel>
      </FormCard>
    );
  }

  return (
    <FormCard className="min-h-[46rem]">
      <form onSubmit={onSubmit} noValidate className="space-y-7">
        <Honeypot value={company} onChange={setCompany} />

        <Field label="Your name" error={errors.name}>
          {(p) => (
            <Input
              {...p}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              maxLength={80}
            />
          )}
        </Field>

        <Field label="Email address" error={errors.email}>
          {(p) => (
            <Input
              {...p}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={160}
            />
          )}
        </Field>

        <Field label="What's this about?" error={errors.topic}>
          {(p) => (
            <Select {...p} value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="">Choose a topic…</option>
              {contactTopics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
          )}
        </Field>

        <Field
          label="Your message"
          hint="A sentence or two is plenty. If it's about lessons, tell us the language and who's learning."
          error={errors.message}
        >
          {(p) => (
            <Textarea
              {...p}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              maxLength={2000}
            />
          )}
        </Field>

        {status === "error" && submitError && (
          <SubmitError message={submitError} onRetry={() => setStatus("idle")} />
        )}

        <div className="flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.875rem] text-ink-50">
            Or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-clay underline underline-offset-4"
            >
              {site.email}
            </a>
          </p>
          <Button
            type="submit"
            size="lg"
            loading={status === "sending"}
            disabled={status === "sending"}
            withArrow={status !== "sending"}
            className="w-full sm:w-auto"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>
        </div>
      </form>
    </FormCard>
  );
}
