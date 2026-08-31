"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ageGroupsTaught,
  days,
  teachingExperience,
  timesOfDay,
  timezones,
} from "@/data/forms";
import { availableSubjects } from "@/data/subjects";
import { site } from "@/data/site";
import { fieldErrors, tutorApplicationSchema } from "@/lib/validation";
import { useDraft } from "@/lib/use-draft";
import { postForm } from "@/lib/submit";
import { track } from "@/lib/analytics";
import {
  Checkbox,
  CheckboxTiles,
  ChipGroup,
  Field,
  FieldGroup,
  Honeypot,
  Input,
  RadioTiles,
  Select,
  Textarea,
} from "@/components/ui/field";
import { ButtonLink } from "@/components/ui/button";
import {
  FormCard,
  Step,
  StepNav,
  StepProgress,
  SubmitError,
  SuccessPanel,
  ValidationSummary,
} from "./form-shell";

const TOTAL = 5;
const STEP_LABELS = ["Subjects", "Experience", "Learners", "Availability", "Your details"];

interface Draft {
  /** Persisted so a reload resumes where you left off. Stripped by the schema. */
  step: number;
  subjects: string[];
  subjectOther: string;
  experience: string;
  bio: string;
  ageGroups: string[];
  rate: string;
  days: string[];
  times: string[];
  timezone: string;
  fullName: string;
  email: string;
  whatsapp: string;
  notes: string;
  consent: boolean;
}

const EMPTY: Draft = {
  step: 1,
  subjects: [],
  subjectOther: "",
  experience: "",
  bio: "",
  ageGroups: [],
  rate: "",
  days: [],
  times: [],
  timezone: "",
  fullName: "",
  email: "",
  whatsapp: "",
  notes: "",
  consent: false,
};

const subjectOptions = [
  ...availableSubjects.map((s) => ({ value: s.slug, label: s.nativeName ?? s.name })),
  { value: "other", label: "Something else", hint: "Hausa, French, chess, piano, cooking…" },
];

function validateStep(step: number, d: Draft): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 1) {
    if (d.subjects.length === 0) e.subjects = "Choose at least one subject you can teach.";
    if (d.subjects.includes("other") && d.subjectOther.trim().length < 2)
      e.subjectOther = "Tell us what else you teach.";
  }
  if (step === 2 && !d.experience)
    e.experience = "Tell us roughly how long you've been teaching.";
  if (step === 3 && d.ageGroups.length === 0)
    e.ageGroups = "Choose the age groups you're comfortable teaching.";
  if (step === 4) {
    if (d.days.length === 0) e.days = "Choose the days you're available.";
    if (d.times.length === 0) e.times = "Choose the times of day you're available.";
    if (!d.timezone) e.timezone = "Choose your timezone.";
  }
  if (step === 5) {
    if (d.fullName.trim().length < 2) e.fullName = "Please add your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()))
      e.email = "That email address doesn't look right — check for a typo.";
    if (!d.consent)
      e.consent =
        "Please confirm you're willing to complete our checks before teaching under-18s.";
  }
  return e;
}

