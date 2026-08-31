export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const primaryNav: NavItem[] = [
  { label: "Learn", href: "/learn" },
  { label: "How it works", href: "/how-it-works" },
  { label: "For families", href: "/families" },
  { label: "Pricing", href: "/pricing" },
  { label: "Teach with Zidi", href: "/teach" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Learn",
    items: [
      { label: "What you can learn", href: "/learn" },
      { label: "Yorùbá lessons", href: "/learn/yoruba" },
      { label: "Igbo lessons", href: "/learn/igbo" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Who it's for",
    items: [
      { label: "For families", href: "/families" },
      { label: "For adult learners", href: "/adults" },
      { label: "Teach with Zidi", href: "/teach" },
      { label: "Get matched", href: "/get-matched" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Zidi", href: "/about" },
      { label: "Questions", href: "/faqs" },
      { label: "Talk to Zidi", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms & conditions", href: "/legal/terms" },
      { label: "Child safety", href: "/legal/child-safety" },
      { label: "Fair play", href: "/legal/fair-play" },
      { label: "Refunds", href: "/legal/refunds" },
    ],
  },
];
