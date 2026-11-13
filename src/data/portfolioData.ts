import type {
  PersonalInfo,
  Service,
  Project,
  ProcessStep,
  Testimonial,
  ClientLogo,
} from "../types";

export const personalInfo: PersonalInfo = {
  name: "Mohammad Nasim",
  title: "Full Stack Developer",
  email: "nasimhossain105@gmail.com",
  phone: "+1 234 567 890",
  location: "Remote / Worldwide",
  bio: "I build end-to-end web applications — React frontends, robust APIs, databases, and reliable cloud deployment.",
  socials: {
    github: "https://github.com/arik",
    linkedin: "https://www.linkedin.com/in/md-nasim-hossain-0a8a54172/",
    twitter: "https://x.com/MdNasim89200917",
    dribbble: "https://dribbble.com/Nasim094",
    behance: "https://behance.net/arik",
  },
};

export const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Frontend Development",
    description:
      "Fast, accessible interfaces built with React and TypeScript — responsive layouts, clean state management, and pixel-precise components that scale with your product.",
    link: "#services",
    linkText: "About frontend",
    tags: ["React", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    id: 2,
    number: "02",
    title: "Backend & APIs",
    description:
      "Well-structured server logic, databases, and APIs that keep your product secure, consistent, and ready for real traffic.",
    link: "#services",
    linkText: "About backend",
    tags: ["Node.js", "REST & GraphQL", "PostgreSQL", "Authentication"],
  },
  {
    id: 3,
    number: "03",
    title: "Deployment & DevOps",
    description:
      "From CI/CD pipelines to monitoring and backups — I ship your application to production and keep it running reliably.",
    link: "#services",
    linkText: "About DevOps",
    tags: ["AWS", "CI/CD", "Docker", "Monitoring"],
  },
];

export const projects: Project[] = [
  { id: 1, title: "Taskez", category: "Full Stack", image: "/project1.jpg", year: "2025" },
  { id: 2, title: "Magnum AI", category: "Full Stack", image: "/project2.jpg", year: "2025" },
  { id: 3, title: "Last.fm", category: "Full Stack", image: "/project3.jpg", year: "2024" },
  { id: 4, title: "Cola", category: "Full Stack", image: "/project4.jpg", year: "2024" },
];

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    number: "01",
    title: "Discovery Call",
    time: "(1 Hour)",
    description:
      "Before we start, we determine if and how I can help you. What do you need built, and what goals do you have for your product?",
    points: [
      "We get to know each other better",
      "Determine how I can best assist you",
      "Understand the goals you have for your product",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Architecture & Strategy",
    time: "(1 Week)",
    description:
      "Together, we map the product into a technical plan — data models, API contracts, and the features that matter most for the first release.",
    points: ["Requirement mapping", "System architecture", "API & data design"],
  },
  {
    id: 3,
    number: "03",
    title: "Frontend Development",
    time: "(2 Weeks)",
    description:
      "Now the product takes shape. I build responsive, accessible interfaces with reusable components, so every screen stays consistent as the app grows.",
    points: ["Responsive, accessible UI", "Reusable component system"],
  },
  {
    id: 4,
    number: "04",
    title: "Backend Development",
    time: "(2 Weeks)",
    description:
      "I connect the product to a solid backend — secure APIs, a well-modelled database, and authentication and authorization that hold up in production.",
    points: ["REST & GraphQL APIs", "Database schema & queries", "Authentication & authorization"],
  },
  {
    id: 5,
    number: "05",
    title: "Launch & Handover",
    time: "(2 Hours)",
    description:
      "We ship it. I set up deployment, walk you through the codebase, and hand over documentation so your team can maintain and extend the product confidently.",
    points: ["Deployment & CI/CD", "Code walkthrough & docs", "Monitoring and backups"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO, Google",
    quote:
      "Amazing results with Nasim's full stack development. Nasim is a top-notch engineer who built a fast, reliable application for my business. He was attentive to my needs and provided excellent communication throughout the entire process.",
  },
  {
    id: 2,
    name: "Sara Jones",
    role: "CEO, Webflow",
    quote:
      "Working with Nasim on our platform was an incredible experience. Nasim took the time to understand our requirements and turned them into a clean, scalable architecture that our team can actually maintain.",
    featured: true,
  },
  {
    id: 3,
    name: "John Anderson",
    role: "CEO, Intuit",
    quote:
      "Professional, collaborative engineering experience with Nasim. I had the pleasure of working with Nasim on a full stack build and was blown away by how smoothly the frontend, API, and database came together.",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "CEO, Relume",
    quote:
      "Nasim is an incredibly talented full stack developer who brings a unique perspective to every project. His expertise across frontend, backend, and deployment is truly impressive.",
    featured: true,
  },
  {
    id: 5,
    name: "Mike Smith",
    role: "CEO, Sendlane",
    quote:
      "Full stack delivery that stands out from the crowd. Nasim's engineering and API work helped my business launch faster and scale without the usual technical headaches.",
  },
  {
    id: 6,
    name: "Jessica Lee",
    role: "CEO, Webflow",
    quote:
      "Nasim's full stack work has been a game-changer for my business. He rebuilt our backend, improved load times dramatically, and gave us a codebase we can confidently build on.",
    featured: true,
  },
];

export const clientLogos: ClientLogo[] = [
  { name: "Spotify", logo: "spotify" },
  { name: "Slack", logo: "slack" },
  { name: "Zendesk", logo: "zendesk" },
  { name: "Bank of America", logo: "bofa" },
  { name: "Upwork", logo: "upwork" },
  { name: "Notion", logo: "notion" },
];
