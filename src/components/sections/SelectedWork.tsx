import { Component, lazy, Suspense, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import {
  InteractiveHoverLinks,
  type InteractiveLink,
} from "@/components/ui/interactive-hover-links";

const InfiniteGallery = lazy(
  () => import("@/components/ui/3d-gallery-photography")
);

const ACCENT = "var(--color-cinema-accent)";

/* ── preview imagery for the project index (Unsplash) ──── */
const projectImages = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
];

/** Projects rendered as an interactive hover index */
const workLinks: InteractiveLink[] = PROJECTS.map((project, index) => ({
  heading: project.title,
  subheading: project.subtitle,
  imgSrc: projectImages[index % projectImages.length],
  href: project.href ?? "#work-grid",
  meta: project.category,
  tags: project.tags,
}));

/* ── gallery images for 3D scene ───────────────────────── */
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    alt: "Abstract architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    alt: "Starry mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    alt: "Foggy forest",
  },
  {
    src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
    alt: "Green valley",
  },
  {
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    alt: "Ocean cliff",
  },
  {
    src: "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=800&q=80",
    alt: "Northern lights",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Tropical beach",
  },
];

/* ── Catches WebGL / texture-loading failures so the page never blanks ── */
class GalleryErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ── Main section ──────────────────────────────────────── */
export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sceneY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const ambientY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-10 overflow-hidden bg-cinema-black pb-32 pt-24 md:pb-44 md:pt-36"
    >
      {/* ambient glow */}
      <motion.div
        className="pointer-events-none absolute -top-[30%] left-1/2 -z-10 h-[70vh] w-[120vw] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          y: reduced ? 0 : ambientY,
          background: `radial-gradient(ellipse, ${ACCENT}33, transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* ── Section header ─────────────────────── */}
        <div className="mb-14 grid items-end gap-10 md:mb-20 md:grid-cols-12">
          {/* Left column – title */}
          <motion.div
            className="relative md:col-span-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="label text-cinema-accent">Selected portfolio</span>
              <span className="h-px w-14 bg-gradient-to-r from-cinema-accent/70 to-transparent" />
              <span className="label text-cinema-text/30">
                {String(PROJECTS.length).padStart(2, "0")} case studies
              </span>
            </div>
            <h2 className="max-w-[820px] font-display text-[clamp(3.75rem,8vw,7.8rem)] font-light leading-[0.82] tracking-[-0.045em] text-cinema-text">
              Work that
              <span className="mt-3 block pl-[10%] italic text-cinema-accent md:mt-5">
                moves people.
              </span>
            </h2>
          </motion.div>

          {/* Right column – description + CTA */}
          <motion.div
            className="flex flex-col gap-7 md:col-span-4 md:items-end"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <p className="max-w-sm text-sm leading-7 text-cinema-muted md:text-right">
              A curated collection of digital experiences where clear strategy,
              expressive design, and thoughtful motion meet.
            </p>
            <a
              href="#work-grid"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-cinema-text/15 bg-cinema-text/[.025] px-5 py-3 text-cinema-text transition-all duration-300 hover:border-cinema-accent/50 hover:bg-cinema-accent/[.07] hover:text-cinema-accent"
            >
              <span className="label">Explore projects</span>
              <ArrowDown
                size={15}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>
          </motion.div>
        </div>

        {/* ── 3D Gallery ─────────────────────────── */}
        <motion.div
          className="relative mb-20 md:mb-28"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[.06]">
            <Suspense
              fallback={
                <div className="flex h-[70vh] items-center justify-center bg-cinema-surface">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-cinema-accent border-t-transparent" />
                    <span className="text-xs text-cinema-muted">Loading gallery…</span>
                  </div>
                </div>
              }
            >
              <GalleryErrorBoundary
                fallback={
                  <div className="flex h-[70vh] items-center justify-center bg-cinema-surface">
                    <div className="flex max-w-sm flex-col items-center gap-4 px-6 text-center">
                      <span className="label text-cinema-accent">
                        Gallery unavailable
                      </span>
                      <p className="text-sm leading-relaxed text-cinema-muted">
                        The 3D gallery could not load in this browser — the
                        selected projects below are still available.
                      </p>
                    </div>
                  </div>
                }
              >
                <InfiniteGallery
                  images={galleryImages}
                  speed={1.2}
                  visibleCount={12}
                  className="h-[70vh] w-full"
                />
              </GalleryErrorBoundary>
            </Suspense>

            {/* Overlay text on gallery */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
              <h3 className="font-serif text-3xl md:text-6xl tracking-tight italic">
                I create; therefore I am
              </h3>
            </div>

            {/* Navigation hint at bottom */}
            <div className="pointer-events-none absolute bottom-6 left-0 right-0 text-center font-mono uppercase text-[11px] font-semibold text-white/60">
              <p>Use mouse wheel, arrow keys, or touch to navigate</p>
              <p className="mt-1 opacity-60">
                Auto-play resumes after 3 seconds of inactivity
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Project index ─────────────────────── */}
        <motion.div
          id="work-grid"
          style={{
            y: reduced ? 0 : sceneY,
            scale: reduced ? 1 : sceneScale,
            opacity: reduced ? 1 : sceneOpacity,
          }}
        >
          <InteractiveHoverLinks links={workLinks} />
        </motion.div>

        {/* ── Explore more CTA ──────────────────── */}
        <motion.div
          className="mt-16 flex justify-center md:mt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="#/works"
            data-cursor="view"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full px-9 py-4 text-cinema-text transition-colors duration-500 hover:text-cinema-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-accent/50"
          >
            {/* soft outer glow on hover */}
            <span className="pointer-events-none absolute -inset-6 z-0 rounded-full bg-cinema-accent/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

            {/* thin gradient border ring (stays visible, brightens on hover) */}
            <span className="pointer-events-none absolute inset-0 z-0 rounded-full bg-gradient-to-r from-cinema-text/20 via-cinema-text/[.06] to-cinema-text/20 p-px transition-all duration-500 group-hover:from-cinema-accent/70 group-hover:via-cinema-accent/20 group-hover:to-cinema-accent/70">
              <span className="block h-full w-full rounded-full bg-transparent" />
            </span>

            {/* glassy base surface (very transparent) */}
            <span className="pointer-events-none absolute inset-px z-0 rounded-full bg-white/[.02] backdrop-blur-md transition-colors duration-500 group-hover:bg-cinema-accent/[.06]" />

            {/* translucent radial fill that grows from center */}
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[135%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-cinema-accent/15 opacity-0 blur-md transition-all duration-700 ease-smooth group-hover:scale-100 group-hover:opacity-100" />

            {/* shine sweep */}
            <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1100ms] ease-smooth group-hover:translate-x-full" />

            {/* pulsing dot */}
            <span className="relative z-20 flex size-2 shrink-0 transition-transform duration-500 ease-smooth group-hover:scale-125">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cinema-accent opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-cinema-accent shadow-[0_0_12px_var(--color-cinema-accent)]" />
            </span>

            {/* label with sliding text */}
            <span className="relative z-20 grid overflow-hidden text-sm font-medium uppercase tracking-[0.18em]">
              <span className="col-start-1 row-start-1 transition-transform duration-500 ease-smooth group-hover:-translate-y-full group-hover:text-cinema-accent">
                Explore More Work
              </span>
              <span className="col-start-1 row-start-1 translate-y-full text-cinema-accent transition-transform duration-500 ease-smooth group-hover:translate-y-0">
                Explore More Work
              </span>
            </span>

            {/* arrow in a circle */}
            <span className="relative z-20 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-500 group-hover:text-cinema-accent">
              <ArrowRight
                size={16}
                className="absolute transition-all duration-500 ease-smooth group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:opacity-0"
              />
              <ArrowRight
                size={16}
                className="absolute -translate-x-6 translate-y-6 opacity-0 transition-all duration-500 ease-smooth group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
