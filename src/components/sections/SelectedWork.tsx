import { Component, lazy, Suspense, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PROJECTS } from "@/data/projects";

const InfiniteGallery = lazy(
  () => import("@/components/ui/3d-gallery-photography")
);

const ACCENT = "var(--color-cinema-accent)";

/* ── project card data ─────────────────────────────────── */
const cardLayouts: ("landscape" | "portrait" | "square")[] = [
  "landscape",
  "portrait",
  "square",
  "landscape",
];
const cardRatios: Record<string, string> = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};
const projectPalettes = [
  ["#e8d5c4", "#c49a6c", "#2a1f14"],
  ["#c4d4e8", "#6c8ec4", "#0f1a2a"],
  ["#d4e8c4", "#6cc46c", "#0a2a0f"],
  ["#e8c4d4", "#c46c8e", "#2a0f1a"],
];
const projectDescriptions = [
  "A cinematic brand identity for an artisan coffee roaster.",
  "An immersive editorial platform blending type and motion.",
  "A spatial design system built for a luxury fashion house.",
  "A data-rich dashboard wrapped in an elegant dark UI.",
];

/* ── gallery images for 3D scene ───────────────────────── */
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
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
    src: "https://images.unsplash.com/photo-1518173946687-a9c80d0e17f8?w=800&q=80",
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

/* ── Artwork SVG inside each card ──────────────────────── */
function ProjectArtwork({
  palette,
  index,
}: {
  palette: string[];
  index: number;
}) {
  const shapes = [
    /* card 0 – overlapping circles */
    <g key="0">
      <circle cx="35%" cy="45%" r="28%" fill={palette[0]} opacity={0.6} />
      <circle cx="60%" cy="50%" r="22%" fill={palette[1]} opacity={0.7} />
      <circle cx="48%" cy="65%" r="16%" fill={palette[2]} opacity={0.5} />
    </g>,
    /* card 1 – stacked rects */
    <g key="1">
      <rect
        x="20%"
        y="15%"
        width="60%"
        height="28%"
        rx="6"
        fill={palette[0]}
        opacity={0.65}
      />
      <rect
        x="28%"
        y="48%"
        width="44%"
        height="28%"
        rx="6"
        fill={palette[1]}
        opacity={0.55}
      />
    </g>,
    /* card 2 – diagonal lines */
    <g key="2" strokeWidth="3" strokeLinecap="round">
      <line
        x1="15%"
        y1="80%"
        x2="85%"
        y2="20%"
        stroke={palette[0]}
        opacity={0.5}
      />
      <line
        x1="25%"
        y1="85%"
        x2="90%"
        y2="30%"
        stroke={palette[1]}
        opacity={0.4}
      />
      <circle cx="50%" cy="50%" r="14%" fill={palette[2]} opacity={0.35} />
    </g>,
    /* card 3 – concentric arcs */
    <g key="3" fill="none" strokeWidth="2.5">
      <circle
        cx="50%"
        cy="50%"
        r="32%"
        stroke={palette[0]}
        opacity={0.4}
      />
      <circle
        cx="50%"
        cy="50%"
        r="22%"
        stroke={palette[1]}
        opacity={0.55}
      />
      <circle
        cx="50%"
        cy="50%"
        r="12%"
        stroke={palette[2]}
        opacity={0.65}
      />
    </g>,
  ];
  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {shapes[index % shapes.length]}
    </svg>
  );
}

/* ── Single project card ───────────────────────────────── */
function WorkCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const spotlight = useTransform(
    smoothX,
    [0, 1],
    [
      "radial-gradient(600px circle at 20% 50%,rgba(255,255,255,.07),transparent 60%)",
      "radial-gradient(600px circle at 80% 50%,rgba(255,255,255,.07),transparent 60%)",
    ]
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - bounds.left) / bounds.width);
    pointerY.set((e.clientY - bounds.top) / bounds.height);
  };

  const resetPointer = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const layout = cardLayouts[index % cardLayouts.length];
  const palette = projectPalettes[index % projectPalettes.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, rotateX: 4 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: "easeOut" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        boxShadow: "0 12px 48px -8px rgba(0,0,0,.35)",
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[.06] bg-cinema-surface"
    >
      {/* card image area */}
      <div
        className={`relative overflow-hidden ${cardRatios[layout]}`}
        style={{
          background: `linear-gradient(135deg, ${palette[2]}, ${palette[2]}dd)`,
        }}
      >
        <ProjectArtwork palette={palette} index={index} />

        {/* spotlight overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: spotlight }}
        />

        {/* category pill */}
        <span className="absolute left-4 top-4 z-20 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md">
          {project.category}
        </span>

        {/* hover zoom hint */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            transform: "translateZ(30px)",
            transformStyle: "preserve-3d",
          }}
        >
          <span className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
            View project
          </span>
        </motion.div>
      </div>

      {/* card info */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-lg font-medium leading-tight tracking-tight text-cinema-text">
            {project.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-cinema-muted">
            {projectDescriptions[index % projectDescriptions.length]}
          </p>
        </div>
        <motion.span
          className="mt-1 inline-block text-cinema-accent"
          whileHover={{ rotate: -45, scale: 1.15 }}
        >
          <ArrowDown size={16} className="-rotate-90" />
        </motion.span>
      </div>
    </motion.article>
  );
}

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
  const sceneRotateX = useTransform(scrollYProgress, [0, 0.25], [3, 0]);
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

        {/* ── Project cards grid ─────────────────── */}
        <motion.div
          id="work-grid"
          style={{
            y: reduced ? 0 : sceneY,
            scale: reduced ? 1 : sceneScale,
            rotateX: reduced ? 0 : sceneRotateX,
            opacity: reduced ? 1 : sceneOpacity,
            transformPerspective: 1200,
            transformOrigin: "center top",
            transformStyle: "preserve-3d",
          }}
        >
          {/* counter badge */}
          <motion.div
            className="mb-8 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="label text-cinema-accent">
              {String(PROJECTS.length).padStart(2, "0")} Projects
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-cinema-accent/30 to-transparent" />
          </motion.div>

          {/* masonry-ish grid */}
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {PROJECTS.map((p, i) => (
              <div
                key={p.slug}
                className={`${
                  i % 4 === 0
                    ? "lg:col-span-7"
                    : i % 4 === 1
                      ? "lg:col-span-5"
                      : i % 4 === 2
                        ? "lg:col-span-5"
                        : "lg:col-span-7"
                }`}
              >
                <motion.div
                  style={{ opacity: reduced ? 1 : sceneOpacity }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <WorkCard project={p} index={i} />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
