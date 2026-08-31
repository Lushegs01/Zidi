/**
 * ─────────────────────────────────────────────────────────────────────────────
 * INTENTIONALLY EMPTY.
 *
 * No testimonial on this site is invented. Add real, permissioned quotes here
 * and the testimonials section appears on the homepage and on /families
 * automatically — no component changes required. Until then those pages show
 * the commitments in `data/site.ts`, which are things the business can stand
 * behind today.
 *
 * Ask each contributor for written permission to use their words, first name,
 * city and photo. `photo` is optional; without one the card falls back to a
 * typeset monogram, which still looks intentional.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { StaticImageData } from "next/image";

export type SpeakerRole = "parent" | "adult-learner" | "tutor";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** City and country, e.g. "London, UK". */
  location: string;
  role: SpeakerRole;
  /** Subject slug, e.g. "yoruba". */
  subject?: string;
  /** Optional supporting line, e.g. "Parent of two, learning since 2024". */
  context?: string;
  photo?: StaticImageData;
}

export const testimonials: Testimonial[] = [];

/*
Example of the shape once you have a real quote:

import ngoziPhoto from "@/assets/images/testimonials/ngozi.jpg";

export const testimonials: Testimonial[] = [
  {
    id: "ngozi-l",
    quote:
      "My daughter greeted my mother in Igbo on the phone last week and my mother cried.",
    name: "Ngozi",
    location: "Manchester, UK",
    role: "parent",
    subject: "igbo",
    context: "Parent of two, lessons twice a week",
    photo: ngoziPhoto,
  },
];
*/

export const testimonialsByRole = (role: SpeakerRole) =>
  testimonials.filter((t) => t.role === role);
