import { useRef, type ComponentType } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  Check,
  Code2,
  Lightbulb,
  PenTool,
  Rocket,
  Search,
} from "lucide-react";
import { processSteps } from "../../data/portfolioData";
import { easings, cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { ProcessStep } from "../../types";

type StepIcon = ComponentType<{ className?: string; strokeWidth?: number }>;

const STEP_ICONS: Record<number, StepIcon> = {
  1: Search,
  2: Lightbulb,
  3: PenTool,
  4: Code2,
  5: Rocket,
};

function StepCard({
  step,
  index,
  isLeft,
}: {
  step: ProcessStep;
  index: number;
  isLeft: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rawRotateY = useTransform(
    scrollYProgress,
    [0, 0.42, 0.62, 1],
    isLeft ? [-12, 0, 0, 7] : [12, 0, 0, -7]
  );
  const rawRotateX = useTransform(scrollYProgress, [0, 0.48, 1], [7, 0, -5]);
  const rawY = useTransform(scrollYProgress, [0, 0.45, 1], [85, 0, -55]);
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.68, 1], [0.9, 1, 1, 0.95]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.28, 0.82, 1], [0.25, 1, 1, 0.55]);

  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 24 });
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 24 });
  const y = useSpring(rawY, { stiffness: 110, damping: 24 });
  const scale = useSpring(rawScale, { stiffness: 110, damping: 24 });
  const opacity = useSpring(rawOpacity, { stiffness: 110, damping: 24 });
  const Icon = STEP_ICONS[step.id] ?? Search;

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: reduced ? 0 : y,
        scale: reduced ? 1 : scale,
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        opacity: reduced ? 1 : opacity,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full max-w-[31rem]"
    >
      <div
        className={cn(
          "pointer-events-none absolute top-11 hidden h-px w-12 overflow-hidden bg-cinema-text/10 md:block",
          isLeft ? "-right-12" : "-left-12"
        )}
        aria-hidden="true"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easings.cinematic }}
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-transparent to-cinema-accent/70",
            isLeft ? "origin-right" : "origin-left rotate-180"
          )}
        />
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-cinema-text/10 bg-[linear-gradient(145deg,rgba(240,240,245,.075),rgba(240,240,245,.018)_48%,rgba(200,169,126,.025))] p-1 shadow-[0_28px_80px_rgba(0,0,0,.28)] backdrop-blur-sm transition-all duration-500 group-hover:border-cinema-accent/35 group-hover:shadow-[0_35px_100px_rgba(0,0,0,.42)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cinema-accent/[.08] blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,.16)_0.6px,transparent_0.6px)] [background-size:9px_9px]" />
        <span className="absolute inset-x-10 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-cinema-accent to-transparent transition-transform duration-700 group-hover:scale-x-100" />

        <div className="relative rounded-[1.25rem] border border-white/[.035] p-6 sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-5">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cinema-accent/20 bg-cinema-accent/[.075] text-cinema-accent transition-all duration-500 group-hover:rotate-3 group-hover:border-cinema-accent/50 group-hover:bg-cinema-accent/[.13]">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <span className="label block text-cinema-accent">Phase {step.number}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[.14em] text-cinema-text/35">
                  {index === 0 ? "Project begins" : `After phase 0${index}`}
                </span>
              </div>
            </div>
            <span className="label rounded-full border border-cinema-text/10 bg-cinema-black/25 px-3 py-2 text-[9px] text-cinema-text/55">
              {step.time}
            </span>
          </div>

          <div className="relative" style={{ transform: "translateZ(34px)" }}>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 -top-8 select-none font-display text-[6.5rem] font-light leading-none text-transparent opacity-25 transition-opacity duration-500 group-hover:opacity-45"
              style={{ WebkitTextStroke: "1px rgba(200,169,126,.52)" }}
            >
              {step.number}
            </span>
            <h3 className="relative max-w-[80%] font-display text-[clamp(1.75rem,3vw,2.35rem)] font-light leading-none tracking-[-0.02em] text-cinema-text">
              {step.title}
            </h3>
            <p className="relative mt-5 text-[13px] leading-6 text-cinema-muted sm:text-sm">
              {step.description}
            </p>
          </div>

          <div className="mt-7 border-t border-cinema-text/[.08] pt-5">
            <ul className="grid gap-3">
              {step.points.map((point, pointIndex) => (
                <motion.li
                  key={point}
                  initial={reduced ? false : { opacity: 0, x: isLeft ? -12 : 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * pointIndex,
                    ease: easings.cinematic,
                  }}
                  className="flex items-start gap-3 text-[12px] leading-5 text-cinema-text/75 sm:text-[13px]"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-cinema-accent/30 bg-cinema-accent/[.07] text-cinema-accent">
                    <Check className="h-2.5 w-2.5" strokeWidth={2} />
                  </span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: railProgress } = useScroll({
    target: sectionRef,
    offset: ["start 62%", "end 65%"],
  });

  const sceneRotateX = useTransform(scrollYProgress, [0, 0.16, 0.82, 1], [8, 0, 0, -7]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.16, 0.82, 1], [0.93, 1, 1, 0.95]);
  const sceneY = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [110, 0, 0, -100]);
  const glowY = useTransform(scrollYProgress, [0, 1], [180, -240]);
  const progressScale = useSpring(railProgress, { stiffness: 90, damping: 24 });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative z-10 overflow-hidden bg-cinema-surface py-24 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          style={{ y: reduced ? 0 : glowY }}
          className="absolute -left-64 top-[20%] h-[42rem] w-[42rem] rounded-full bg-cinema-accent/[.07] blur-[150px]"
        />
        <div className="absolute -right-72 top-[44%] h-[44rem] w-[44rem] rounded-full bg-[#7185ad]/[.055] blur-[160px]" />
        <div className="absolute inset-0 opacity-[.14] [background-image:linear-gradient(rgba(240,240,245,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(240,240,245,.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cinema-accent/25 to-transparent" />
        <span className="absolute right-[3%] top-[13%] hidden select-none font-display text-[20rem] font-light leading-none text-cinema-text/[.018] lg:block">
          05
        </span>
      </div>

      <motion.div
        className="relative mx-auto max-w-container-page px-6"
        style={{
          y: reduced ? 0 : sceneY,
          scale: reduced ? 1 : sceneScale,
          rotateX: reduced ? 0 : sceneRotateX,
          transformPerspective: 1500,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="mb-16 grid items-end gap-10 md:mb-24 md:grid-cols-12">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: easings.cinematic }}
            className="md:col-span-8"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="label text-cinema-accent">The process</span>
              <span className="h-px w-14 bg-gradient-to-r from-cinema-accent/70 to-transparent" />
              <span className="label text-cinema-text/30">From idea to launch</span>
            </div>
            <h2 className="max-w-[800px] font-display text-[clamp(3.7rem,8vw,7.6rem)] font-light leading-[.82] tracking-[-.045em] text-cinema-text">
              Your vision,
              <span className="mt-3 block pl-[9%] italic text-cinema-accent md:mt-5">
                built with intent.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15, ease: easings.cinematic }}
            className="flex flex-col gap-6 md:col-span-4 md:items-end"
          >
            <p className="max-w-sm text-sm leading-7 text-cinema-muted md:text-right">
              A transparent five-step journey that transforms strategy into a distinctive, high-performing digital experience.
            </p>
            <a
              href="#process-steps"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-cinema-text/15 bg-cinema-text/[.025] px-5 py-3 text-cinema-text transition-all duration-300 hover:border-cinema-accent/50 hover:bg-cinema-accent/[.07] hover:text-cinema-accent"
            >
              <span className="label">See the journey</span>
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </motion.div>
        </div>

        <div id="process-steps" className="relative mx-auto max-w-[68rem]" style={{ perspective: "1400px" }}>
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px bg-cinema-text/[.07] md:left-1/2 md:-translate-x-1/2"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduced ? 1 : progressScale }}
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-cinema-accent/20 via-cinema-accent to-cinema-accent/20 shadow-[0_0_18px_rgba(200,169,126,.35)] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="flex flex-col gap-16 md:gap-24">
            {processSteps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li key={step.id} className="relative min-h-[20rem]">
                  <motion.span
                    initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: easings.back }}
                    aria-hidden="true"
                    className="absolute left-5 top-10 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-cinema-accent/45 bg-cinema-surface shadow-[0_0_0_6px_rgba(18,18,26,.85),0_0_28px_rgba(200,169,126,.2)] md:left-1/2"
                  >
                    <span className="h-2 w-2 rounded-full bg-cinema-accent shadow-[0_0_12px_rgba(200,169,126,.9)]" />
                  </motion.span>

                  <div
                    className={cn(
                      "flex pl-12 md:w-1/2 md:pl-0",
                      isLeft
                        ? "md:mr-auto md:justify-end md:pr-12"
                        : "md:ml-auto md:justify-start md:pl-12"
                    )}
                  >
                    <StepCard step={step} index={index} isLeft={isLeft} />
                  </div>
                </li>
              );
            })}
          </ol>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: easings.back }}
            className="relative ml-5 mt-16 flex w-fit -translate-x-1/2 flex-col items-center md:ml-auto md:mr-auto"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cinema-accent/40 bg-cinema-accent/[.1] text-cinema-accent shadow-[0_0_45px_rgba(200,169,126,.18)]">
              <Rocket className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <span className="mt-4 whitespace-nowrap label text-cinema-text/45">Ready to launch</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
