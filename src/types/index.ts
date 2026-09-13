/** Shared content + component prop types */

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  socials: Record<SocialPlatform, string>;
}

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "dribbble"
  | "behance";

export interface Service {
  id: number;
  number: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
  tags?: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year?: string;
  url?: string;
}

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  time: string;
  description: string;
  points: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  featured?: boolean;
}

export interface ClientLogo {
  name: string;
  logo: string;
}

export interface NavItem {
  label: string;
  href: string;
}

/** Scroll progress state emitted by useScrollProgress */
export interface ScrollProgressState {
  /** 0 → 1 progress through the document */
  progress: number;
  /** raw scroll offset in px */
  scrollY: number;
  direction: 1 | -1;
}

export type RevealVariant = "character" | "word" | "line";
