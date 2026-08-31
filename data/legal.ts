/**
 * Policy content, kept as data so it can move to a CMS without touching the
 * page. The wording is the business's own — update `updated` whenever it
 * changes, and keep /faqs in step with anything material.
 */
export interface LegalBlock {
  heading?: string;
  body?: string[];
  list?: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  navTitle: string;
  updated: string;
  summary: string;
  seoDescription: string;
  blocks: LegalBlock[];
}

const CONTACT = "hello@zeedeelearn.com";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    navTitle: "Privacy",
    updated: "1 June 2026",
    summary:
      "What we collect, why we collect it, and your rights under UK GDPR and the Data Protection Act 2018.",
    seoDescription:
      "How Learn with Zidi collects, uses and protects personal data, including data about children, under UK GDPR and the Data Protection Act 2018.",
    blocks: [
      {
        body: [
          `Learn with Zidi ("we", "us", "our") is committed to protecting your personal data. This policy explains what we collect, why we collect it, and your rights under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.`,
        ],
      },
      {
        heading: "1. Who we are",
        body: [
          `Learn with Zidi is an online tutoring service connecting families in the diaspora with vetted tutors. Our registered business address is available on request by emailing ${CONTACT}.`,
        ],
      },
      {
        heading: "2. What personal data we collect",
        body: ["We collect the following categories of data:"],
        list: [
          "Enquiry data: name, email address, WhatsApp number, and how you heard about us.",
          "Learner data: the first name of the child or adult learner, age range, subject of interest, current level, and learning goals.",
          "Tutor applicant data: full name, email, WhatsApp, subjects taught, teaching experience, introduction, age groups, rate expectations, availability, timezone, and any notes submitted.",
          "Communication data: records of WhatsApp and email correspondence with us.",
          "Technical data: IP address and browser type collected automatically when you visit our website, via standard server logs.",
        ],
      },
      {
        body: [
          "We do not collect payment card details directly. Any payments are processed through third-party providers under their own privacy policies.",
        ],
      },
      {
        heading: "3. How we use your data",
        list: [
          "To match learners with suitable tutors.",
          "To schedule and coordinate sessions.",
          "To communicate with you about your enquiry, enrolment or application.",
          "To process payments and issue invoices.",
          "To improve our services and respond to feedback.",
          "To comply with our legal and safeguarding obligations.",
        ],
      },
      {
        heading: "4. Our lawful basis",
        body: [
          "We process your data on the basis of contract (to deliver the tutoring service you have requested), legitimate interests (to operate and improve our business), and legal obligation (for safeguarding and compliance purposes). Where we process data about children, we rely on parental consent or the contract with the parent or guardian.",
        ],
      },
      {
        heading: "5. How long we keep your data",
        body: [
          "We retain personal data only as long as necessary. Enquiry data is kept for up to 12 months. Active client and tutor records are kept for the duration of the relationship plus 3 years. Safeguarding records are kept for 10 years in accordance with best practice guidance.",
        ],
      },
      {
        heading: "6. Who we share your data with",
        body: ["We do not sell your data. We may share it with:"],
        list: [
          "Matched tutors — limited to the learner's first name, subject, level, availability and timezone.",
          "Our technology service providers, such as email platforms and form tools, under data processing agreements.",
          "Regulatory bodies or law enforcement where required by law.",
        ],
      },
      {
        heading: "7. Your rights",
        body: [
          `Under UK GDPR you have the right to access your data, correct inaccurate data, request erasure, restrict or object to processing, and data portability. To exercise any of these rights, email ${CONTACT}. We will respond within 30 days.`,
        ],
      },
      {
        heading: "8. Cookies",
        body: [
          "Our website uses only essential cookies required for it to function. We do not use tracking or advertising cookies.",
        ],
      },
      {
        heading: "9. Contact",
        body: [
          `For any privacy-related query, contact us at ${CONTACT}. If you are not satisfied with our response, you have the right to complain to the Information Commissioner's Office (ICO) at ico.org.uk.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & conditions",
    navTitle: "Terms",
    updated: "1 June 2026",
    summary:
      "The agreement between you and Zidi covering enrolment, fees, cancellation, matching and liability.",
    seoDescription:
      "The terms governing use of the Learn with Zidi tutoring service, including enrolment, fees, cancellation, tutor matching and liability.",
    blocks: [
      {
        body: [
          "These Terms & Conditions govern your use of the Learn with Zidi tutoring service. By enquiring, enrolling, or applying as a tutor, you agree to these terms.",
        ],
      },
      {
        heading: "1. The service",
        body: [
          "Learn with Zidi is a matching and coordination service. We connect parents and learners with independent tutors and facilitate scheduling. Tutors are not employees of Learn with Zidi. Sessions are delivered via Zoom or Google Meet. We do not host sessions on our own platform.",
        ],
      },
      {
        heading: "2. Enrolment",
        body: [
          "Enrolment is confirmed once we have matched you with a tutor, agreed a session schedule, and received your first monthly payment. Enrolment is personal and non-transferable.",
        ],
      },
      {
        heading: "3. Fees and payment",
        body: [
          "Fees are charged monthly in advance. Current pricing is displayed on our website and is subject to change with 30 days' notice. We accept payment in NGN, GBP, CAD and USD. Invoices are issued at the start of each billing period. Non-payment may result in suspension of sessions.",
        ],
      },
      {
        heading: "4. Cancellation by the client",
        body: [
          `You may cancel at any time by giving 30 days' written notice to ${CONTACT}. No refund is due for the current billing period unless a refund applies under our Refund Policy. Sessions not taken within a paid period are forfeited unless the missed session is due to tutor unavailability.`,
        ],
      },
      {
        heading: "5. Cancellation by us",
        body: [
          "We reserve the right to terminate an enrolment where payment is overdue by more than 14 days, where a client or learner acts in breach of our Fair Play Policy or Child Safety Policy, or where continued service is no longer practicable.",
        ],
      },
      {
        heading: "6. Tutor matching and replacement",
        body: [
          "We make every effort to match you with a suitable tutor based on the information you provide. If you are not happy with your tutor within the first two sessions, contact us and we will rematch you at no additional cost.",
        ],
      },
      {
        heading: "7. Liability",
        body: [
          "Learn with Zidi acts as an intermediary and is not liable for the content of individual sessions, the conduct of independent tutors, or technical failures on third-party video platforms. Our total liability in any circumstance is limited to the fees paid in the most recent calendar month.",
        ],
      },
      {
        heading: "8. Intellectual property",
        body: [
          "All content on this website — including copy, design and structure — is the property of Learn with Zidi and may not be reproduced without written consent.",
        ],
      },
      {
        heading: "9. Governing law",
        body: [
          "These Terms are governed by the laws of England and Wales. Any dispute shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
        ],
      },
      {
        heading: "10. Changes to these terms",
        body: [
          "We may update these Terms at any time. Continued use of the service after notice of changes constitutes acceptance. We will notify active clients of material changes by email.",
        ],
      },
    ],
  },
  {
    slug: "child-safety",
    title: "Child safety policy",
    navTitle: "Child safety",
    updated: "1 June 2026",
    summary:
      "Our safeguarding approach for every session involving a learner under the age of 18.",
    seoDescription:
      "Learn with Zidi's safeguarding policy: DBS checks, references, session environment rules, reporting, and our designated safeguarding lead.",
    blocks: [
      {
        body: [
          "The safety and wellbeing of children using Learn with Zidi is our highest priority. This policy outlines our safeguarding approach for all sessions involving learners under the age of 18.",
        ],
      },
      {
        heading: "Tutor vetting",
        body: ["All tutors working with learners under 18 are required to:"],
        list: [
          "Complete an enhanced DBS (Disclosure and Barring Service) check, or the equivalent in their country of residence, before their first session with a minor.",
          "Provide two references, at least one of which must speak to their suitability to work with children.",
          "Complete a brief safeguarding awareness review as part of their onboarding.",
          "Agree to our Fair Play Policy and Child Safety Policy in writing.",
        ],
      },
      {
        heading: "Session environment",
        list: [
          "All sessions are delivered via Zoom or Google Meet — video only, in a visible, appropriate setting.",
          "Parents and guardians are encouraged to be present in the home during sessions, especially for younger children.",
          "Sessions must not take place in private or one-to-one chat outside the agreed video platform without parental knowledge.",
          "No session may be recorded by the tutor without prior written consent from the parent or guardian.",
        ],
      },
      {
        heading: "Appropriate content",
        body: [
          "All tutors are required to deliver age-appropriate content and to maintain professional conduct at all times. Sharing or displaying material that is violent, explicit, discriminatory, or otherwise unsuitable for the learner's age group is grounds for immediate termination.",
        ],
      },
      {
        heading: "Reporting a concern",
        body: [
          `If a parent, learner or tutor has a safeguarding concern — including anything that suggests a child may be at risk of harm — they should contact us immediately at ${CONTACT}. We take all disclosures seriously. Where a concern suggests a child is at immediate risk of harm, we will refer the matter to statutory authorities, such as local children's services or the police, without delay and regardless of any request for confidentiality.`,
        ],
      },
      {
        heading: "Designated safeguarding lead",
        body: [
          `Learn with Zidi has a designated safeguarding lead responsible for managing all child protection concerns. Contact details are available on request at ${CONTACT}.`,
        ],
      },
      {
        heading: "Policy review",
        body: [
          "This policy is reviewed annually and updated in line with changes to statutory guidance, including the Department for Education's Keeping Children Safe in Education guidance and relevant Ofsted frameworks where applicable.",
        ],
      },
    ],
  },
  {
    slug: "fair-play",
    title: "Fair play policy",
    navTitle: "Fair play",
    updated: "1 June 2026",
    summary:
      "The standards we expect from everyone — tutors, learners and parents alike.",
    seoDescription:
      "The conduct standards Learn with Zidi expects from tutors, parents and learners, and the behaviour that ends a relationship immediately.",
    blocks: [
      {
        body: [
          "Learn with Zidi is built on respect, trust, and a genuine commitment to learning. This policy sets out the standards we expect from everyone — tutors, learners and parents alike.",
        ],
      },
      {
        heading: "For tutors",
        list: [
          "Arrive on time for every session. If you need to cancel, give at least 24 hours' notice and offer a reschedule date.",
          "Deliver sessions in a professional, focused and age-appropriate manner.",
          "Maintain appropriate professional boundaries with learners at all times.",
          "Do not share learner details, contact information or session content with third parties.",
          "Do not attempt to solicit learners for private arrangements that bypass Learn with Zidi.",
          "Disclose any conflict of interest or prior relationship with a learner to us immediately.",
          "Complete any requested DBS or background check before sessions begin with learners under 18.",
        ],
      },
      {
        heading: "For parents and learners",
        list: [
          "Attend, or arrange for the learner to attend, each scheduled session. More than two no-shows without notice may result in session forfeiture for that period.",
          "Treat tutors with courtesy and respect. Sessions are a professional engagement.",
          "Provide honest and accurate information when enquiring, so we can make the best match.",
          "Do not contact tutors outside the channel we establish, or arrange private sessions that bypass Learn with Zidi.",
          `Report any concern about a tutor's conduct to ${CONTACT} promptly.`,
        ],
      },
      {
        heading: "Zero tolerance",
        body: [
          "The following will result in immediate termination of the relationship with no refund:",
        ],
        list: [
          "Any form of harassment, abuse, discrimination or threatening behaviour toward any party.",
          "Sharing explicit, offensive or inappropriate content during sessions.",
          "Misrepresentation of qualifications or identity.",
          "Any conduct that puts a child's welfare at risk.",
        ],
      },
      {
        heading: "Reporting",
        body: [
          `To report a concern, contact us at ${CONTACT}. We take all reports seriously and will investigate promptly. Safeguarding concerns are referred to the appropriate authorities without delay.`,
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refund policy",
    navTitle: "Refunds",
    updated: "1 June 2026",
    summary: "Exactly when a refund applies, and how to request one.",
    seoDescription:
      "When Learn with Zidi issues refunds and credits: tutor cancellations, the first two sessions, technical failures and exceptional circumstances.",
    blocks: [
      {
        body: [
          "We want you to feel confident when you commit to Learn with Zidi. This policy sets out clearly when a refund applies.",
        ],
      },
      {
        heading: "Sessions cancelled by your tutor",
        body: [
          "If your tutor cancels a session with less than 24 hours' notice and cannot offer a reschedule in the same billing period, we will credit the value of that session to your next invoice, or issue a pro-rata refund on request.",
        ],
      },
      {
        heading: "Cancellation within the first two sessions",
        body: [
          "If you are not satisfied after your first or second session and decide not to continue, contact us within 7 days of that session. We will refund unused sessions in the current billing period, minus a £10 / ₦10,000 administration fee.",
        ],
      },
      {
        heading: "Cancellation after the second session",
        body: [
          "After two sessions have been delivered, the monthly fee is non-refundable for the current billing period. You may cancel future billing periods by giving 30 days' notice.",
        ],
      },
      {
        heading: "Technical failures",
        body: [
          "If a session cannot proceed due to a platform outage on the tutor's side, we will reschedule at no cost. If the outage is on your side, the session is considered delivered and no refund applies. If the cause is genuinely disputed, we will consider a credit at our discretion.",
        ],
      },
      {
        heading: "Exceptional circumstances",
        body: [
          `We will consider requests for refunds or credits in exceptional circumstances — serious illness or bereavement, for example — on a case-by-case basis. Email ${CONTACT} with supporting details.`,
        ],
      },
      {
        heading: "How to request a refund",
        body: [
          `Email ${CONTACT} with your name, the reason for the request, and any relevant details. Approved refunds are processed within 5–10 business days to the original payment method.`,
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug);
}
