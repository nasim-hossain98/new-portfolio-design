import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ALL_WORKS, type WorkEntry } from "../data/allWorks";
import { navigate } from "../lib/router";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { easings } from "../lib/utils";

/**
 * All Works — full project index rendered as glassmorphic cards.
 * Reached from the "Explore More Work" button on the home page.
 */
export function AllWorksPage() {
  const reduced = useReducedMotion();
  const count = String(ALL_WORKS.length).padStart(2, "0");

  useEffect(() => {
    const previous = document.title;
    document.title = "All Works — Nasim Hossain";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <section className="relative z-10 overflow-hidden bg-cinema-black pb-28 pt-28 md:pb-40 md:pt-40">
      {/* ------------------------------------------------------ backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-[10%] -top-[18%] h-[36rem] w-[36rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.13) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute -right-[12%] top-[22%] h-[32rem] w-[32rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.11) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(244,114,182,0.09) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(240,240,245,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 30%, black, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* --------------------------------------------------- back link */}
        <motion.button
          type="button"
          onClick={() => navigate("home")}
          initial={reduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.expo }}
          className="group inline-flex items-center gap-2 rounded-full border border-cinema-text/15 bg-cinema-text/[.025] px-4 py-2 text-cinema-text/80 backdrop-blur-md transition-all duration-300 hover:border-cinema-accent/50 hover:bg-cinema-accent/[.07] hover:text-cinema-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-accent/50"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="label">Back to home</span>
        </motion.button>

        {/* ------------------------------------------------------- header */}
        <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-12">
          <motion.div
            className="md:col-span-8"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easings.cinematic }}
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="label text-cinema-accent">All works</span>
              <span className="h-px w-14 bg-gradient-to-r from-cinema-accent/70 to-transparent" />
              <span className="label text-cinema-text/30">{count} projects</span>
            </div>
            <h1 className="max-w-[820px] font-display text-[clamp(3rem,7.5vw,7rem)] font-light leading-[0.9] tracking-[-0.04em] text-cinema-text">
              Every project,
              <span className="mt-2 block pl-[6%] italic text-cinema-accent md:mt-3">
                one place.
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="max-w-sm text-sm leading-7 text-cinema-muted md:col-span-4 md:justify-self-end md:text-right"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: easings.cinematic }}
          >
            Ten builds across growth, finance, web3, health and play — each one
            shaped around the people who actually use it. Open a live site where
            it is public.
          </motion.p>
        </div>

        {/* --------------------------------------------------- card grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {ALL_WORKS.map((work, index) => (
            <WorkCard key={work.slug} work={work} index={index} />
          ))}
        </div>

        {/* ---------------------------------------------------------- cta */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-5 text-center md:mt-28"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easings.cinematic }}
        >
          <p className="font-display text-2xl font-light text-cinema-text md:text-3xl">
            Have a project that belongs on this wall?
          </p>
          <button
            type="button"
            onClick={() => navigate("home", "#contact")}
            className="group inline-flex items-center gap-3 rounded-full border border-cinema-text/15 bg-cinema-text/[.025] px-6 py-3 text-cinema-text backdrop-blur-md transition-all duration-300 hover:border-cinema-accent/50 hover:bg-cinema-accent/[.07] hover:text-cinema-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-accent/50"
          >
            <span className="label">Start a project</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- card */

function WorkCard({ work, index }: { work: WorkEntry; index: number }) {
  const reduced = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const accent = work.accent;

  return (
    <motion.article
      data-cursor={work.href ? "view" : undefined}
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        ease: easings.cinematic,
        delay: (index % 3) * 0.08,
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl transition-[transform,border-color,background-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.06] focus-within:border-cinema-accent/50 focus-within:bg-white/[0.06]"
      style={{ boxShadow: "0 24px 60px -34px rgba(0,0,0,0.9)" }}
    >
      {/* accent glow, blooms on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 85% at 50% 0%, rgba(${accent},0.18), transparent 68%)`,
        }}
      />

      {/* stretched link keeps the whole card clickable */}
      {work.href && (
        <a
          href={work.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${work.title} — open live site in a new tab`}
          className="absolute inset-0 z-20 rounded-3xl focus-visible:outline-none"
        />
      )}

      {/* -------------------------------------------------------- media */}
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <img
          src={work.image}
          alt={`${work.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover opacity-55 saturate-[.85] transition-[transform,opacity,filter] duration-700 ease-smooth group-hover:scale-[1.07] group-hover:opacity-80 group-hover:saturate-100"
        />
        {/* fade into the glass body */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/50 to-transparent"
        />
        {/* per-project colour wash */}
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-45 mix-blend-soft-light"
          style={{
            background: `linear-gradient(140deg, rgba(${accent},0.6), transparent 62%)`,
          }}
        />
        {/* glass sheen along the top edge */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        {/* ghost index */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-3 select-none font-display text-5xl font-semibold leading-none text-white/10 transition-all duration-700 group-hover:text-white/25"
        >
          {number}
        </span>
      </div>

      {/* --------------------------------------------------------- body */}
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="label" style={{ color: `rgb(${accent})` }}>
            {work.category}
          </span>
          {work.href ? (
            <span className="label flex items-center gap-2 text-cinema-text/55">
              <span className="size-1.5 animate-pulse rounded-full bg-cinema-accent" />
              Live
            </span>
          ) : (
            <span className="label text-cinema-text/30">Case study</span>
          )}
        </div>

        <h2 className="font-display text-2xl font-medium leading-tight text-cinema-text transition-colors duration-500 group-hover:text-cinema-accent md:text-[1.75rem]">
          {work.title}
        </h2>

        <p className="text-sm leading-relaxed text-cinema-text/65">
          {work.description}
        </p>

        <ul className="mt-1 flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-pill border border-cinema-muted/25 px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.15em] text-cinema-text/55 transition-colors duration-300 group-hover:border-cinema-accent/35"
            >
              {tag}
            </li>
          ))}
        </ul>

        {work.href && (
          <span className="mt-4 inline-flex items-center gap-2 self-start text-[11px] font-medium uppercase tracking-[0.18em] text-cinema-accent">
            View live site
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </span>
        )}
      </div>

      {/* ------------------------------------------------- shine sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-[1200ms] ease-smooth group-hover:translate-x-full"
      />
    </motion.article>
  );
}
