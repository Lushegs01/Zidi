/** The four steps, used on the homepage and expanded on /how-it-works. */
export const steps = [
  {
    n: "01",
    title: "Tell us what you're looking for",
    short: "Subject, level, learner's age, goals, schedule and timezone.",
    detail:
      "It takes about two minutes. The more you tell us about why you're learning — a grandmother to talk to, a trip in March, a child who is losing the language — the better the match we can make.",
    aside: "About 2 minutes",
  },
  {
    n: "02",
    title: "We find your match",
    short: "A person on our team hand-picks a tutor from our vetted pool.",
    detail:
      "No algorithm, no shortlist to sift through. Someone reads what you sent and picks the tutor they would send their own family to, then introduces you by email or WhatsApp.",
    aside: "Within 24 hours",
  },
  {
    n: "03",
    title: "Start learning",
    short: "Meet your tutor on Zoom or Google Meet and begin.",
    detail:
      "Your tutor sends a link before each session — no account needed. Sessions are an hour: warm-up, focused work, and a short review at the end.",
    aside: "1 hour per session",
  },
  {
    n: "04",
    title: "Keep growing",
    short: "A fixed weekly rhythm, adjusted whenever life changes.",
    detail:
      "Same tutor, same slots each week, billed monthly. If the fit isn't right in the first two sessions we rematch you free. If your schedule shifts, tell us and we move things.",
    aside: "Cancel with 30 days' notice",
  },
] as const;
