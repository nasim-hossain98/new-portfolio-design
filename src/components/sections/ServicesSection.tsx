import { useRef, type ComponentType, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Code, Palette, TrendingUp } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { TiltCard } from "../ui/TiltCard";
import { services } from "../../data/portfolioData";
import type { Service } from "../../types";
import { easings } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>;

const SERVICE_ICONS: Record<number, IconComponent> = {
  1: Palette,
  2: Code,
  3: TrendingUp,
};

const ACCENT = "200, 169, 126";

export function ServicesSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="services"
      className="relative z-10 overflow-hidden bg-cinema-black py-24 md:py-32"
    >
      {/* ------------------------------------------------ cinematic backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* drifting glow orbs */}
        {reduced ? (
          <>
            <div
              className="absolute -top-32 left-[12%] h-[26rem] w-[26rem] rounded-full opacity-70"
              style={{
                background: `radial-gradient(circle, rgba(${ACCENT},0.06) 0%, transparent 70%)`,
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute -bottom-32 right-[8%] h-[30rem] w-[30rem] rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle, rgba(${ACCENT},0.05) 0%, transparent 70%)`,
                filter: "blur(56px)",
              }}
            />
          </>
        ) : (
          <>
            <motion.div
              className="absolute -top-32 left-[12%] h-[26rem] w-[26rem] rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${ACCENT},0.06) 0%, transparent 70%)`,
                filter: "blur(40px)",
              }}
              animate={{ y: [0, 48, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-32 right-[8%] h-[30rem] w-[30rem] rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${ACCENT},0.05) 0%, transparent 70%)`,
                filter: "blur(56px)",
              }}
              animate={{ y: [0, -40, 0], opacity: [0.4, 0.75, 0.4] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </>
        )}

        {/* nebula wash */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(${ACCENT},0.04) 0%, transparent 55%),
              radial-gradient(ellipse at 75% 80%, rgba(${ACCENT},0.03) 0%, transparent 55%)
            `,
          }}
        />

        {/* fine film-grain dot grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(240,240,245,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      {/* ------------------------------------------------------- content */}
      <div className="relative mx-auto max-w-container-page px-6">
        <SectionHeader
          label="My Services"
          title={
            <>
              What I <span className="italic text-cinema-accent">do</span>
            </>
          }
          description="Three disciplines, one goal — a website that represents your brand and converts your visitors."
        />

        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              className="h-full"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                ease: easings.cinematic,
                delay: i * 0.12,
              }}
            >
              <ServiceCard service={service} index={i} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ card */

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(50);
  const my = useMotionValue(30);

  /* soft interior spotlight that follows the pointer */
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(${ACCENT},0.10) 0%, transparent 65%)`;
  /* brighter gradient masked to the 1px border ring */
  const ringGlow = useMotionTemplate`radial-gradient(260px circle at ${mx}% ${my}%, rgba(${ACCENT},0.55) 0%, transparent 70%)`;

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const Icon = SERVICE_ICONS[service.id] ?? Palette;

  return (
    <TiltCard maxTilt={7} scale={1.03} className="group h-full rounded-card">
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-card border border-cinema-text/10 bg-gradient-to-b from-cinema-text/[0.05] via-cinema-text/[0.02] to-transparent transition-[border-color] duration-500 group-hover:border-cinema-accent/25"
      >
        {/* mouse spotlight */}
        {!reduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
        )}

        {/* glowing border ring that follows the pointer */}
        {!reduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: ringGlow,
              padding: 1,
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
            }}
          />
        )}

        {/* cinematic corner brackets */}
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 h-5 w-5 border-l border-t border-cinema-accent/25 transition-colors duration-500 group-hover:border-cinema-accent/70"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-cinema-accent/25 transition-colors duration-500 group-hover:border-cinema-accent/70"
        />

        {/* top sweep line on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-cinema-accent to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
        />

        {/* ------------------------------------------------------ content */}
        <div className="relative z-10 flex h-full flex-col p-8 md:p-9">
          {/* icon badge + ghost number */}
          <div className="relative">
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: easings.back,
                delay: 0.2 + index * 0.12,
              }}
              className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cinema-text/15 bg-cinema-text/[0.03] transition-colors duration-500 group-hover:border-cinema-accent/50 group-hover:bg-cinema-accent/10"
            >
              <Icon
                className="h-6 w-6 text-cinema-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </motion.span>

            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 0.85, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: easings.cinematic,
                delay: 0.3 + index * 0.12,
              }}
              className="pointer-events-none absolute -top-1 right-0 select-none font-display text-[6.5rem] font-light leading-[0.75]"
              style={{
                WebkitTextStroke: `1.5px rgba(${ACCENT},0.35)`,
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {service.number}
            </motion.span>
          </div>

          {/* title */}
          <h3 className="mt-9 font-display text-[1.9rem] font-light leading-tight tracking-wide text-cinema-text">
            {service.title}
          </h3>

          {/* description */}
          <p className="mt-4 text-[0.95rem] leading-relaxed text-cinema-text/60">
            {service.description}
          </p>

          {/* tags */}
          {service.tags && service.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <li
                  key={tag}
                  className="label rounded-pill border border-cinema-text/12 px-3 py-1.5 text-cinema-muted transition-colors duration-500 group-hover:border-cinema-accent/30 group-hover:text-cinema-text/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {/* flexible spacer — guarantees breathing room above the CTA */}
          <div aria-hidden="true" className="min-h-8 flex-1" />

          {/* CTA — full-width footer row */}
          <a
            href={service.link}
            aria-label={`${service.linkText} — ${service.title}`}
            className="flex items-center justify-between gap-4 border-t border-cinema-text/10 pt-6"
          >
            <span className="label text-cinema-muted transition-colors duration-500 group-hover:text-cinema-accent">
              {service.linkText}
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cinema-text/20 transition-all duration-500 group-hover:border-cinema-accent/60 group-hover:bg-cinema-accent/10">
              <ArrowUpRight
                size={20}
                strokeWidth={1.75}
                aria-hidden="true"
                className="text-cinema-text transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cinema-accent"
              />
            </span>
          </a>
        </div>
      </div>
    </TiltCard>
  );
}
