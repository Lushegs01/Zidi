export interface Faq {
  q: string;
  /** Plain text. Rendered as a paragraph; keep it to a few sentences. */
  a: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: Faq[];
}

/** Answers here are the business's actual policies — keep them in step with /legal. */
export const faqGroups: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        q: "How does tutor matching work?",
        a: "You tell us the subject, the learner's level and age, your goals, your availability and your timezone. A member of our team then hand-picks a tutor from our vetted pool who fits. We do not use an algorithm — every match is made by a person.",
      },
      {
        q: "How quickly will I be matched?",
        a: "You will hear back from us within 24 hours of sending your details. If we need anything else to make a good match, that first message is where we ask.",
      },
      {
        q: "What languages and subjects are available right now?",
        a: "Yorùbá and Igbo are available now. Hausa, French, chess, piano and African cooking are on the way. If you need something we have not listed, tell us anyway — we will do our best to find the right tutor.",
      },
      {
        q: "Which countries can I join from?",
        a: "Anywhere with a stable internet connection. We already schedule across eight timezones, from West Africa Time through UK, Central European and all four North American zones. Tell us yours and we schedule around it.",
      },
      {
        q: "Can children take lessons?",
        a: "Yes. We teach children from age 5, teenagers, and adults. Sessions are pitched to the learner's age, and every tutor working with anyone under 18 is DBS checked.",
      },
    ],
  },
  {
    id: "lessons",
    title: "Lessons and scheduling",
    items: [
      {
        q: "How long is a session?",
        a: "One hour. That leaves room for a warm-up, focused work and a short review without rushing the end.",
      },
      {
        q: "Where do lessons happen?",
        a: "On Zoom or Google Meet. Both are free for you to use and you do not need an account — your tutor sends a link before each session. We do not host lessons on our own platform.",
      },
      {
        q: "Do you offer private and group lessons?",
        a: "Both. Private lessons are one-to-one with your own tutor. Group lessons are for 2 to 4 people who already know each other — siblings, cousins, friends — and are priced per person. You bring the group; we do not place strangers together.",
      },
      {
        q: "Can I sit in on my child's sessions?",
        a: "Absolutely, and for younger children we encourage it. Many parents check in for the first few minutes and then step back so the child can build a rapport with their tutor.",
      },
      {
        q: "What if a session has to be cancelled?",
        a: "If your tutor cancels, we reschedule at no cost or credit the session to your next invoice. If you need to cancel, please give your tutor at least 24 hours' notice. More than two no-shows in a billing period may mean those sessions are forfeited.",
      },
    ],
  },
  {
    id: "tutors-safety",
    title: "Tutors and safety",
    items: [
      {
        q: "How are tutors vetted?",
        a: "Every tutor is interviewed by us and delivers a short sample lesson before joining the pool. Anyone teaching a learner under 18 must also complete an enhanced DBS check — or the equivalent in their country of residence — and provide two references, at least one speaking to their suitability to work with children.",
      },
      {
        q: "What if the tutor is not a good fit?",
        a: "Tell us within your first two sessions and we rematch you with a different tutor at no extra cost. You do not need to have an awkward conversation with anyone — email us and we handle it.",
      },
      {
        q: "Is my child safe in online sessions?",
        a: "Sessions are video-only on Zoom or Google Meet, in a visible and appropriate setting. Tutors may not record a session without written consent from a parent or guardian, and must not move a child into private chat outside the agreed platform. We have a designated safeguarding lead and full details are in our Child Safety Policy.",
      },
      {
        q: "Do tutors work for Zidi?",
        a: "Tutors are independent professionals, not employees. We vet them, match them, coordinate scheduling and stay involved throughout — but the teaching relationship is with your tutor.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment and commitment",
    items: [
      {
        q: "How does payment work?",
        a: "We email a monthly invoice at the start of each billing period, paid in advance by bank transfer. You can pay in naira, pounds, US dollars or Canadian dollars. We do not accept card payment yet.",
      },
      {
        q: "What is the minimum commitment?",
        a: "We bill monthly and you can cancel any time with 30 days' notice — there is no fixed-term contract. Consistency is what makes the difference, so we would encourage you to give it at least eight weeks before drawing conclusions.",
      },
      {
        q: "Can I get a refund?",
        a: "If you decide not to continue after your first or second session, contact us within 7 days and we refund the unused sessions in that billing period minus a £10 / ₦10,000 admin fee. After two sessions the current period is non-refundable, and you can stop future periods with 30 days' notice.",
      },
      {
        q: "Is there a free trial?",
        a: "No — we would rather be straight about that than dress up a sales call as a lesson. What we offer instead is a free rematch within your first two sessions if the tutor is not right.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.items);

/** A short set for the homepage. The full list lives on /faqs. */
export const homeFaqs: Faq[] = [
  allFaqs[0]!,
  allFaqs[1]!,
  faqGroups[1]!.items[0]!,
  faqGroups[1]!.items[2]!,
  faqGroups[2]!.items[0]!,
  faqGroups[3]!.items[0]!,
];
