import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export interface InteractiveLink {
  /** Large editorial label, animated letter by letter on hover */
  heading: string;
  /** Supporting line revealed under the heading */
  subheading: string;
  /** Preview image that trails the pointer (desktop) / sits inline (mobile) */
  imgSrc: string;
  href: string;
  /** Optional right-aligned kicker, e.g. "Web Design" */
  meta?: string;
  /** Optional right-aligned detail chips, e.g. ["UI/UX", "SaaS"] */
  tags?: string[];
}

interface InteractiveHoverLinksProps {
  links?: InteractiveLink[];
  className?: string;
  /** Eyebrow shown beside the hairline above the list (defaults to "NN Projects") */
  label?: string;
}

/**
 * Editorial project index: oversized rows where the heading letters slide apart,
 * an accent wash wipes in from the left, and a preview image trails the pointer
 * on a spring. Falls back to an inline thumbnail + static arrow on touch.
 */
export function InteractiveHoverLinks({
  links = INTERACTIVE_LINKS,
  className,
  label,
}: InteractiveHoverLinksProps) {
  const reduced = useReducedMotion();
  const countLabel =
    label ?? `${String(links.length).padStart(2, "0")} Projects`;

  return (
    <div className={cn("w-full", className)}>
      {/* list header */}
      <motion.div
        className="mb-8 flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="label text-cinema-accent">{countLabel}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-cinema-accent/30 to-transparent" />
        <span className="label hidden text-cinema-text/25 md:inline">
          Hover to preview
        </span>
      </motion.div>

      <div className="border-t border-cinema-text/10">
        {links.map((link, index) => (
          <HoverLinkRow
            key={link.heading}
            link={link}
            index={index}
            reduced={reduced}
          />
        ))}
      </div>
    </div>
  );
}

function HoverLinkRow({
  link,
  index,
  reduced,
}: {
  link: InteractiveLink;
  index: number;
  reduced: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 170,
    damping: 24,
    mass: 0.5,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 170,
    damping: 24,
    mass: 0.5,
  });

  const imageTop = useTransform(smoothY, [-0.5, 0.5], ["34%", "68%"]);
  const imageLeft = useTransform(smoothX, [-0.5, 0.5], ["44%", "66%"]);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const letterShift = reduced ? 0 : 14;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.75,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.a
        ref={ref}
        href={link.href}
        data-cursor="view"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetPointer}
        initial="initial"
        whileHover="whileHover"
        whileFocus="whileHover"
        className="group relative flex items-center justify-between gap-5 border-b border-cinema-text/10 py-6 md:gap-8 md:py-9"
      >
        {/* accent wash + sliding hairline */}
        <span className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full origin-left scale-x-0 bg-gradient-to-r from-cinema-accent/[0.08] via-cinema-accent/[0.02] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        <span className="pointer-events-none absolute -bottom-px left-0 z-20 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cinema-accent via-cinema-accent/40 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />

        {/* heading block */}
        <div className="relative z-20 flex min-w-0 items-baseline gap-4 md:gap-8">
          <span className="label shrink-0 pt-1.5 text-cinema-text/25 transition-colors duration-500 group-hover:text-cinema-accent md:pt-2">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: reduced ? 0 : -10 },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
                staggerChildren: 0.035,
                delayChildren: 0.08,
              }}
              className="relative z-10 block font-display text-[clamp(2rem,5.4vw,3.6rem)] font-light leading-[1.02] tracking-[-0.03em] text-cinema-text/55 transition-colors duration-500 group-hover:text-cinema-text group-focus-visible:text-cinema-text"
            >
              {link.heading.split("").map((letter, i) => (
                <motion.span
                  key={`${link.heading}-${i}`}
                  variants={{
                    initial: { x: 0 },
                    whileHover: { x: letterShift },
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>

            <motion.span
              variants={{
                initial: { x: 0, opacity: 0.7 },
                whileHover: { x: letterShift, opacity: 1 },
              }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="mt-2 block max-w-md text-sm leading-relaxed text-cinema-muted transition-colors duration-500 group-hover:text-cinema-text/80 group-focus-visible:text-cinema-text/80"
            >
              {link.subheading}
            </motion.span>
          </div>
        </div>

        {/* meta + thumbnail + arrow */}
        <div className="relative z-20 flex shrink-0 items-center gap-4 md:gap-6">
          <div className="hidden flex-col items-end gap-2 text-right lg:flex">
            {link.meta ? (
              <span className="label text-cinema-accent/70 transition-colors duration-500 group-hover:text-cinema-accent">
                {link.meta}
              </span>
            ) : null}
            {link.tags?.length ? (
              <span className="text-[11px] tracking-wide text-cinema-text/30 transition-colors duration-500 group-hover:text-cinema-text/55">
                {link.tags.join(" · ")}
              </span>
            ) : null}
          </div>

          {/* touch fallback — desktop uses the pointer-trailing preview instead */}
          <span className="block h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-cinema-text/10 md:hidden">
            <img
              src={link.imgSrc}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </span>

          <div className="hidden overflow-hidden md:block">
            <motion.div
              variants={{
                initial: { x: "70%", opacity: 0 },
                whileHover: { x: "0%", opacity: 1 },
              }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-cinema-text/15 bg-cinema-text/[0.02] text-cinema-text/45 transition-colors duration-500 group-hover:border-cinema-accent/60 group-hover:bg-cinema-accent/10 group-hover:text-cinema-accent lg:size-14">
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45 lg:size-5" />
              </span>
            </motion.div>
          </div>

          <ArrowUpRight className="size-5 text-cinema-text/40 md:hidden" />
        </div>

        {/* pointer-trailing preview */}
        <motion.img
          aria-hidden="true"
          alt=""
          src={link.imgSrc}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            top: imageTop,
            left: imageLeft,
            translateX: "-50%",
            translateY: "-50%",
          }}
          variants={{
            initial: { opacity: 0, scale: 0.8, rotate: "-8deg" },
            whileHover: { opacity: 1, scale: 1, rotate: "6deg" },
          }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="pointer-events-none absolute z-10 hidden h-44 w-64 rounded-2xl border border-cinema-text/10 object-cover shadow-[0_28px_70px_-20px_rgba(0,0,0,0.9)] md:block"
        />
      </motion.a>
    </motion.div>
  );
}

/** Fallback set — pass `links` to render your own index instead. */
export const INTERACTIVE_LINKS: InteractiveLink[] = [
  {
    heading: "Services",
    subheading: "Discover what we do — strategy, design, and motion.",
    imgSrc:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    href: "#",
    meta: "Capabilities",
    tags: ["Strategy", "Design", "Motion"],
  },
  {
    heading: "Team",
    subheading: "Meet the people behind every shipped detail.",
    imgSrc:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    href: "#",
    meta: "Studio",
    tags: ["Designers", "Engineers"],
  },
  {
    heading: "Projects",
    subheading: "Explore the recent work and the thinking behind it.",
    imgSrc:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    href: "#",
    meta: "Portfolio",
    tags: ["Case studies"],
  },
  {
    heading: "Careers",
    subheading: "Join a small team that cares about craft.",
    imgSrc:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    href: "#",
    meta: "Open roles",
    tags: ["Remote friendly"],
  },
  {
    heading: "Playground",
    subheading: "Experiments, prototypes, and side quests.",
    imgSrc:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=80",
    href: "#",
    meta: "Lab",
    tags: ["WebGL", "Type"],
  },
];