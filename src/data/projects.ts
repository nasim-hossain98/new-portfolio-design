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
    slug: "taskez",
    title: "Taskez",
    subtitle: "Task management reimagined",
    category: "Web Design",
    tags: ["UI/UX", "Dashboard", "SaaS"],
    cover: "/project1.jpg",
  },
  {
    slug: "magnum-ai",
    title: "Magnum AI",
    subtitle: "Intelligent design assistant",
    category: "AI Product",
    tags: ["AI", "Product Design", "Branding"],
    cover: "/project2.jpg",
  },
  {
    slug: "lastfm",
    title: "Last.fm",
    subtitle: "Music discovery platform",
    category: "Web Design",
    tags: ["Editorial", "Motion", "Typography"],
    cover: "/project3.jpg",
  },
  {
    slug: "cola",
    title: "Cola",
    subtitle: "Brand identity & web presence",
    category: "Branding",
    tags: ["Identity", "Luxury", "Dark UI"],
    cover: "/project4.jpg",
  },
];
