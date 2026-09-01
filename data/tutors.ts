/**
 * ─────────────────────────────────────────────────────────────────────────────
 * INTENTIONALLY EMPTY.
 *
 * These are real people, so this file ships empty rather than with invented
 * names and biographies. Add a tutor here — with their written permission —
 * and the "Meet the people behind the lessons" roster renders on the homepage
 * and on /about automatically.
 *
 * Until then those pages show `tutorStandards` below, which describes the
 * vetting the business actually performs.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { StaticImageData } from "next/image";

export interface Tutor {
  id: string;
  /** First name, or first name and initial. Full names are rarely necessary. */
  name: string;
  /** Subject slugs this tutor teaches. */
  subjects: string[];
  /** Where they teach from, e.g. "Ibadan, Nigeria". */
  based: string;
  /** e.g. "6 years teaching". Keep it verifiable. */
  experience: string;
  /** Two or three sentences, in their own voice. */
  story: string;
  ageGroups: string[];
  photo?: StaticImageData;
  photoAlt?: string;
}

export const tutors: Tutor[] = [];

/*
Example:

import adenikePhoto from "@/assets/images/tutors/adenike.jpg";

export const tutors: Tutor[] = [
  {
    id: "adenike",
    name: "Adénìké",
    subjects: ["yoruba"],
    based: "Ibadan, Nigeria",
    experience: "8 years teaching",
    story:
      "I taught secondary school Yorùbá for six years before I started teaching online. Most of my learners are children in the UK whose parents want them to be able to speak to their grandparents.",
    ageGroups: ["Children", "Teens"],
    photo: adenikePhoto,
    photoAlt: "Adénìké, a Yorùbá tutor, smiling to camera",
  },
];
*/

/** What every tutor goes through before they meet a learner. All verifiable. */
export const tutorStandards = [
  {
    step: "Application",
    detail:
      "Subjects, experience, the age groups they are comfortable with, their rate expectation and their real availability. We read every one.",
  },
  {
    step: "Interview",
    detail:
      "If the application fits, we schedule a call within 48 hours. We are looking for people who can teach, not only people who can speak.",
  },
  {
    step: "Sample lesson",
    detail:
      "A short teaching demonstration. It tells us more about how someone handles a nervous beginner than any CV does.",
  },
  {
    step: "Background checks",
    detail:
      "Anyone teaching under-18s completes an enhanced DBS check — or the equivalent where they live — and gives two references, one speaking to their suitability to work with children.",
  },
  {
    step: "Safeguarding and standards",
    detail:
      "A safeguarding awareness review, and written agreement to our Child Safety and Fair Play policies, before a first session is scheduled.",
  },
];
