export interface PolicySection {
  heading: string
  content: string
  isList?: boolean
  items?: string[]
}

export interface Policy {
  id: string
  title: string
  lastUpdated: string
  sections: PolicySection[]
}

export const policies: Record<string, Policy> = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    lastUpdated: '1 June 2026',
    sections: [
      {
        heading: '',
        content: 'Learn with Zidi ("we", "us", "our") is committed to protecting your personal data. This policy explains what we collect, why we collect it, and your rights under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.',
      },
      {
        heading: '1. Who We Are',
        content: 'Learn with Zidi is an online tutoring service connecting families in the diaspora with vetted tutors. Our registered business address is available on request by emailing hello@zeedeelearn.com.',
      },
      {
        heading: '2. What Personal Data We Collect',
        content: 'We collect the following categories of data:',
        isList: true,
        items: [
          'Enquiry data: name, email address, WhatsApp number, how you heard about us',
          'Learner data: first name of the child or adult learner, age range, subject of interest, current level, learning goals',
          'Tutor applicant data: full name, email, WhatsApp, subject(s) taught, teaching experience, bio, age groups, rate expectations, availability, timezone, and any notes submitted',
          'Communication data: records of WhatsApp and email correspondence with us',
          'Technical data: IP address and browser type collected automatically when you visit our website (via standard server logs)',
        ],
      },
      {
        heading: '',
        content: 'We do not collect payment card details directly. Any payments are processed through third-party providers under their own privacy policies.',
      },
      {
        heading: '3. How We Use Your Data',
        content: 'We use your personal data for the following purposes:',
        isList: true,
        items: [
          'To match learners with suitable tutors',
          'To schedule and coordinate sessions',
          'To communicate with you about your enquiry, enrolment, or application',
          'To process payments and issue invoices',
          'To improve our services and respond to feedback',
          'To comply with our legal and safeguarding obligations',
        ],
      },
      {
        heading: '4. Our Lawful Basis',
        content: 'We process your data on the following legal bases: contract (to deliver the tutoring service you have requested), legitimate interests (to operate and improve our business), and legal obligation (for safeguarding and compliance purposes). Where we process data about children, we rely on parental consent or the contract with the parent/guardian.',
      },
      {
        heading: '5. How Long We Keep Your Data',
        content: 'We retain personal data only as long as necessary. Enquiry data is kept for up to 12 months. Active client and tutor records are kept for the duration of the relationship plus 3 years. Safeguarding records are kept for 10 years in accordance with best practice guidance.',
      },
      {
        heading: '6. Who We Share Your Data With',
        content: 'We do not sell your data. We may share your data with:',
        isList: true,
        items: [
          'Matched tutors (limited to first name of learner, subject, level, availability, and timezone)',
          'Our technology service providers (e.g. email platforms, form tools) under data processing agreements',
          'Regulatory bodies or law enforcement where required by law',
        ],
      },
      {
        heading: '7. Your Rights',
        content: 'Under UK GDPR you have the right to: access your data, correct inaccurate data, request erasure, restrict or object to processing, and data portability. To exercise any of these rights, email hello@zeedeelearn.com. We will respond within 30 days.',
      },
      {
        heading: '8. Cookies',
        content: 'Our website uses only essential cookies required for it to function. We do not use tracking or advertising cookies.',
      },
      {
        heading: '9. Contact',
        content: 'For any privacy-related queries, please contact us at hello@zeedeelearn.com. If you are not satisfied with our response, you have the right to complain to the Information Commissioner\'s Office (ICO) at ico.org.uk.',
      },
    ],
  },
  terms: {
    id: 'terms',
    title: 'Terms & Conditions',
    lastUpdated: '1 June 2026',
    sections: [
      {
        heading: '',
        content: 'These Terms & Conditions govern your use of the Learn with Zidi tutoring service. By enquiring, enrolling, or applying as a tutor, you agree to these terms.',
      },
      {
        heading: '1. The Service',
        content: 'Learn with Zidi is a matching and coordination service. We connect parents and learners with independent tutors and facilitate scheduling. Tutors are not employees of Learn with Zidi. Sessions are delivered via Zoom or Google Meet. We do not host sessions on our own platform.',
      },
      {
        heading: '2. Enrolment',
        content: 'Enrolment is confirmed once we have matched you with a tutor, agreed a session schedule, and received your first monthly payment. Enrolment is personal and non-transferable.',
      },
      {
        heading: '3. Fees and Payment',
        content: 'Fees are charged monthly in advance. Current pricing is displayed on our website and subject to change with 30 days\' notice. We accept payment in NGN, GBP, CAD, and USD. Invoices are issued at the start of each billing period. Non-payment may result in suspension of sessions.',
      },
      {
        heading: '4. Cancellation by the Client',
        content: 'You may cancel at any time by giving 30 days\' written notice to hello@zeedeelearn.com. No refund is due for the current billing period unless a refund applies under our Refund Policy. Sessions not taken within a paid period are forfeited unless the missed session is due to tutor unavailability.',
      },
      {
        heading: '5. Cancellation by Us',
        content: 'We reserve the right to terminate an enrolment where: payment is overdue by more than 14 days, a client or learner acts in breach of our Fair Play Policy or Child Safety Policy, or continued service is no longer practicable.',
      },
      {
        heading: '6. Tutor Matching and Replacement',
        content: 'We make every effort to match you with a suitable tutor based on the information you provide. If you are not happy with your tutor within the first two sessions, contact us and we will rematch you at no additional cost.',
      },
      {
        heading: '7. Liability',
        content: 'Learn with Zidi acts as an intermediary and is not liable for the content of individual sessions, the conduct of independent tutors, or technical failures on third-party video platforms (Zoom, Google Meet). Our total liability in any circumstance is limited to the fees paid in the most recent calendar month.',
      },
      {
        heading: '8. Intellectual Property',
        content: 'All content on this website — including copy, design, and structure — is the property of Learn with Zidi and may not be reproduced without written consent.',
      },
      {
        heading: '9. Governing Law',
        content: 'These Terms are governed by the laws of England and Wales. Any dispute shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
      },
      {
        heading: '10. Changes to These Terms',
        content: 'We may update these Terms at any time. Continued use of the service after notice of changes constitutes acceptance. We will notify active clients of material changes by email.',
      },
    ],
  },
  fairplay: {
    id: 'fairplay',
    title: 'Fair Play Policy',
    lastUpdated: '1 June 2026',
    sections: [
      {
        heading: '',
        content: 'Learn with Zidi is built on respect, trust, and a genuine commitment to learning. This policy sets out the standards we expect from everyone — tutors, learners, and parents alike.',
      },
      {
        heading: 'For Tutors',
        content: '',
        isList: true,
        items: [
          'Arrive on time for every session. If you need to cancel, give at least 24 hours\' notice and offer a reschedule date.',
          'Deliver sessions in a professional, focused, and age-appropriate manner.',
          'Maintain appropriate professional boundaries with learners at all times.',
          'Do not share learner details, contact information, or session content with third parties.',
          'Do not attempt to solicit learners for private arrangements that bypass Learn with Zidi.',
          'Disclose any conflict of interest or prior relationship with a learner to us immediately.',
          'Complete any requested DBS or background check before sessions begin with learners under 18.',
        ],
      },
      {
        heading: 'For Parents and Learners',
        content: '',
        isList: true,
        items: [
          'Attend or arrange for the learner to attend each scheduled session. More than two no-shows without notice may result in session forfeiture for that period.',
          'Treat tutors with courtesy and respect. Sessions are a professional engagement.',
          'Provide honest and accurate information when enquiring, so we can make the best match.',
          'Do not attempt to contact tutors outside the channel we establish for the session, or arrange direct private sessions that bypass Learn with Zidi.',
          'Report any concern about a tutor\'s conduct to hello@zeedeelearn.com promptly.',
        ],
      },
      {
        heading: 'Zero Tolerance',
        content: 'The following will result in immediate termination of the relationship with no refund:',
        isList: true,
        items: [
          'Any form of harassment, abuse, discrimination, or threatening behaviour toward any party',
          'Sharing explicit, offensive, or inappropriate content during sessions',
          'Misrepresentation of qualifications or identity',
          'Any conduct that puts a child\'s welfare at risk',
        ],
      },
      {
        heading: 'Reporting',
        content: 'To report a concern, contact us at hello@zeedeelearn.com. We take all reports seriously and will investigate promptly. Safeguarding concerns are referred to the appropriate authorities without delay.',
      },
    ],
  },
  refund: {
    id: 'refund',
    title: 'Refund Policy',
    lastUpdated: '1 June 2026',
    sections: [
      {
        heading: '',
        content: 'We want you to feel confident when you commit to Learn with Zidi. This policy sets out clearly when a refund applies.',
      },
      {
        heading: 'Sessions Cancelled by Your Tutor',
        content: 'If your tutor cancels a session with less than 24 hours\' notice and cannot offer a reschedule in the same billing period, we will credit the value of that session to your next invoice, or issue a pro-rata refund on request.',
      },
      {
        heading: 'Cancellation Within the First Two Sessions',
        content: 'If you are not satisfied after your first or second session and decide not to continue, contact us within 7 days of that session. We will issue a refund for unused sessions in the current billing period, minus a £10 / ₦10,000 administration fee.',
      },
      {
        heading: 'Cancellation After the Second Session',
        content: 'After two sessions have been delivered, the monthly fee is non-refundable for the current billing period. You may cancel future billing periods by giving 30 days\' notice.',
      },
      {
        heading: 'Technical Failures',
        content: 'If a session cannot proceed due to a platform outage on our tutor\'s side, we will reschedule at no cost. If the outage is on your side, the session is considered delivered and no refund applies. If the cause is genuinely disputed, we will consider a credit at our discretion.',
      },
      {
        heading: 'Exceptional Circumstances',
        content: 'We will consider requests for refunds or credits in exceptional circumstances (e.g. serious illness, bereavement) on a case-by-case basis. Email hello@zeedeelearn.com with supporting details.',
      },
      {
        heading: 'How to Request a Refund',
        content: 'Email hello@zeedeelearn.com with your name, the reason for the request, and any relevant details. Approved refunds are processed within 5–10 business days to the original payment method.',
      },
    ],
  },
  childsafety: {
    id: 'childsafety',
    title: 'Child Safety Policy',
    lastUpdated: '1 June 2026',
    sections: [
      {
        heading: '',
        content: 'The safety and wellbeing of children using Learn with Zidi is our highest priority. This policy outlines our safeguarding approach for all sessions involving learners under the age of 18.',
      },
      {
        heading: 'Tutor Vetting',
        content: 'All tutors working with learners under 18 are required to:',
        isList: true,
        items: [
          'Complete an enhanced DBS (Disclosure and Barring Service) check, or equivalent in their country of residence, before their first session with a minor',
          'Provide two references, at least one of which must speak to their suitability to work with children',
          'Complete a brief safeguarding awareness review as part of their onboarding',
          'Agree to our Fair Play Policy and Child Safety Policy in writing',
        ],
      },
      {
        heading: 'Session Environment',
        content: '',
        isList: true,
        items: [
          'All sessions are delivered via Zoom or Google Meet — video only, in a visible, appropriate setting',
          'Parents and guardians are encouraged to be present in the home during sessions, especially for younger children',
          'Sessions must not take place in private or one-to-one chat outside the agreed video platform without parental knowledge',
          'No session may be recorded by the tutor without prior written consent from the parent or guardian',
        ],
      },
      {
        heading: 'Appropriate Content',
        content: 'All tutors are required to deliver age-appropriate content and to maintain professional conduct at all times. Sharing or displaying material that is violent, explicit, discriminatory, or otherwise unsuitable for the learner\'s age group is grounds for immediate termination.',
      },
      {
        heading: 'Reporting a Concern',
        content: 'If a parent, learner, or tutor has a safeguarding concern — including anything that suggests a child may be at risk of harm — they should contact us immediately at hello@zeedeelearn.com. We will take all disclosures seriously. Where a concern suggests a child is at immediate risk of harm, we will refer the matter to statutory authorities (e.g. local children\'s services or the police) without delay and regardless of any request for confidentiality.',
      },
      {
        heading: 'Designated Safeguarding Lead',
        content: 'Learn with Zidi has a designated safeguarding lead who is responsible for managing all child protection concerns. Contact details are available on request at hello@zeedeelearn.com.',
      },
      {
        heading: 'Policy Review',
        content: 'This policy is reviewed annually and updated in line with changes to statutory guidance, including the Department for Education\'s Keeping Children Safe in Education guidance and relevant Ofsted frameworks where applicable.',
      },
    ],
  },
  faq: {
    id: 'faq',
    title: 'Parents FAQ',
    lastUpdated: '1 June 2026',
    sections: [
      {
        heading: 'How does the matching process work?',
        content: 'When you enquire, we gather details about your child — the subject, their level, your availability, and your timezone. We then hand-pick a tutor from our vetted pool who is the right fit. We don\'t use an algorithm; every match is made by a person. You\'ll hear back from us within 24 hours.',
      },
      {
        heading: 'Which platform are sessions delivered on?',
        content: 'Sessions take place via Zoom or Google Meet. Both are free for learners to use. You don\'t need an account — your tutor will send a meeting link before each session. We do not host sessions on our own platform.',
      },
      {
        heading: 'What if we don\'t get on with our tutor?',
        content: 'If you\'re not happy after the first or second session, let us know. We\'ll rematch you with a different tutor at no extra cost. There are no awkward conversations to have — just email us and we\'ll handle it.',
      },
      {
        heading: 'How long are the sessions?',
        content: 'Standard sessions are 1 hour. This gives enough time for warm-up, focused learning, and a short review — without rushing. Two sessions per week (our popular plan) provides the right rhythm for real, lasting progress.',
      },
      {
        heading: 'What\'s the minimum commitment?',
        content: 'We bill monthly. You can cancel any time with 30 days\' notice. We don\'t lock you into contracts — but consistency is what gets results, so we\'d encourage you to give it at least 8 weeks before drawing any conclusions.',
      },
      {
        heading: 'How do I pay?',
        content: 'We send a monthly invoice by email. You can pay in NGN, GBP, CAD, or USD via bank transfer. We do not currently accept card payment directly, but this is coming soon.',
      },
      {
        heading: 'What languages are available right now?',
        content: 'Yoruba and Igbo are available now. Piano and African dishes are coming soon. If you need something else — Hausa, French, chess, another language — get in touch and we\'ll do our best to find the right tutor for you.',
      },
      {
        heading: 'Is my child safe in online sessions?',
        content: 'Yes. All tutors working with children hold a current DBS check and have been vetted by us directly. Sessions are video-only via Zoom or Google Meet. We encourage parents to be present in the home during lessons, especially for younger children. Full details are in our Child Safety Policy.',
      },
      {
        heading: 'Can I sit in on sessions?',
        content: 'Absolutely — and for younger children we actively encourage it. You\'re welcome to observe any session. Some parents find it helpful to check in for the first few minutes, then step back to let the child build a rapport with their tutor.',
      },
      {
        heading: 'What if a session has to be cancelled?',
        content: 'If your tutor cancels, we\'ll reschedule at no cost or credit the session. If you need to cancel, please give your tutor at least 24 hours\' notice. More than two no-shows in a billing period may result in the sessions being forfeited for that month.',
      },
      {
        heading: 'I have a question not answered here',
        content: 'Email us at hello@zeedeelearn.com or message us on WhatsApp. We aim to respond within a few hours during business hours.',
      },
    ],
  },
}
