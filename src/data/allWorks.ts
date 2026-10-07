export interface WorkEntry {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  /** Unsplash cover image */
  image: string;
  /** rgb triplet used for the card's accent glow + category colour */
  accent: string;
  /** live project url — omitted when there is nothing public to link to yet */
  href?: string;
}

export const ALL_WORKS: WorkEntry[] = [
  {
    slug: "network-marketing",
    title: "Network Marketing",
    category: "Growth Platform",
    description:
      "A referral-driven growth platform with team dashboards, downline tracking and a community-first onboarding flow.",
    tags: ["Dashboard", "Referrals", "Community"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    accent: "167, 139, 250",
  },
  {
    slug: "blockchain",
    title: "Blockchain",
    category: "Distributed Ledger",
    description:
      "A transparent block explorer interface that makes on-chain transactions readable for non-technical users.",
    tags: ["Ledger", "Explorer", "Security"],
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80",
    accent: "129, 140, 248",
  },
  {
    slug: "web3",
    title: "Web3",
    category: "Decentralised App",
    description:
      "Wallet-connected dApp experiences with clear signing states, so users always know what they are approving.",
    tags: ["Wallet", "dApp", "Onboarding"],
    image:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200&q=80",
    accent: "232, 121, 249",
  },
  {
    slug: "e-commerce",
    title: "E-commerce",
    category: "Online Store",
    description:
      "A conversion-focused storefront with a considered product grid, fast checkout and a premium retail feel.",
    tags: ["Storefront", "Checkout", "Retail"],
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    accent: "244, 114, 182",
    href: "https://business-landing-kappa.vercel.app/",
  },
  {
    slug: "ai",
    title: "AI",
    category: "AI Product",
    description:
      "An assistant interface that turns a model's raw output into something people can actually read, trust and act on.",
    tags: ["AI", "Product Design", "Interface"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    accent: "125, 211, 252",
  },
  {
    slug: "fintech",
    title: "Fintech",
    category: "Finance",
    description:
      "A financial dashboard with live balances, spending insight and data-dense views that stay calm and legible.",
    tags: ["Dashboard", "Data Viz", "Payments"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    accent: "110, 231, 183",
  },
  {
    slug: "nature",
    title: "Nature",
    category: "Eco & Outdoors",
    description:
      "A sustainable living brand site that leans on imagery, space and quiet motion to sell the feeling, not the features.",
    tags: ["Eco", "Organic", "Storytelling"],
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    accent: "134, 239, 172",
    href: "https://nature-project-hazel.vercel.app/",
  },
  {
    slug: "paw-care",
    title: "Paw care",
    category: "Veterinary Clinic",
    description:
      "A warm, trustworthy clinic site with service clarity, appointment booking and open hours users can scan instantly.",
    tags: ["Veterinary", "Booking", "Clinic"],
    image:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1200&q=80",
    accent: "251, 146, 60",
    href: "https://veterinary-drab.vercel.app/",
  },
  {
    slug: "bubble-game",
    title: "Bubble game site",
    category: "Interactive Game",
    description:
      "A playful browser game with bubble physics, satisfying feedback and animations tuned to stay smooth on mobile.",
    tags: ["Game", "Canvas", "Animation"],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    accent: "56, 189, 248",
    href: "https://bubble-site-liard.vercel.app/",
  },
  {
    slug: "cv-shorting",
    title: "CV Shorting",
    category: "Hiring Tool",
    description:
      "A screening tool that scores and ranks incoming CVs against a role brief, surfacing the best matches first.",
    tags: ["Automation", "Screening", "Ranking"],
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80",
    accent: "245, 178, 96",
  },
];
