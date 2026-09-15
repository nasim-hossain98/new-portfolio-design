import { useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Asterisk, CodeXml, PenTool, Plus, Search } from "lucide-react";
import { services } from "../../data/portfolioData";
import type { Service } from "../../types";
import { easings, cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const ACCENT = "200, 169, 126";

type IconComponent = React.ComponentType<{
  className?: string;
  size?: number;
  strokeWidth?: number;
}>;

const SERVICE_ICONS: Record<number, IconComponent> = {
  1: PenTool,
  2: CodeXml,
  3: Search,
};

const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: "Services" },
  { text: "built" },
  { text: "to" },
  { text: "make" },
  { text: "your" },
  { text: "brand" },
  { text: "unmistakable", accent: true },
];

/** Index of the accordion panel open on first view (Development) */
const DEFAULT_EXPANDED = 1;

/* staggered reveal for panel content */
const panelContainer = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const panelItem = {
  closed: { opacity: 0, y: 16 },
  open: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easings.expo } },
};

export function ServicesSection() {
  const [expanded, setExpanded] = useState<number | null>(DEFAULT_EXPANDED);
  const listRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  /* accent progress line that draws across the list while scrolling */
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.9", "end 0.5"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const dotLeft = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section
      id="services"
      className="relative z-10 overflow-hidden bg-cinema-black section-padding"
    >
      {/* ----------------------------------------------------- backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* drifting glows */}
        <motion.div
          className="absolute -bottom-48 left-[4%] h-[30rem] w-[30rem] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${ACCENT},0.05) 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
          animate={
            reduced
              ? undefined
              : { y: [0, -40, 0], opacity: [0.4, 0.8, 0.4] }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* fine dot grid, faded toward the edges */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(240,240,245,0.045) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 35%, black, transparent)",
          }}
        />
      </div>

      {/* ----------------------------------------------------- content */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-0">
        {/* header */}
        <div className="relative mb-14 md:mb-20">
          {/* slowly rotating asterisk */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 right-0 hidden select-none text-cinema-accent/30 lg:block"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              <Asterisk className="h-9 w-9" strokeWidth={1.25} />
            </motion.span>
          )}

          <motion.div
            className="mb-5 flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: easings.cinematic }}
          >
            <span className="font-accent text-sm italic text-cinema-accent">(01)</span>
            <span aria-hidden="true" className="h-px w-10 bg-cinema-accent/40" />
            <span className="font-display text-[11px] uppercase tracking-[0.25em] text-cinema-muted">
              What I do
            </span>
          </motion.div>

          <h2 className="max-w-5xl font-display text-display-lg font-medium leading-[1.05] text-cinema-text">
            {HEADLINE.map((word, i) => (
              <MaskedWord
                key={word.text}
                delay={i * 0.06}
                className={cn(
                  word.accent &&
                    "bg-gradient-to-r from-cinema-accent via-[#ead6a9] to-cinema-accent bg-clip-text font-accent font-light italic text-transparent [font-size:1.06em]"
                )}
              >
                {word.text}
              </MaskedWord>
            ))}
          </h2>

          <motion.p
            className="mt-6 max-w-md font-display text-sm leading-relaxed text-cinema-muted"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: easings.cinematic, delay: 0.15 }}
          >
            Three disciplines, one goal: a web presence that feels like your brand and
            performs like your best salesperson.
          </motion.p>
        </div>

        {/* accordion — opens on hover; click still toggles for keyboard/touch */}
        <div
          ref={listRef}
          className="relative border-t border-cinema-muted/20"
          onMouseLeave={() => setExpanded(DEFAULT_EXPANDED)}
        >
          {/* scroll progress line + comet dot */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-cinema-accent/0 via-cinema-accent to-cinema-accent/0 shadow-[0_0_14px_rgba(200,169,126,0.35)]"
            style={{ scaleX: reduced ? 1 : lineScale }}
          />
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute top-0 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cinema-accent shadow-[0_0_14px_rgba(200,169,126,0.9)]"
              style={{ left: dotLeft }}
            />
          )}

          {services.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={i}
              expanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
              onMouseEnter={() => setExpanded(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- masked word */

function MaskedWord({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={cn("inline-block will-change-transform", className)}
        initial={reduced ? false : { y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: easings.expo, delay }}
      >
        {children}
        {"\u00A0"}
      </motion.span>
    </span>
  );
}

/* --------------------------------------------------------- row */

interface ServiceRowProps {
  service: Service;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
}

function ServiceRow({
  service,
  index,
  expanded,
  onToggle,
  onMouseEnter,
}: ServiceRowProps) {
  const reduced = useReducedMotion();
  const panelId = `service-panel-${service.id}`;
  const Icon = SERVICE_ICONS[service.id] ?? PenTool;
  const delay = index * 0.08;

  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      className="border-b border-cinema-muted/20 transition-colors duration-500 hover:border-cinema-accent/20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easings.cinematic, delay }}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="group relative flex w-full items-center gap-4 px-1 py-8 text-left transition-colors duration-500 md:gap-6 md:py-12 hover:bg-cinema-text/[0.03] focus-visible:bg-cinema-text/[0.03] focus-visible:outline-none"
      >
        {/* gradient sweep on hover / expanded */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-cinema-accent/[0.07] to-transparent transition-opacity duration-700",
            expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />

        {/* left accent line — glows when expanded */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-0 top-0 h-full w-px transition-all duration-500",
            expanded
              ? "bg-cinema-accent/70 shadow-[0_0_16px_rgba(200,169,126,0.45)]"
              : "bg-cinema-accent/0 group-hover:bg-cinema-accent/60"
          )}
        />

        {/* ghost number — faint by default, slides in on hover */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 select-none font-display text-[clamp(5rem,10vw,9rem)] font-semibold leading-none text-cinema-text transition-[opacity,transform] duration-700 md:block",
            expanded
              ? "-translate-x-1 opacity-[0.07]"
              : "opacity-[0.04] group-hover:-translate-x-2 group-hover:opacity-[0.1]"
          )}
        >
          {service.number}
        </span>

        {/* number + icon badge */}
        <span className="relative z-10 flex shrink-0 items-center gap-3 md:gap-4">
          <span
            className={cn(
              "font-accent text-sm italic transition-colors duration-500 md:text-base",
              expanded
                ? "text-cinema-accent"
                : "text-cinema-muted/70 group-hover:text-cinema-accent"
            )}
          >
            {service.number}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-9 items-center justify-center rounded-lg border transition-all duration-500 md:size-10",
              expanded
                ? "border-cinema-accent/60 bg-cinema-accent/[0.06] text-cinema-accent shadow-[0_0_18px_rgba(200,169,126,0.25)]"
                : "border-cinema-muted/20 text-cinema-muted group-hover:border-cinema-accent/50 group-hover:bg-cinema-accent/[0.04] group-hover:text-cinema-accent"
            )}
          >
            <Icon
              size={17}
              strokeWidth={2}
              className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
            />
          </span>
        </span>

        {/* title with masked reveal */}
        <h3
          className={cn(
            "relative z-10 min-w-0 flex-1 font-display font-medium tracking-tight transition-[color,transform] duration-500 group-hover:translate-x-2",
            expanded
              ? "text-cinema-accent"
              : "text-cinema-text group-hover:text-cinema-accent"
          )}
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block will-change-transform"
              initial={reduced ? false : { y: "112%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: easings.expo,
                delay: delay + 0.1,
              }}
            >
              {service.title.toUpperCase()}
            </motion.span>
          </span>
        </h3>

        {/* explore / close + rotating plus */}
        <span className="relative z-10 ml-auto flex shrink-0 items-center gap-3">
          <span className="hidden font-display text-[10px] uppercase tracking-[0.2em] text-cinema-muted transition-colors duration-300 group-hover:text-cinema-text md:block">
            {expanded ? "Close" : "Explore"}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.5, ease: easings.snappy }}
            className={cn(
              "flex size-9 items-center justify-center rounded-full border transition-colors duration-500",
              expanded
                ? "border-cinema-accent/60 bg-cinema-accent/10 text-cinema-accent shadow-[0_0_18px_rgba(200,169,126,0.3)]"
                : "border-cinema-muted/20 text-cinema-text group-hover:border-cinema-accent/50 group-hover:text-cinema-accent"
            )}
          >
            <Plus size={15} strokeWidth={2} />
          </motion.span>
        </span>
      </button>

      {/* panel */}
      <motion.div
        id={panelId}
        role="region"
        aria-label={`${service.title} details`}
        className="overflow-hidden"
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{
          duration: reduced ? 0 : 0.6,
          ease: easings.expo,
        }}
      >
        <motion.div
          variants={reduced ? undefined : panelContainer}
          initial={reduced ? false : "closed"}
          animate={expanded ? "open" : "closed"}
          className="grid gap-8 px-1 pb-12 pt-2 md:grid-cols-12 md:gap-6 md:pb-16"
        >
          <motion.p
            variants={panelItem}
            className="border-l border-cinema-accent/25 pl-4 font-display text-sm leading-relaxed text-cinema-muted md:col-span-6 md:col-start-3 md:pl-5"
          >
            {service.description}
          </motion.p>

          {service.tags && service.tags.length > 0 && (
            <motion.div
              variants={panelItem}
              className="md:col-span-3 md:col-start-10"
            >
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-cinema-muted/70">
                Key deliverables
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-pill border border-cinema-muted/20 px-3.5 py-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-cinema-muted transition-colors duration-300 hover:border-cinema-accent/45 hover:text-cinema-text"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.a
            variants={panelItem}
            href={service.link}
            className="group/link inline-flex w-fit items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-cinema-accent transition-colors duration-300 hover:text-cinema-text focus-visible:text-cinema-text focus-visible:outline-none md:col-span-6 md:col-start-3"
          >
            <span className="relative">
              {service.linkText.toUpperCase()}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1.5 h-px origin-left scale-x-0 bg-cinema-accent/60 transition-transform duration-300 ease-out group-hover/link:scale-x-100"
              />
            </span>
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