export function TutorForm() {
  const { value, update, clear, restored } = useDraft<Draft>("zidi:tutor", EMPTY);
  const step = value.step;
  const setStep = (next: number) => update({ step: next });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [submitError, setSubmitError] = useState("");
  const [company, setCompany] = useState("");
  const [started, setStarted] = useState(false);

  function touch() {
    if (started) return;
    setStarted(true);
    track("tutor_application_started");
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    touch();

    const stepErrors = validateStep(step, value);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});

    if (step < TOTAL) {
      setStep(step + 1);
      return;
    }

    const parsed = tutorApplicationSchema.safeParse({
      ...value,
      subjectOther: value.subjectOther || undefined,
      bio: value.bio || undefined,
      rate: value.rate || undefined,
      whatsapp: value.whatsapp || undefined,
      notes: value.notes || undefined,
      company: "",
    });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    setStatus("sending");
    setSubmitError("");
    const result = await postForm("/api/tutor-application", { ...parsed.data, company });

    if (!result.ok) {
      setStatus("error");
      setSubmitError(result.error ?? "");
      if (result.fieldErrors) setErrors(result.fieldErrors);
      track("tutor_application_failed", { reason: result.error?.slice(0, 80) });
      return;
    }

    setStatus("done");
    clear();
    track("tutor_application_completed", { subjects: value.subjects.join(",") });
  }

  if (status === "done") {
    return (
      <FormCard>
        <SuccessPanel
          title="Application received."
          footer={
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/about" variant="secondary">
                More about Zidi
              </ButtonLink>
              <ButtonLink href="/" variant="quiet">
                Back to the homepage
              </ButtonLink>
            </div>
          }
        >
          <p>
            We read every application ourselves. You&rsquo;ll hear from us within 48
            hours either way — a yes, a no, or a question.
          </p>
          <p>
            If it looks like a fit, we&rsquo;ll book a short call and ask you to teach us
            a 15-minute sample lesson. If you&rsquo;ll be working with anyone under 18,
            we&rsquo;ll also start the DBS check and ask for two references at that point.
          </p>
          <p className="text-[0.9375rem] text-ink-50">
            Anything to add in the meantime? Write to{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-clay underline underline-offset-4"
            >
              {site.email}
            </a>
            .
          </p>
        </SuccessPanel>
      </FormCard>
    );
  }

  return (
    <FormCard>
      <StepProgress current={step} total={TOTAL} label={STEP_LABELS[step - 1] ?? ""} />

      {restored && !started && (
        <p className="mt-5 rounded-md border border-line bg-sand/70 px-4 py-3 text-[0.875rem] text-ink-70">
          We&rsquo;ve brought back what you&rsquo;d already filled in — pick up where you left off.
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-8" onChange={touch}>
        <Honeypot value={company} onChange={setCompany} />

        {step === 1 && (
          <Step step={1} title="What do you teach?" hint="Choose everything you could teach today.">
            <FieldGroup legend="Subjects" error={errors.subjects}>
              <CheckboxTiles
                options={subjectOptions}
                values={value.subjects}
                onChange={(v) => update({ subjects: v })}
                columns={2}
              />
            </FieldGroup>

            {value.subjects.includes("other") && (
              <Field label="What else do you teach?" error={errors.subjectOther}>
                {(p) => (
                  <Input
                    {...p}
                    value={value.subjectOther}
                    onChange={(e) => update({ subjectOther: e.target.value })}
                    placeholder="e.g. Hausa, chess, piano"
                    maxLength={120}
                  />
                )}
              </Field>
            )}
          </Step>
        )}

        {step === 2 && (
          <Step step={2} title="Tell us about your teaching.">
            <FieldGroup legend="How long have you been teaching?" error={errors.experience}>
              <RadioTiles
                name="experience"
                options={teachingExperience}
                value={value.experience}
                onChange={(v) => update({ experience: v })}
              />
            </FieldGroup>

            <Field
              label="A short introduction"
              optional
              hint="Where you're from, how you teach, and who you're best with. A few sentences is plenty — this is what we read first."
            >
              {(p) => (
                <Textarea
                  {...p}
                  value={value.bio}
                  onChange={(e) => update({ bio: e.target.value })}
                  rows={6}
                  maxLength={1200}
                />
              )}
            </Field>
          </Step>
        )}

        {step === 3 && (
          <Step step={3} title="Who are you comfortable teaching?">
            <FieldGroup legend="Age groups" error={errors.ageGroups}>
              <CheckboxTiles
                options={ageGroupsTaught}
                values={value.ageGroups}
                onChange={(v) => update({ ageGroups: v })}
                columns={3}
              />
            </FieldGroup>

            <Field
              label="Your hourly rate expectation"
              optional
              hint="Any currency. It helps us match you to the right plans — we'll discuss it properly on the call."
            >
              {(p) => (
                <Input
                  {...p}
                  value={value.rate}
                  onChange={(e) => update({ rate: e.target.value })}
                  placeholder="e.g. £18/hour or ₦12,000/hour"
                  maxLength={60}
                />
              )}
            </Field>
          </Step>
        )}

        {step === 4 && (
          <Step step={4} title="When can you teach?">
            <FieldGroup legend="Available days" error={errors.days}>
              <ChipGroup
                options={days}
                values={value.days}
                onChange={(v) => update({ days: v })}
              />
            </FieldGroup>

            <FieldGroup legend="Time of day" error={errors.times}>
              <CheckboxTiles
                options={timesOfDay}
                values={value.times}
                onChange={(v) => update({ times: v })}
                columns={3}
              />
            </FieldGroup>

            <Field label="Your timezone" error={errors.timezone}>
              {(p) => (
                <Select
                  {...p}
                  value={value.timezone}
                  onChange={(e) => update({ timezone: e.target.value })}
                >
                  <option value="">Choose a timezone…</option>
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
          </Step>
        )}

        {step === 5 && (
          <Step step={5} title="How do we reach you?">
            <Field label="Full name" error={errors.fullName}>
              {(p) => (
                <Input
                  {...p}
                  value={value.fullName}
                  onChange={(e) => update({ fullName: e.target.value })}
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
                  value={value.email}
                  onChange={(e) => update({ email: e.target.value })}
                  maxLength={160}
                />
              )}
            </Field>

            <Field label="WhatsApp number" optional error={errors.whatsapp}>
              {(p) => (
                <Input
                  {...p}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={value.whatsapp}
                  onChange={(e) => update({ whatsapp: e.target.value })}
                  placeholder="+234 800 000 0000"
                  maxLength={32}
                />
              )}
            </Field>

            <Field label="Anything else we should know?" optional>
              {(p) => (
                <Textarea
                  {...p}
                  value={value.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                  rows={4}
                  maxLength={1000}
                />
              )}
            </Field>

            <Checkbox
              checked={value.consent}
              onChange={(v) => update({ consent: v })}
              error={errors.consent}
            >
              I understand that teaching anyone under 18 requires an enhanced DBS check
              (or the equivalent where I live) and two references, and I&rsquo;m willing
              to complete both. I&rsquo;ve read the{" "}
              <Link
                href="/legal/child-safety"
                className="text-clay underline underline-offset-4"
              >
                Child Safety Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/fair-play"
                className="text-clay underline underline-offset-4"
              >
                Fair Play Policy
              </Link>
              .
            </Checkbox>
          </Step>
        )}

        <ValidationSummary count={Object.keys(errors).length} />

        {status === "error" && submitError && (
          <SubmitError message={submitError} onRetry={() => setStatus("idle")} />
        )}

        <StepNav
          onBack={() => {
            setErrors({});
            setStatus("idle");
            setStep(Math.max(1, step - 1));
          }}
          canGoBack={step > 1}
          submitting={status === "sending"}
          isLast={step === TOTAL}
          submitLabel="Apply to teach"
        />
      </form>
    </FormCard>
  );
}
