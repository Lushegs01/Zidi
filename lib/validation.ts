import { z } from "zod";

/**
 * One schema per form, used by the browser for inline validation and again on
 * the server, which never trusts the client's word for it.
 *
 * Data minimisation is deliberate: because learners may be children we ask for
 * a preferred first name at most, never a surname, date of birth or address.
 */

const trimmed = (max: number) => z.string().trim().max(max);

const email = z
  .string()
  .trim()
  .min(1, "Please add an email address so we can reply.")
  .max(160)
  .pipe(z.email("That email address doesn't look right — check for a typo."));

const phone = trimmed(32)
  .refine((v) => v === "" || /^[+()\d\s.-]{6,32}$/.test(v), {
    message: "Use digits, spaces and + only, e.g. +44 7700 900123.",
  })
  .optional();

/** Bots fill hidden fields; people do not. Must be empty. */
const honeypot = z.string().max(0).optional();

const nonEmptyList = (message: string) => z.array(z.string().min(1)).min(1, message).max(12);

export const matchEnquirySchema = z
  .object({
    learnerType: z.enum(["child", "self", "multiple"], {
      error: "Let us know who the lessons are for.",
    }),
    subject: z.string().min(1, "Choose what you'd like to learn."),
    subjectOther: trimmed(80).optional(),
    level: z.enum(["beginner", "some", "conversational", "advanced", "unsure"], {
      error: "Choose the level that fits best.",
    }),
    goals: nonEmptyList("Pick at least one goal — it shapes the match."),
    goalNote: trimmed(500).optional(),
    learnerName: trimmed(40).optional(),
    ageBand: z.string().min(1, "Choose an age range."),
    days: nonEmptyList("Choose at least one day that works."),
    times: nonEmptyList("Choose at least one time of day."),
    timezone: z.string().min(1, "Choose your timezone so we schedule correctly."),
    lessonPreference: z.enum(["private", "group", "either"], {
      error: "Tell us whether you'd prefer private or group lessons.",
    }),
    groupSize: z.coerce.number().int().min(2).max(4).optional(),
    contactName: trimmed(80).min(2, "Please add your full name."),
    email,
    whatsapp: phone,
    referral: trimmed(40).optional(),
    notes: trimmed(1000).optional(),
    consent: z.literal(true, {
      error: "Please confirm this before sending so we know how to handle your details.",
    }),
    company: honeypot,
  })
  .refine((d) => d.subject !== "other" || (d.subjectOther?.length ?? 0) > 1, {
    message: "Tell us what you'd like to learn.",
    path: ["subjectOther"],
  })
  .refine((d) => d.lessonPreference !== "group" || d.groupSize !== undefined, {
    message: "How many people are in your group?",
    path: ["groupSize"],
  });

export type MatchEnquiry = z.infer<typeof matchEnquirySchema>;

export const tutorApplicationSchema = z
  .object({
    subjects: nonEmptyList("Choose at least one subject you can teach."),
    subjectOther: trimmed(120).optional(),
    experience: z.enum(["starting", "1-3", "3-plus"], {
      error: "Tell us roughly how long you've been teaching.",
    }),
    bio: trimmed(1200).optional(),
    ageGroups: nonEmptyList("Choose the age groups you're comfortable teaching."),
    rate: trimmed(60).optional(),
    days: nonEmptyList("Choose the days you're available."),
    times: nonEmptyList("Choose the times of day you're available."),
    timezone: z.string().min(1, "Choose your timezone."),
    fullName: trimmed(80).min(2, "Please add your full name."),
    email,
    whatsapp: phone,
    notes: trimmed(1000).optional(),
    consent: z.literal(true, {
      error:
        "Please confirm you're willing to complete our checks before teaching under-18s.",
    }),
    company: honeypot,
  })
  .refine((d) => !d.subjects.includes("other") || (d.subjectOther?.length ?? 0) > 1, {
    message: "Tell us what else you teach.",
    path: ["subjectOther"],
  });

export type TutorApplication = z.infer<typeof tutorApplicationSchema>;

export const contactSchema = z.object({
  name: trimmed(80).min(2, "Please add your name."),
  email,
  topic: z.string().min(1, "Choose what this is about."),
  message: trimmed(2000).min(10, "A sentence or two is plenty — just tell us what you need."),
  company: honeypot,
});

export type ContactMessage = z.infer<typeof contactSchema>;

/** Flatten a ZodError into `{ fieldName: firstMessage }` for the form UI. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key !== "string" || out[key]) continue;
    out[key] = issue.message;
  }
  return out;
}
