"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  adultAgeBands,
  childAgeBands,
  days,
  goals,
  learnerTypes,
  lessonPreferences,
  levels,
  referralSources,
  timesOfDay,
  timezones,
} from "@/data/forms";
import { subjectChoices } from "@/data/subjects";
import { site } from "@/data/site";
import { matchEnquirySchema, fieldErrors } from "@/lib/validation";
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

const TOTAL = 8;
const STEP_LABELS = [
  "Who's learning",
  "Subject",
  "Level",
  "Goals",
  "Schedule",
  "Timezone",
  "Lesson type",
  "Your details",
];

interface Draft {
  /** Persisted so a reload resumes where you left off. Stripped by the schema. */
  step: number;
  learnerType: string;
  ageBand: string;
  subject: string;
  subjectOther: string;
  level: string;
  goals: string[];
  goalNote: string;
  days: string[];
  times: string[];
  timezone: string;
  lessonPreference: string;
  groupSize: string;
  learnerName: string;
  contactName: string;
  email: string;
  whatsapp: string;
  referral: string;
  notes: string;
  consent: boolean;
}

const EMPTY: Draft = {
  step: 1,
  learnerType: "",
  ageBand: "",
  subject: "",
  subjectOther: "",
  level: "",
  goals: [],
  goalNote: "",
  days: [],
  times: [],
  timezone: "",
  lessonPreference: "",
  groupSize: "",
  learnerName: "",
  contactName: "",
  email: "",
  whatsapp: "",
  referral: "",
  notes: "",
  consent: false,
};

/** Client-side gate for each step. The server re-validates everything. */
function validateStep(step: number, d: Draft): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 1) {
    if (!d.learnerType) e.learnerType = "Let us know who the lessons are for.";
    else if (!d.ageBand) e.ageBand = "Choose the learner's age range.";
  }
  if (step === 2) {
    if (!d.subject) e.subject = "Choose what you'd like to learn.";
    if (d.subject === "other" && d.subjectOther.trim().length < 2)
      e.subjectOther = "Tell us what you'd like to learn.";
  }
  if (step === 3 && !d.level) e.level = "Choose the level that fits best.";
  if (step === 4 && d.goals.length === 0)
    e.goals = "Pick at least one goal — it shapes the match.";
  if (step === 5) {
    if (d.days.length === 0) e.days = "Choose at least one day that works.";
    if (d.times.length === 0) e.times = "Choose at least one time of day.";
  }
  if (step === 6 && !d.timezone)
    e.timezone = "Choose your timezone so we schedule correctly.";
  if (step === 7) {
    if (!d.lessonPreference)
      e.lessonPreference = "Tell us whether you'd prefer private or group lessons.";
    if (d.lessonPreference === "group" && !d.groupSize)
      e.groupSize = "How many people are in your group?";
  }
  if (step === 8) {
    if (d.contactName.trim().length < 2) e.contactName = "Please add your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()))
      e.email = "That email address doesn't look right — check for a typo.";
    if (!d.consent)
      e.consent =
        "Please confirm this before sending so we know how to handle your details.";
  }
  return e;
}

function toPayload(d: Draft) {
  return {
    ...d,
    subjectOther: d.subjectOther || undefined,
    goalNote: d.goalNote || undefined,
    learnerName: d.learnerName || undefined,
    whatsapp: d.whatsapp || undefined,
    referral: d.referral || undefined,
    notes: d.notes || undefined,
    groupSize: d.groupSize ? Number(d.groupSize) : undefined,
    company: "",
  };
}

