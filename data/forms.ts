/** Option sets shared by the matching form, the tutor application and the API. */

export const timezones = [
  { value: "WAT", label: "West Africa Time — Lagos, Abuja (UTC+1)" },
  { value: "GMT", label: "GMT — London, Dublin (UTC+0)" },
  { value: "BST", label: "British Summer Time — London (UTC+1)" },
  { value: "CET", label: "Central European Time — Paris, Berlin (UTC+1)" },
  { value: "ET", label: "Eastern Time — New York, Toronto (UTC−5)" },
  { value: "CT", label: "Central Time — Chicago, Winnipeg (UTC−6)" },
  { value: "MT", label: "Mountain Time — Denver, Calgary (UTC−7)" },
  { value: "PT", label: "Pacific Time — Los Angeles, Vancouver (UTC−8)" },
  { value: "other", label: "Somewhere else — we will ask" },
] as const;

export const days = [
  { value: "mon", label: "Mon", full: "Monday" },
  { value: "tue", label: "Tue", full: "Tuesday" },
  { value: "wed", label: "Wed", full: "Wednesday" },
  { value: "thu", label: "Thu", full: "Thursday" },
  { value: "fri", label: "Fri", full: "Friday" },
  { value: "sat", label: "Sat", full: "Saturday" },
  { value: "sun", label: "Sun", full: "Sunday" },
] as const;

export const timesOfDay = [
  { value: "morning", label: "Morning", hint: "6am – 12pm" },
  { value: "afternoon", label: "Afternoon", hint: "12pm – 5pm" },
  { value: "evening", label: "Evening", hint: "5pm – 9pm" },
] as const;

export const learnerTypes = [
  { value: "child", label: "My child", hint: "I am a parent or guardian arranging lessons" },
  { value: "self", label: "Myself", hint: "I am the one learning" },
  { value: "multiple", label: "Several learners", hint: "Siblings, cousins or a few friends together" },
] as const;

export const levels = [
  { value: "beginner", label: "Complete beginner", hint: "No experience at all" },
  { value: "some", label: "Some exposure", hint: "A few words and phrases" },
  { value: "conversational", label: "Conversational", hint: "Can hold a basic conversation" },
  { value: "advanced", label: "Advanced", hint: "Fluent, looking to sharpen or maintain" },
  { value: "unsure", label: "Not sure", hint: "Happy for the tutor to assess" },
] as const;

export const goals = [
  { value: "family", label: "Speak with family" },
  { value: "heritage", label: "Reconnect with my heritage" },
  { value: "child-heritage", label: "Help my child learn our language" },
  { value: "travel", label: "Prepare for a trip" },
  { value: "fluency", label: "Improve fluency" },
  { value: "maintain", label: "Maintain a language I already speak" },
  { value: "culture", label: "Cultural connection" },
  { value: "other", label: "Something else" },
] as const;

export const lessonPreferences = [
  { value: "private", label: "Private", hint: "One-to-one with your own tutor" },
  { value: "group", label: "Group", hint: "2–4 people who already know each other" },
  { value: "either", label: "Either", hint: "Recommend what suits us best" },
] as const;

export const childAgeBands = ["5–8", "9–12", "13–17"] as const;
export const adultAgeBands = ["18–25", "26–33", "34–40", "40+"] as const;

export const referralSources = [
  { value: "friend", label: "A friend or family member" },
  { value: "whatsapp", label: "A WhatsApp group" },
  { value: "social", label: "Instagram, Facebook or TikTok" },
  { value: "search", label: "Google search" },
  { value: "other", label: "Somewhere else" },
] as const;

/* ---- Tutor application ---- */

export const teachingExperience = [
  { value: "starting", label: "Just starting out", hint: "Under a year of formal teaching" },
  { value: "1-3", label: "1–3 years", hint: "Some formal or informal teaching" },
  { value: "3-plus", label: "3+ years", hint: "Experienced teacher or coach" },
] as const;

export const ageGroupsTaught = [
  { value: "children", label: "Children", hint: "5–12" },
  { value: "teens", label: "Teens", hint: "13–17" },
  { value: "adults", label: "Adults", hint: "18+" },
] as const;
