import { useRef, type CSSProperties, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk, Play } from "lucide-react";
import { projects } from "../../data/portfolioData";
import { easings } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { Project } from "../../types";

const ACCENT = "200, 169, 126";

const cardLayouts = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-12",
] as const;

const cardRatios = [
  "aspect-[4/5] md:aspect-auto md:min-h-[724px]",
  "aspect-[4/3] md:min-h-[350px]",
  "aspect-[4/3] md:min-h-[350px]",
  "aspect-[5/4] md:aspect-[12/4.25] md:min-h-[410px]",
] as const;

const projectPalettes = [
  "radial-gradient(circle at 18% 18%, rgba(200,169,126,.34), transparent 35%), linear-gradient(145deg, #302820 0%, #15141b 54%, #08080c 100%)",
  "radial-gradient(circle at 82% 18%, rgba(124,147,196,.34), transparent 38%), linear-gradient(145deg, #20283a 0%, #11131b 56%, #08080c 100%)",
  "radial-gradient(circle at 20% 78%, rgba(190,62,71,.34), transparent 40%), linear-gradient(145deg, #321d23 0%, #171319 58%, #08080c 100%)",
  "radial-gradient(circle at 75% 22%, rgba(223,173,91,.3), transparent 36%), linear-gradient(120deg, #30261a 0%, #181419 52%, #08080c 100%)",
] as const;

const projectDescriptions = [
  "A focused workspace that turns complex teamwork into calm, visible momentum.",
  "An intelligent product experience shaped around clarity, speed, and trust.",
  "A bold editorial refresh built to make music discovery feel alive again.",
  "A vibrant campaign experience where product, culture, and motion collide.",
] as const;

