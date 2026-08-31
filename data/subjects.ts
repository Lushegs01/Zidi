import type { StaticImageData } from "next/image";
import yorubaImage from "@/assets/images/yoruba.jpg";
import igboImage from "@/assets/images/igbo.jpg";

export type SubjectStatus = "available" | "coming-soon";
export type SubjectKind = "language" | "skill";

export interface Subject {
  slug: string;
  /** Name as used in running copy and nav. */
  name: string;
  /** Written with its own diacritics where the brand uses them. */
  nativeName?: string;
  kind: SubjectKind;
  status: SubjectStatus;
  /** One line, sentence case, shown on the discovery card. */
  tagline: string;
  /** Two sentences of context. Factual — no learning-outcome claims. */
  blurb: string;
  image?: StaticImageData;
  imageAlt?: string;
  /** Only present for subjects with a dedicated page. */
  page?: {
    eyebrow: string;
    heading: string;
    intro: string;
    context: string[];
    /** What lessons typically cover. Framed as "usually", never as a guarantee. */
    lessons: { title: string; detail: string }[];
    audiences: { title: string; detail: string }[];
    seoTitle: string;
    seoDescription: string;
  };
}

/**
 * Adding a subject is a data change, nothing more. Give it `status: "available"`
 * plus a `page` block and it gains a route, a sitemap entry, a discovery card,
 * and an option in the matching form automatically.
 */
