export interface ProjectEntry {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  cover: string;
  href?: string;
}

export const PROJECTS: ProjectEntry[] = [
  {
    slug: "luxe",
    title: "Luxe",
    subtitle: "Modern e-commerce shopping experience",
    category: "E-Commerce",
    tags: ["Full Stack", "Storefront", "Retail"],
    cover: "/project1.jpg",
    href: "https://business-landing-kappa.vercel.app/",
  },
  {
    slug: "magnum-ai",
    title: "Magnum AI",
    subtitle: "Intelligent AI assistant",
    category: "AI Product",
    tags: ["AI", "Full Stack", "Backend"],
    cover: "/project2.jpg",
  },
  {
    slug: "paw-care",
    title: "Paw Care",
    subtitle: "Veterinary care & pet health services",
    category: "Healthcare",
    tags: ["Veterinary", "Clinic", "Booking"],
    cover: "/project3.jpg",
    href: "https://veterinary-drab.vercel.app/",
  },
  {
    slug: "green-de-nature",
    title: "Green-de Nature",
    subtitle: "Sustainable nature & eco living",
    category: "Full Stack",
    tags: ["Eco", "Organic", "Green"],
    cover: "/project4.jpg",
    href: "https://nature-project-hazel.vercel.app/",
  },
];