function ProjectArtwork({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[11%] top-[12%] h-[58%] w-[78%] rotate-[-4deg] rounded-[1.35rem] border border-white/15 bg-[#ebe7dc] p-3 shadow-[0_35px_90px_rgba(0,0,0,.5)] transition-transform duration-1000 ease-out group-hover:rotate-[-1deg] group-hover:scale-[1.035]">
          <div className="flex h-full flex-col overflow-hidden rounded-[.85rem] bg-[#171719] text-white">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="font-display text-sm tracking-wide">taskez</span>
              <div className="flex gap-1"><span className="h-1 w-1 rounded-full bg-white/50" /><span className="h-1 w-1 rounded-full bg-white/25" /></div>
            </div>
            <div className="grid flex-1 grid-cols-[.7fr_1.3fr] gap-3 p-3">
              <div className="flex flex-col justify-between rounded-lg bg-[#262327] p-3">
                <span className="label text-white/45">Workspace 04</span>
                <div><span className="block h-1.5 w-12 rounded-full bg-[#d9b98d]" /><span className="mt-2 block h-1 w-16 rounded-full bg-white/15" /></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["bg-[#d7bb92]", "bg-[#d9d7cf]", "bg-[#87907f]", "bg-[#9e7460]"].map((color, item) => (
                  <div key={color} className={`relative rounded-lg ${color} p-2`}>
                    <span className="label text-black/45">0{item + 1}</span>
                    <span className="absolute bottom-2 left-2 h-1 w-8 rounded-full bg-black/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-[7%] top-[48%] h-24 w-24 rounded-full border border-cinema-accent/35 bg-cinema-black/60 backdrop-blur-md transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-12">
          <div className="flex h-full items-center justify-center font-display text-3xl italic text-cinema-accent">T.</div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[8%] top-[12%] h-[55%] w-[84%] rotate-2 rounded-[1.2rem] border border-[#a6b9e2]/25 bg-[#10141f]/90 p-3 shadow-[0_30px_70px_rgba(0,0,0,.55)] backdrop-blur-sm transition-transform duration-1000 group-hover:rotate-0 group-hover:scale-[1.04]">
          <div className="relative h-full overflow-hidden rounded-[.8rem] border border-white/[.07] bg-[radial-gradient(circle_at_65%_42%,rgba(134,159,217,.28),transparent_26%),linear-gradient(145deg,#161d2d,#090b10)]">
            <div className="absolute inset-x-4 top-4 flex items-center justify-between">
              <span className="label text-white/70">MAGNUM / AI</span>
              <span className="h-5 w-5 rounded-full border border-[#9fb4df]/40" />
            </div>
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#afc4ee]/30 shadow-[0_0_45px_rgba(139,166,222,.28)]">
              <div className="absolute inset-3 rounded-full border border-[#afc4ee]/50" />
              <Asterisk className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[#c6d4f0]" strokeWidth={1} />
            </div>
            <span className="absolute bottom-4 left-4 h-1 w-20 rounded-full bg-white/20" />
            <span className="absolute bottom-4 right-4 label text-white/35">Think forward</span>
          </div>
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[7%] top-[11%] h-[57%] w-[86%] -rotate-2 rounded-[1.2rem] border border-white/10 bg-[#e9e5df] p-3 shadow-[0_30px_70px_rgba(0,0,0,.55)] transition-transform duration-1000 group-hover:rotate-0 group-hover:scale-[1.04]">
          <div className="relative h-full overflow-hidden rounded-[.8rem] bg-[#b51f2f]">
            <div className="absolute inset-x-4 top-4 flex items-center justify-between text-white">
              <span className="font-display text-base font-semibold">last.fm</span>
              <span className="label text-white/70">Discover</span>
            </div>
            <div className="absolute -bottom-[30%] left-[8%] aspect-square w-[72%] rounded-full border-[18px] border-[#f0b24a]/90 bg-[#252027] shadow-[0_0_0_8px_rgba(255,255,255,.08)]">
              <div className="absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e7ddd3]" />
            </div>
            <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#b51f2f] shadow-lg"><Play size={14} fill="currentColor" /></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[7%] top-[9%] h-[61%] w-[86%] md:left-[38%] md:top-[10%] md:h-[70%] md:w-[55%] rotate-[2deg] rounded-[1.2rem] border border-white/15 bg-[#e9dfc7] p-3 shadow-[0_35px_90px_rgba(0,0,0,.52)] transition-transform duration-1000 group-hover:rotate-0 group-hover:scale-[1.035]">
        <div className="relative h-full overflow-hidden rounded-[.8rem] bg-[#dfad3e]">
          <div className="absolute left-4 top-4 z-10 font-display text-xl font-semibold tracking-tight text-[#251b14]">COLA.</div>
          <span className="absolute right-4 top-4 label text-[#251b14]/65">Taste the feeling</span>
          <div className="absolute left-[8%] top-[27%] h-[105%] w-[30%] -rotate-12 rounded-t-[4rem] bg-[#ae2631] shadow-[inset_-10px_0_20px_rgba(0,0,0,.12)]" />
          <div className="absolute left-[17%] top-[44%] z-10 -rotate-12 font-display text-xl italic text-white">classic</div>
          <div className="absolute right-[8%] top-[35%] max-w-[45%] font-display text-[clamp(1.2rem,3vw,2.4rem)] leading-[.85] text-[#251b14]">Open<br />happiness.</div>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const rotateY = useTransform(smoothX, [0, 100], [-3.5, 3.5]);
  const rotateX = useTransform(smoothY, [0, 100], [3.5, -3.5]);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${smoothX}% ${smoothY}%, rgba(${ACCENT}, .20), transparent 58%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  const resetPointer = () => {
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 80, rotateX: 7 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 1, delay: index * 0.09, ease: easings.cinematic }}
      className={`${cardLayouts[index]} ${cardRatios[index]} group relative isolate overflow-hidden rounded-[1.75rem] border border-cinema-text/10 bg-cinema-surface transition-[border-color] duration-500 hover:border-cinema-accent/25`}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        boxShadow: "0 30px 80px rgba(0,0,0,.38)",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="absolute inset-0" style={{ background: projectPalettes[index] }} />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.16)_0.7px,transparent_0.7px)] [background-size:8px_8px]" />

      <ProjectArtwork index={index} />

      <img
        src={project.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-1000 ease-out group-hover:scale-[1.035]"
        onLoad={(event) => {
          event.currentTarget.style.opacity = "0.78";
        }}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,.02)_8%,rgba(10,10,15,.12)_48%,rgba(10,10,15,.96)_100%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div aria-hidden="true" className="absolute inset-3 rounded-[1.25rem] border border-white/[0.08] transition-all duration-700 group-hover:inset-4 group-hover:border-cinema-accent/30" />

      <div className="absolute left-7 top-7 z-20 flex items-center gap-3 md:left-9 md:top-9">
        <span className="label rounded-full border border-white/10 bg-black/30 px-3 py-2 text-cinema-text/80 backdrop-blur-md">0{index + 1}</span>
        <span className="h-px w-8 bg-cinema-accent/60 transition-all duration-500 group-hover:w-14" />
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 z-20 p-7 md:p-9 ${index === 3 ? "md:max-w-[42%]" : ""}`}
        style={{ transform: "translateZ(42px)", transformStyle: "preserve-3d" }}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="label text-cinema-accent">{project.category}</span>
          <span className="h-1 w-1 rounded-full bg-cinema-accent/60" />
          <span className="label text-cinema-text/55">{project.year}</span>
        </div>
        <div className="flex items-end justify-between gap-5">
          <div>
            <h3 className="font-display text-[clamp(2.25rem,4vw,3.8rem)] font-light leading-none tracking-[-0.025em] text-cinema-text">{project.title}</h3>
            <p className="mt-3 max-w-md translate-y-2 text-xs leading-5 text-cinema-text/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-cinema-text/55 md:text-sm">
              {projectDescriptions[index]}
            </p>
          </div>
          <motion.span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cinema-text/20 bg-cinema-black/45 text-cinema-text backdrop-blur-md transition-colors duration-300 group-hover:border-cinema-accent group-hover:bg-cinema-accent group-hover:text-cinema-black"
            whileHover={reduced ? undefined : { rotate: 45, scale: 1.08 }}
          >
            <ArrowUpRight size={19} />
          </motion.span>
        </div>
      </div>

      <span className="absolute inset-x-8 bottom-0 z-30 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-cinema-accent to-transparent transition-transform duration-700 group-hover:scale-x-100" />
    </motion.article>
  );
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const sceneY = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [120, 0, 0, -90]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [0.94, 1, 1, 0.97]);
  const sceneRotateX = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [6, 0, 0, -4]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [0.45, 1, 1, 0.55]);
  const ambientY = useTransform(scrollYProgress, [0, 1], [160, -180]);
  const counterY = useTransform(scrollYProgress, [0, 1], [70, -100]);

  return (
    <section ref={sectionRef} id="work" className="relative z-10 overflow-hidden bg-cinema-black py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div className="absolute left-[-12rem] top-[12%] h-[38rem] w-[38rem] rounded-full bg-cinema-accent/[0.09] blur-[140px]" style={{ y: reduced ? 0 : ambientY }} />
        <motion.div className="absolute right-[-18rem] top-[52%] h-[42rem] w-[42rem] rounded-full bg-[#7084a8]/[0.07] blur-[150px]" style={{ y: reduced ? 0 : counterY }} />
        <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(240,240,245,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(240,240,245,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cinema-accent/30 to-transparent" />
        <div className="absolute left-1/2 top-16 h-px w-[min(90%,75rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[.06] to-transparent" />
      </div>

      <motion.div
        className="relative mx-auto max-w-container-page px-6"
        style={{
          y: reduced ? 0 : sceneY,
          scale: reduced ? 1 : sceneScale,
          rotateX: reduced ? 0 : sceneRotateX,
          opacity: reduced ? 1 : sceneOpacity,
          transformPerspective: 1400,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="mb-14 grid items-end gap-10 md:mb-20 md:grid-cols-12">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easings.cinematic }}
            className="relative md:col-span-8"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="label text-cinema-accent">Selected portfolio</span>
              <span className="h-px w-14 bg-gradient-to-r from-cinema-accent/70 to-transparent" />
              <span className="label text-cinema-text/30">04 case studies</span>
            </div>
            <h2 className="max-w-[820px] font-display text-[clamp(3.75rem,8vw,7.8rem)] font-light leading-[0.82] tracking-[-0.045em] text-cinema-text">
              Work that
              <span className="mt-3 block pl-[10%] italic text-cinema-accent md:mt-5">moves people.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: easings.cinematic }}
            className="flex flex-col gap-7 md:col-span-4 md:items-end"
          >
            <p className="max-w-sm text-sm leading-7 text-cinema-muted md:text-right">
              A curated collection of digital experiences where clear strategy, expressive design, and thoughtful motion meet.
            </p>
            <a href="#work-grid" className="group inline-flex w-fit items-center gap-3 rounded-full border border-cinema-text/15 bg-cinema-text/[.025] px-5 py-3 text-cinema-text transition-all duration-300 hover:border-cinema-accent/50 hover:bg-cinema-accent/[.07] hover:text-cinema-accent">
              <span className="label">Explore projects</span>
              <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </motion.div>
        </div>

        <div id="work-grid" className="grid gap-5 md:grid-cols-12 md:auto-rows-[350px] md:gap-6" style={{ perspective: "1400px", transformStyle: "preserve-3d" } as CSSProperties}>
          {projects.map((project, index) => <WorkCard key={project.id} project={project} index={index} />)}
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-12 flex flex-col gap-4 border-t border-cinema-text/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="label text-cinema-muted">Selected work · 2024—2025</span>
          <span className="font-display text-xl italic text-cinema-text/60">Designed with intention</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
