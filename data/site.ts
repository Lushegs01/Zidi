/**
 * Single source of truth for business facts. Everything the site says about
 * Zidi — contact routes, guarantees, coverage — is read from here.
 */
export const site = {
  name: "Learn with Zidi",
  shortName: "Zidi",
  /** Update to the production domain before launch; drives canonicals + sitemap. */
  url: "https://learnwithzidi.com",
  tagline: "Learn the language. Keep the connection.",
  description:
    "Live 1:1 and small-group lessons in Yorùbá, Igbo and more. Tell us who's learning and we match you with a vetted tutor within 24 hours.",
  email: "hello@zeedeelearn.com",
  /** Digits only, E.164 without the plus — used to build wa.me links. */
  whatsapp: "",
  locale: "en_GB",
  founded: "2024",
  jurisdiction: "England and Wales",
  social: [
    { name: "Instagram", href: "https://instagram.com/learnwithzidi" },
    { name: "Facebook", href: "https://facebook.com/learnwithzidi" },
    { name: "TikTok", href: "https://tiktok.com/@learnwithzidi" },
  ],
} as const;

/** Verifiable commitments. These are promises the business already makes. */
export const promises = [
  {
    stat: "24 hours",
    label: "to your match",
    detail:
      "Send us your details and a member of the team comes back within a day with a tutor chosen for you — not an algorithm's shortlist.",
  },
  {
    stat: "Two sessions",
    label: "to change your mind",
    detail:
      "If the fit is not right after your first or second lesson, tell us and we rematch you at no extra cost. No awkward conversation required.",
  },
  {
    stat: "DBS checked",
    label: "for every child's tutor",
    detail:
      "Enhanced DBS check or the equivalent abroad, plus two references, before a tutor's first session with anyone under 18.",
  },
  {
    stat: "8 timezones",
    label: "already covered",
    detail:
      "Lagos to London to Los Angeles. Lessons are scheduled around your week, not the other way round.",
  },
] as const;

export const trustSignals = [
  "Hand-matched by a person",
  "Live 1:1 and small group",
  "Vetted, DBS-checked tutors",
  "Sessions in your timezone",
  "Built for families and adults",
  "Cancel with 30 days' notice",
] as const;
