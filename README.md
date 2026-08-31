# Learn with Zidi

The marketing and conversion site for Learn with Zidi — a managed live-learning
service that matches learners and families, particularly across the African
diaspora, with vetted tutors for Yorùbá, Igbo and more.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Node 20.9+ required.

---

## Before you launch — three things

**1. Point form submissions somewhere real.** Copy `.env.example` to
`.env.local` and set either `ZIDI_WEBHOOK_URL` or the three `RESEND_*` /
`ZIDI_*` email variables. Until you do, production returns a 503 on every form
and tells the sender to email instead. That is on purpose — see
`lib/deliver.ts`. Development logs submissions to the console.

**2. Set the production domain.** `site.url` in `data/site.ts` drives canonical
URLs, the sitemap, Open Graph tags and structured data.

**3. Replace the placeholder photography.** Everything in `assets/images/` is
Unsplash-licensed and chosen to establish the visual direction. Swap the files
in place — same names, similar aspect ratios — and nothing else needs touching.
See `assets/images/CREDITS.md`.

---

## Where the content lives

Copy and content are separated from presentation so the business can edit them
without touching components. Everything below is plain TypeScript, ready to
move behind a CMS later without a rewrite.

| File | What it controls |
| --- | --- |
| `data/site.ts` | Contact details, social links, the four public commitments, trust-bar items |
| `data/subjects.ts` | Every language and skill, its status, and its landing page |
| `data/pricing.ts` | Plans, prices, currency rates, billing facts |
| `data/faqs.ts` | All questions, grouped |
| `data/journey.ts` | The four "how it works" steps |
| `data/tutors.ts` | Tutor profiles **and** the vetting standards |
| `data/testimonials.ts` | Testimonials |
| `data/legal.ts` | All five policies |
| `data/forms.ts` | Every option list used by the three forms |
| `data/nav.ts` | Header and footer navigation |

### Adding a language or skill

Add an entry to `subjects` in `data/subjects.ts`. That alone gives you a
discovery card, a matching-form option, a footer link and a sitemap entry. Add
a `page` block as well and it gains a full landing page at `/learn/<slug>` with
`Course` and `FAQPage` structured data. Nothing else needs editing.

### Two files ship intentionally empty

`data/testimonials.ts` and `data/tutors.ts` export empty arrays, and both
sections are fully built and wired up.

No testimonial and no tutor biography on this site is invented. Add real,
permissioned entries and the sections appear automatically — on the homepage,
`/families`, `/adults` and `/about`. Until then those pages show things the
business can stand behind today: the four commitments in `data/site.ts`, and
the vetting process in `tutorStandards`. Each file carries a worked example of
the shape in a comment.

---

## Architecture

```
app/                    routes, route handlers, sitemap, robots
  api/                  four POST endpoints, all through lib/api.ts
  learn/[slug]/         generated from data/subjects.ts
  legal/[doc]/          generated from data/legal.ts
components/
  ui/                   primitives — button, field, accordion, reveal, layout
  sections/             page sections, composed by routes
  forms/                the three flows and their shared shell
  layout/               header, footer, mobile nav, page header
data/                   all content
lib/                    validation, delivery, rate limiting, SEO, analytics
assets/images/          imported by next/image (not served raw)
public/                 fonts, OG image
```

### Forms

Three flows — an 8-step tutor match, a 5-step tutor application, and contact —
share `components/forms/form-shell.tsx`. All three have inline validation, a
progress indicator, a back button, loading and error and success states, and
draft persistence in `sessionStorage` (not `localStorage`: these forms can
carry a child's first name and age range, and that should not outlive the tab).
A reload resumes at the step you left.

Validation schemas in `lib/validation.ts` run in the browser for immediate
feedback and again on the server, which never trusts the client.

### API and security

Every endpoint runs through `handleSubmission` in `lib/api.ts`:
same-origin check, per-IP rate limit, 32 KB body cap, schema validation,
honeypot, then delivery. `lib/rate-limit.ts` is in-memory — behind more than
one instance, swap `hit()` for a shared store; the signature is built not to
change. Security headers including a CSP are set in `next.config.ts`.

Data collection is minimised deliberately: a learner's first name at most,
never a surname, date of birth or address.

### Analytics

`lib/analytics.ts` pushes typed events to `window.dataLayer` and an optional
`window.zidiAnalytics` hook. No vendor script ships with the site; if neither
global exists, every call is a no-op. Events cover CTA clicks, all three form
funnels, pricing interaction and FAQ opens.

### Performance

- Two self-hosted variable fonts, subset by `unicode-range`, latin preloaded (~62 KB)
- No animation library — scroll reveals use one shared `IntersectionObserver`
- Server components everywhere except the header, forms, accordion and pricing toggle
- `next/image` with AVIF/WebP, responsive `sizes`, and blur placeholders
- Every route below is static except the four API handlers

### Accessibility

WCAG 2.2 AA is the target. Semantic landmarks and one `<h1>` per page, visible
focus rings on every interactive element (with a light-on-dark variant), the
mobile menu built on native `<dialog>` so focus trapping and Escape come from
the platform, labelled and described form controls with errors announced via
`role="alert"`, and `prefers-reduced-motion` respected throughout. Content is
visible without JavaScript — reveal animations are gated behind
`@media (scripting: enabled)` so nothing is hidden from a browser that will
never un-hide it.