export const subjects: Subject[] = [
  {
    slug: "yoruba",
    name: "Yoruba",
    nativeName: "Yorùbá",
    kind: "language",
    status: "available",
    tagline: "Speak with confidence.",
    blurb:
      "One of the most widely spoken languages in Africa, with over 45 million native speakers across Nigeria, Benin and Togo — and a diaspora that reaches every continent.",
    image: yorubaImage,
    imageAlt:
      "A woman in a brightly patterned headwrap laughing, photographed in profile",
    page: {
      eyebrow: "Available now",
      heading: "Yorùbá, taught by people who grew up in it",
      intro:
        "Whether your child is starting from nothing or you are picking back up a language you half-remember, we match you with a tutor who teaches at your pace and in your accent.",
      context: [
        "Yorùbá is spoken by more than 45 million people as a first language, principally in southwestern Nigeria and in Benin and Togo, with large communities in the UK, the US, Canada and across Europe.",
        "It is a tonal language written with the Latin alphabet plus sub-dots and tone marks — so ọmọ, òmò and omo are three different words. Tutors start you on the sounds early, because getting tone right is what makes you understood at home.",
      ],
      lessons: [
        {
          title: "Sounds and tone first",
          detail:
            "The three tones and the vowels that do not exist in English. Most tutors spend the early sessions here so nothing later has to be unlearned.",
        },
        {
          title: "Greetings that actually get used",
          detail:
            "Ẹ kú àárọ̀, ẹ kú alẹ́, and the register shifts that show respect to an elder — the part of the language family notice first.",
        },
        {
          title: "Everyday conversation",
          detail:
            "Food, family, prices, directions, phone calls. Vocabulary chosen around where you will actually use it.",
        },
        {
          title: "Reading and writing",
          detail:
            "Diacritics, spelling and reading aloud, for learners who want to write as well as speak.",
        },
      ],
      audiences: [
        {
          title: "Children aged 5–12",
          detail:
            "Short, playful sessions built on repetition, songs and naming games. Parents are welcome to sit in.",
        },
        {
          title: "Teens aged 13–17",
          detail:
            "Conversation-led, with room for the culture and music they already care about.",
        },
        {
          title: "Adults",
          detail:
            "Heritage learners reconnecting, partners marrying into a Yorùbá family, and complete beginners preparing to travel.",
        },
      ],
      seoTitle: "Learn Yoruba online with a tutor",
      seoDescription:
        "Online Yoruba lessons with vetted, hand-matched tutors. Live 1:1 and small group classes for children, teens and adults. Matched within 24 hours.",
    },
  },
  {
    slug: "igbo",
    name: "Igbo",
    nativeName: "Ìgbò",
    kind: "language",
    status: "available",
    tagline: "Learn, understand and connect.",
    blurb:
      "One of Nigeria's major languages, spoken across the southeast and carried by one of the most widely travelled diasporas in the world.",
    image: igboImage,
    imageAlt: "A young woman with braided hair smiling warmly to camera",
    page: {
      eyebrow: "Available now",
      heading: "Ìgbò, from first greeting to real conversation",
      intro:
        "Lessons shaped around why you are learning — a grandmother you want to talk to, a child you want to raise in the language, a trip home you want to arrive ready for.",
      context: [
        "Igbo is spoken across southeastern Nigeria and by Igbo communities worldwide. Standard Igbo is what most tutors teach, and many can also work in the dialect your family speaks — tell us which and we will factor it into the match.",
        "Like Yorùbá it is tonal and uses sub-dotted vowels, so early work on sound and tone pays off quickly. Tutors adapt to whether you want to speak, read, or both.",
      ],
      lessons: [
        {
          title: "Tone and pronunciation",
          detail:
            "High and low tone, and the vowels English does not have. The foundation everything else sits on.",
        },
        {
          title: "Greetings and respect",
          detail:
            "Kedu, ị bọọla chi, and how address changes with age and relationship — the things relatives notice immediately.",
        },
        {
          title: "Conversation for real life",
          detail:
            "Family, market, cooking, travel and phone calls with people back home.",
        },
        {
          title: "Dialect awareness",
          detail:
            "Where your family's dialect differs from Standard Igbo, so you are understood in the room that matters.",
        },
      ],
      audiences: [
        {
          title: "Children aged 5–12",
          detail:
            "Games, songs and short bursts of naming practice, pitched to hold a young learner's attention.",
        },
        {
          title: "Teens aged 13–17",
          detail:
            "Conversation and identity, with material that treats them as the young adults they are.",
        },
        {
          title: "Adults",
          detail:
            "Beginners, rusty speakers, and parents who want to pass on more than they were given.",
        },
      ],
      seoTitle: "Learn Igbo online with a tutor",
      seoDescription:
        "Online Igbo lessons with vetted, hand-matched tutors. Live 1:1 and small group classes for children, teens and adults. Matched within 24 hours.",
    },
  },
  {
    slug: "hausa",
    name: "Hausa",
    kind: "language",
    status: "coming-soon",
    tagline: "One of West Africa's great lingua francas.",
    blurb:
      "Spoken across northern Nigeria, Niger and much of the Sahel. Join the waitlist and we will tell you the moment a tutor is matched to your timezone.",
  },
  {
    slug: "french",
    name: "French",
    kind: "language",
    status: "coming-soon",
    tagline: "An official language in 21 African countries.",
    blurb:
      "For families across Francophone West and Central Africa, and for learners who need it alongside a heritage language.",
  },
  {
    slug: "african-cooking",
    name: "African Cooking",
    kind: "skill",
    status: "coming-soon",
    tagline: "The dishes worth knowing by heart.",
    blurb:
      "Live kitchen sessions with a tutor on the other end — jollof, egusi, soups and stews, cooked alongside you rather than watched on a screen.",
  },
  {
    slug: "chess",
    name: "Chess",
    kind: "skill",
    status: "coming-soon",
    tagline: "Patience, pattern and nerve.",
    blurb:
      "One-to-one coaching for children and adults, from first moves to tournament preparation.",
  },
  {
    slug: "piano",
    name: "Piano",
    kind: "skill",
    status: "coming-soon",
    tagline: "Begin, or begin again.",
    blurb:
      "Live lessons with a tutor who can see your hands, for beginners and returning players alike.",
  },
];

export const availableSubjects = subjects.filter((s) => s.status === "available");
export const upcomingSubjects = subjects.filter((s) => s.status === "coming-soon");
export const subjectPages = subjects.filter((s) => s.page);

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

/** Options for the matching form — available subjects plus an escape hatch. */
export const subjectChoices = [
  ...availableSubjects.map((s) => ({ value: s.slug, label: s.nativeName ?? s.name })),
  { value: "other", label: "Something else" },
];
