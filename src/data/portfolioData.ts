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
  title: "UI/UX Design & Frontend Design",
  email: "hello@arik.design",
  phone: "+1 234 567 890",
  location: "Remote / Worldwide",
  bio: "Premium web design, Webflow, and SEO services to help your business stand out.",
  socials: {
    github: "https://github.com/arik",
    linkedin: "https://linkedin.com/in/arik",
    twitter: "https://twitter.com/arik",
    instagram: "https://instagram.com/arik",
    dribbble: "https://dribbble.com/arik",
    behance: "https://behance.net/arik",
  },
};

export const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Web Design",
    description:
      "Visually stunning web designs that captivate your audience by blending your brand voice and customer needs.",
    link: "#services",
    linkText: "About Webdesign",
    tags: ["UX Design", "Wireframe", "Interactive Prototype", "Responsive Design"],
  },
  {
    id: 2,
    number: "02",
    title: "Development",
    description:
      "Get custom web development solutions that are tailored to your specifications, designed to deliver a flawless user experience.",
    link: "#services",
    linkText: "About Webflow",
    tags: ["Custom Development", "Responsive Frontend", "CMS Integration", "Motion & Animation"],
  },
  {
    id: 3,
    number: "03",
    title: "Content & SEO",
    description:
      "Proven SEO strategies that enhance your online performance, bringing you to the forefront of organic search results.",
    link: "#services",
    linkText: "About SEO",
    tags: ["Keyword Research", "On-page SEO", "Content Strategy", "Performance Tracking"],
  },
];

export const projects: Project[] = [
  { id: 1, title: "Taskez", category: "Webdesign", image: "/project1.jpg", year: "2025" },
  { id: 2, title: "Magnum AI", category: "Webdesign", image: "/project2.jpg", year: "2025" },
  { id: 3, title: "Last.fm", category: "Webdesign", image: "/project3.jpg", year: "2024" },
  { id: 4, title: "Cola", category: "Webdesign", image: "/project4.jpg", year: "2024" },
];

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    number: "01",
    title: "Discovery Call",
    time: "(1 Hour)",
    description:
      "Before we start, we determine if and how I can help you. What do you need assistance with and what goals do you have for your website?",
    points: [
      "We get to know each other better",
      "Determine how I can best assist you",
      "Understand the goals you have for your website",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Concept & Strategy",
    time: "(1 Week)",
    description:
      "Together, we develop a strategy that successfully combines your goals and brand voice. I also present the wireframes with an interactive structure.",
    points: ["UX Design", "Wireframe", "Interactive Prototype"],
  },
  {
    id: 3,
    number: "03",
    title: "Web Design",
    time: "(2 Weeks)",
    description:
      "Now utilizes the magic. Based on the previously developed concept, I create a high-end, unique web presence for your brand. It will feel like your brand and shine like your brand.",
    points: ["High-end web design tailored to your brand", "Interactive prototype of the design"],
  },
  {
    id: 4,
    number: "04",
    title: "Development",
    time: "(2 Weeks)",
    description:
      "In this step, we breathe life into your new high-end web presence. I will develop your web presence with the best web design system CMS integration.",
    points: ["Custom hand-written website", "Modular web design system", "CMS integration"],
  },
  {
    id: 5,
    number: "05",
    title: "Website Onboarding",
    time: "(2 Hours)",
    description:
      "In a personal 1-hour workshop, I will show you how to make changes to your new website quickly and easily. Additionally, you will receive personalized video tutorials.",
    points: ["Personal Workshop", "Personalized video tutorials", "CMS and plugin presets on your website"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO, Google",
    quote:
      "Amazing Results with Arik's Premium Web Design Services. Arik is a top-notch web designer who created a stunning website for my business. He was attentive to my needs and provided excellent customer service throughout the entire process.",
  },
  {
    id: 2,
    name: "Sara Jones",
    role: "CEO, Webflow",
    quote:
      "Working with Arik on my website was an incredible experience. Arik took the time to understand my unique vision and goals for the website and translated them into a beautiful, functional design.",
    featured: true,
  },
  {
    id: 3,
    name: "John Anderson",
    role: "CEO, Intuit",
    quote:
      "Professional, Collaborative Web Design Experience with Arik. I had the pleasure of working with Arik on a website development project and was blown away by the results.",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "CEO, Relume",
    quote:
      "Arik is an incredibly talented web designer who brings a unique perspective to every project. Arik's expertise in both design and development is truly impressive.",
    featured: true,
  },
  {
    id: 5,
    name: "Mike Smith",
    role: "CEO, Sendlane",
    quote:
      "Web Design and Content Solutions: Stand Out from the Crowd. Arik's web design and SEO services have helped my business thrive in the digital landscape.",
  },
  {
    id: 6,
    name: "Jessica Lee",
    role: "CEO, Webflow",
    quote:
      "Arik's SEO services have been a game-changer for my business. He has helped me improve my search engine rankings and drive more traffic to my website.",
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
