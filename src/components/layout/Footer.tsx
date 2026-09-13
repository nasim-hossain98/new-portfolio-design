import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaXTwitter, FaDribbble } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { personalInfo } from "../../data/portfolioData";
import { MagneticButton } from "../ui/MagneticButton";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";
import { useSmoothScroll } from "./SmoothScroll";
import { easings, cn } from "../../lib/utils";

const SOCIALS: { label: string; icon: IconType; href: string }[] = [
  { label: "Instagram", icon: FaInstagram, href: personalInfo.socials.instagram },
  { label: "Twitter", icon: FaXTwitter, href: personalInfo.socials.twitter },
  { label: "Dribbble", icon: FaDribbble, href: personalInfo.socials.dribbble },
];

const PAGES = ["Home", "Services", "Work", "Process", "About", "Contact"];
const RESOURCES = ["Style Guide", "Licensing", "Changelog"];

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const { ref, controls } = useInViewAnimation<HTMLDivElement>({
    amount: 0.2,
    variantsMode: true,
  });

  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-cinema-text/10 bg-cinema-black">
      {/* giant wordmark */}
      <div className="pointer-events-none select-none overflow-hidden border-b border-cinema-text/10">
        <motion.p
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: easings.expo }}
          className="whitespace-nowrap text-center text-[18vw] leading-none font-light tracking-tight text-cinema-text/[0.045]"
        >
          NASIM HOSSAIN
        </motion.p>
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        className="mx-auto grid max-w-container-page gap-12 px-6 py-14 md:grid-cols-12 md:py-16"
      >
        {/* brand + socials */}
        <div className="md:col-span-5">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="label text-cinema-muted"
          >
            {personalInfo.location}
          </motion.span>
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 } },
            }}
            className="mt-4 max-w-sm text-2xl font-normal leading-snug text-cinema-text"
          >
            Designing websites that feel like your brand — and perform like a machine.
          </motion.h3>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.16 },
              },
            }}
            className="mt-8 flex gap-3"
          >
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-cinema-text/15 text-cinema-muted transition-all duration-300 hover:-translate-y-1 hover:border-cinema-accent/60 hover:text-cinema-accent"
              >
                <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* sitemap */}
        <motion.nav
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } },
          }}
          className="md:col-span-3"
        >
          <h4 className="label mb-6 text-cinema-muted">Sitemap</h4>
          <ul className="flex flex-col gap-3">
            {PAGES.map((page) => (
              <li key={page}>
                <button
                  onClick={() => scrollTo(`#${page.toLowerCase()}`)}
                  className="label group relative text-cinema-text/70 transition-colors hover:text-cinema-accent"
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* resources */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.16 } },
          }}
          className="md:col-span-2"
        >
          <h4 className="label mb-6 text-cinema-muted">Utility</h4>
          <ul className="flex flex-col gap-3">
            {RESOURCES.map((item) => (
              <li key={item}>
                <a href="#" className="label text-cinema-text/70 transition-colors hover:text-cinema-accent">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* contact */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.22 } },
          }}
          className="flex flex-col items-start gap-4 md:col-span-2 md:items-end"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="label group inline-flex items-center gap-2 text-cinema-text transition-colors hover:text-cinema-accent"
          >
            {personalInfo.email}
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <MagneticButton
            variant="outline"
            onClick={() => scrollTo("#home")}
            className="mt-2"
          >
            To top <ArrowUp size={14} />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* bottom bar */}
      <div
        className={cn(
          "border-t border-cinema-text/10",
          "mx-auto flex max-w-container-page flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row"
        )}
      >
        <p className="label text-cinema-muted">
          © {year} {personalInfo.name}. All rights reserved.
        </p>
        <p className="label text-cinema-muted">
          Designed &amp; built with <span className="text-cinema-accent">precision</span>
        </p>
      </div>
    </footer>
  );
}