export function MatchForm() {
  const params = useSearchParams();
  const planParam = params.get("plan");
  const subjectParam = params.get("subject");

  const { value, update, clear, restored } = useDraft<Draft>("zidi:match", {
    ...EMPTY,
    ...(subjectParam ? { subject: subjectParam } : {}),
    ...(planParam?.startsWith("private")
      ? { lessonPreference: "private" }
      : planParam?.startsWith("group")
        ? { lessonPreference: "group" }
        : {}),
  });

  const step = value.step;
  const setStep = (next: number) => update({ step: next });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [submitError, setSubmitError] = useState("");
  const [company, setCompany] = useState("");
  const [started, setStarted] = useState(false);

  const isChild = value.learnerType === "child" || value.learnerType === "multiple";
  const ageBands = isChild ? [...childAgeBands, ...adultAgeBands] : adultAgeBands;

  function touch() {
    if (started) return;
    setStarted(true);
    track("match_started", { entry: planParam ?? subjectParam ?? "direct" });
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
      track("match_step_completed", { step, label: STEP_LABELS[step - 1] });
      setStep(step + 1);
      return;
    }

    const parsed = matchEnquirySchema.safeParse(toPayload({ ...value }));
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    setStatus("sending");
    setSubmitError("");
    const result = await postForm("/api/enquiry", { ...parsed.data, company });

    if (!result.ok) {
      setStatus("error");
      setSubmitError(result.error ?? "");
      if (result.fieldErrors) setErrors(result.fieldErrors);
      track("match_failed", { reason: result.error?.slice(0, 80) });
      return;
    }

    setStatus("done");
    clear();
    track("match_completed", {
      subject: value.subject,
      learner: value.learnerType,
      preference: value.lessonPreference,
    });
  }

  if (status === "done") {
    return (
      <FormCard>
        <SuccessPanel
          title="That's everything we need."
          footer={
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/how-it-works" variant="secondary">
                What happens next
              </ButtonLink>
              <ButtonLink href="/" variant="quiet">
                Back to the homepage
              </ButtonLink>
            </div>
          }
        >
          <p>
            A member of the team is reading your answers now. You&rsquo;ll hear from us
            within 24 hours by email — and on WhatsApp too if you left a number.
          </p>
          <p>
            We&rsquo;ll come back with a tutor we&rsquo;ve chosen for you, a suggested
            slot in your timezone, and anything we still need to know. Nothing is charged
            until you&rsquo;ve agreed a schedule.
          </p>
          <p className="text-[0.9375rem] text-ink-50">
            Need to add something? Reply to that email, or write to{" "}
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
    <FormCard className="min-h-[38rem]">
      <StepProgress current={step} total={TOTAL} label={STEP_LABELS[step - 1] ?? ""} />

      {restored && !started && (
        <p className="mt-5 rounded-md border border-line bg-sand/70 px-4 py-3 text-[0.875rem] text-ink-70">
          We&rsquo;ve brought back what you&rsquo;d already filled in — pick up where you left off.
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-8" onChange={touch}>
        <Honeypot value={company} onChange={setCompany} />

        {step === 1 && (
          <Step step={1} title="Who are you learning for?">
            <FieldGroup legend="Learner" error={errors.learnerType}>
              <RadioTiles
                name="learnerType"
                options={learnerTypes}
                value={value.learnerType}
                onChange={(v) => update({ learnerType: v, ageBand: "" })}
              />
            </FieldGroup>

            {value.learnerType && (
              <FieldGroup
                legend={
                  value.learnerType === "multiple"
                    ? "How old is the youngest learner?"
                    : "How old is the learner?"
                }
                hint="It tells us which tutors to look at — sessions are pitched to age."
                error={errors.ageBand}
              >
                <ChipGroup
                  options={ageBands.map((b) => ({ value: b, label: b }))}
                  values={value.ageBand ? [value.ageBand] : []}
                  onChange={(v) => update({ ageBand: v[v.length - 1] ?? "" })}
                />
              </FieldGroup>
            )}
          </Step>
        )}

        {step === 2 && (
          <Step step={2} title="What would you like to learn?">
            <FieldGroup legend="Subject" error={errors.subject}>
              <RadioTiles
                name="subject"
                options={subjectChoices.map((c) => ({
                  ...c,
                  hint:
                    c.value === "other"
                      ? "Hausa, French, chess, cooking, another language…"
                      : undefined,
                }))}
                value={value.subject}
                onChange={(v) => update({ subject: v })}
                columns={2}
              />
            </FieldGroup>

            {value.subject === "other" && (
              <Field label="What would you like to learn?" error={errors.subjectOther}>
                {(p) => (
                  <Input
                    {...p}
                    value={value.subjectOther}
                    onChange={(e) => update({ subjectOther: e.target.value })}
                    placeholder="e.g. Hausa, Twi, piano"
                    maxLength={80}
                  />
                )}
              </Field>
            )}
          </Step>
        )}

        {step === 3 && (
          <Step
            step={3}
            title="What's the current level?"
            hint="An honest answer here saves a session of guesswork later. Nobody minds a beginner."
          >
            <FieldGroup legend="Current level" error={errors.level}>
              <RadioTiles
                name="level"
                options={levels}
                value={value.level}
                onChange={(v) => update({ level: v })}
                columns={2}
              />
            </FieldGroup>
          </Step>
        )}

        {step === 4 && (
          <Step
            step={4}
            title="What are you hoping for?"
            hint="Choose as many as apply. This is the part tutors care about most."
          >
            <FieldGroup legend="Goals" error={errors.goals}>
              <CheckboxTiles
                options={goals}
                values={value.goals}
                onChange={(v) => update({ goals: v })}
                columns={2}
              />
            </FieldGroup>

            <Field
              label="Anything more you'd like your tutor to know?"
              optional
              hint="A trip in March, a grandparent to talk to, an exam — whatever the real reason is."
            >
              {(p) => (
                <Textarea
                  {...p}
                  value={value.goalNote}
                  onChange={(e) => update({ goalNote: e.target.value })}
                  maxLength={500}
                  rows={4}
                />
              )}
            </Field>
          </Step>
        )}

        {step === 5 && (
          <Step step={5} title="When are you free?">
            <FieldGroup
              legend="Days that work"
              hint="Select all that could work — more options means a better match."
              error={errors.days}
            >
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
          </Step>
        )}

        {step === 6 && (
          <Step
            step={6}
            title="Which timezone are you in?"
            hint="We schedule in your local time, then work backwards to find a tutor who can meet it."
          >
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

        {step === 7 && (
          <Step step={7} title="Private or group?">
            <FieldGroup legend="Lesson type" error={errors.lessonPreference}>
              <RadioTiles
                name="lessonPreference"
                options={lessonPreferences}
                value={value.lessonPreference}
                onChange={(v) => update({ lessonPreference: v })}
              />
            </FieldGroup>

            {value.lessonPreference === "group" && (
              <FieldGroup
                legend="How many people in your group?"
                hint="Groups are 2–4 people who already know each other. Pricing is per person."
                error={errors.groupSize}
              >
                <ChipGroup
                  options={[
                    { value: "2", label: "2 people" },
                    { value: "3", label: "3 people" },
                    { value: "4", label: "4 people" },
                  ]}
                  values={value.groupSize ? [value.groupSize] : []}
                  onChange={(v) => update({ groupSize: v[v.length - 1] ?? "" })}
                />
              </FieldGroup>
            )}
          </Step>
        )}

        {step === 8 && (
          <Step step={8} title="How do we reach you?">
            <Field
              label={isChild ? "Parent or guardian's full name" : "Your full name"}
              error={errors.contactName}
            >
              {(p) => (
                <Input
                  {...p}
                  value={value.contactName}
                  onChange={(e) => update({ contactName: e.target.value })}
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

            <Field
              label="WhatsApp number"
              optional
              hint="Most families find this the quickest way to hear back."
              error={errors.whatsapp}
            >
              {(p) => (
                <Input
                  {...p}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={value.whatsapp}
                  onChange={(e) => update({ whatsapp: e.target.value })}
                  placeholder="+44 7700 900123"
                  maxLength={32}
                />
              )}
            </Field>

            <Field
              label={isChild ? "Learner's first name" : "Preferred first name"}
              optional
              hint="First name only — we never need a surname for a learner."
            >
              {(p) => (
                <Input
                  {...p}
                  value={value.learnerName}
                  onChange={(e) => update({ learnerName: e.target.value })}
                  maxLength={40}
                />
              )}
            </Field>

            <Field label="How did you hear about Zidi?" optional>
              {(p) => (
                <Select
                  {...p}
                  value={value.referral}
                  onChange={(e) => update({ referral: e.target.value })}
                >
                  <option value="">Prefer not to say</option>
                  {referralSources.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </Select>
              )}
            </Field>

            <Checkbox
              checked={value.consent}
              onChange={(v) => update({ consent: v })}
              error={errors.consent}
            >
              {isChild
                ? "I'm the parent or guardian of this learner, and I'm happy for Zidi to use these details to find a tutor and get in touch."
                : "I'm happy for Zidi to use these details to find a tutor and get in touch."}{" "}
              <Link
                href="/legal/privacy"
                className="text-clay underline underline-offset-4"
              >
                How we handle your data
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
          submitLabel="Find my tutor"
        />
      </form>
    </FormCard>
  );
}
