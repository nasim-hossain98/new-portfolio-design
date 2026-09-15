import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 3D card parallax
  const cardY = useSpring(
    useTransform(scrollYProgress, [0, 0.45, 1], [100, 0, -60]),
    { stiffness: 90, damping: 24 }
  );
  const cardRotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -5]),
    { stiffness: 90, damping: 24 }
  );
  const cardRotateY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 4]),
    { stiffness: 90, damping: 24 }
  );
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.42, 0.7, 1],
    [0.88, 1, 1, 0.96]
  );

  // Parallax orbs
  const orb1Y = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [60, -100]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [100, -80]);

  // Heading stagger
  const headingY = useSpring(
    useTransform(scrollYProgress, [0, 0.45, 1], [60, 0, -40]),
    { stiffness: 100, damping: 26 }
  );
  const headingRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [6, 0, -3]
  );

  // Marquee scroll
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["5%", "-30%"]);

  // CTA button pop
  const ctaScale = useSpring(
    useTransform(scrollYProgress, [0.2, 0.5], [0.85, 1]),
    { stiffness: 120, damping: 18 }
  );
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.55], [40, 0]),
    { stiffness: 100, damping: 22 }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 overflow-hidden border-y border-cinema-text/[0.06] bg-cinema-surface py-24 md:py-36"
    >
      {/* ── Background: matching AboutSection pattern + violet tint ── */}

      {/* Violet glow orb — left */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduced ? 0 : orb1Y }}
        className="pointer-events-none absolute -left-48 top-1/4 h-[34rem] w-[34rem] rounded-full blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-[#8b5cf6]/[0.07]" />
      </motion.div>

      {/* Silver/violet glow orb — right */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduced ? 0 : orb2Y }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full blur-[100px]"
      >
        <div className="h-full w-full rounded-full bg-[#a78bfa]/[0.05]" />
      </motion.div>

      {/* Subtle center violet wash */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduced ? 0 : orb3Y }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full blur-[140px]"
      >
        <div className="h-full w-full rounded-full bg-[#7c3aed]/[0.04]" />
      </motion.div>

      {/* Grid lines — same as AboutSection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,240,245,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(240,240,245,.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />

      {/* Faint dot grid with violet tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(167,139,250,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Background marquee text ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[18%] w-full overflow-hidden whitespace-nowrap"
      >
        <motion.div
          style={{ x: reduced ? "-12%" : marqueeX }}
          className="flex w-max items-center will-change-transform"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="mr-16 shrink-0 font-display text-[clamp(5rem,14vw,12rem)] font-light leading-none tracking-[-0.04em] text-cinema-text/[0.02] select-none md:mr-28"
            >
              Let&apos;s Talk
              <span className="ml-16 font-serif italic text-[#a78bfa]/[0.04] md:ml-28">
                Connect
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Scrolling marquee banner ── */}
      <div className="relative mb-16 overflow-hidden border-b border-cinema-text/[0.06] py-4 md:mb-20">
        <motion.div
          animate={{ x: ["-0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex w-max whitespace-nowrap will-change-transform"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="mr-12 flex items-center gap-4">
              <span
                className={
                  i % 2 === 0
                    ? "text-sm font-medium uppercase tracking-[0.2em] text-[#c4b5fd]/60"
                    : "text-sm font-medium uppercase tracking-[0.2em] [-webkit-text-stroke:1px_rgba(196,181,253,0.3)] [-webkit-text-fill-color:transparent]"
                }
              >
                Let&apos;s Talk
              </span>
              <span className="text-[#a78bfa]/20">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Main content card ── */}
      <div className="relative mx-auto max-w-container-page px-6">
        <div className="flex justify-center [perspective:1400px]">
          <motion.div
            style={{
              y: reduced ? 0 : cardY,
              rotateX: reduced ? 0 : cardRotateX,
              rotateY: reduced ? 0 : cardRotateY,
              scale: reduced ? 1 : cardScale,
              transformPerspective: 1400,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-2xl"
          >
            {/* Rear decorative planes — like AboutSection portrait */}
            <motion.div
              aria-hidden="true"
              style={{
                y: reduced ? 0 : useTransform(scrollYProgress, [0, 1], [30, -40]),
                rotate: reduced ? -4 : useTransform(scrollYProgress, [0, 1], [-6, 5]),
                translateZ: -60,
              }}
              className="absolute inset-4 rounded-[2rem] border border-[#a78bfa]/15 bg-[#a78bfa]/[0.025]"
            />
            <motion.div
              aria-hidden="true"
              style={{
                y: reduced ? 0 : useTransform(scrollYProgress, [0, 1], [20, -30]),
                translateZ: -30,
              }}
              className="absolute -inset-3 rounded-[2.25rem] border border-cinema-text/[0.05]"
            />

            {/* Glass card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-cinema-text/[0.08] bg-cinema-black/40 p-10 text-center shadow-[0_40px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-14">
              {/* Violet gradient wash inside card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[2rem]"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 70%)",
                }}
              />

              {/* Top edge highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-px left-1/2 h-px w-3/5 -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)",
                }}
              />

              {/* ── Subtitle ── */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#a78bfa]/15 bg-[#8b5cf6]/[0.08] px-5 py-2 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#c4b5fd]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#a78bfa]"
                >
                  <path
                    d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z"
                    fill="currentColor"
                  />
                </svg>
                Project in mind?
              </motion.span>

              {/* ── Heading ── */}
              <motion.h2
                style={{
                  y: reduced ? 0 : headingY,
                  rotateX: reduced ? 0 : headingRotateX,
                  transformPerspective: 800,
                }}
                className="font-display text-5xl font-light leading-[1.1] text-cinema-text md:text-6xl lg:text-7xl"
              >
                <span className="block">Let&apos;s make your</span>
                <span
                  className="block font-serif italic"
                  style={{
                    background:
                      "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 40%, #8b5cf6 70%, #c8a97e 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Website shine
                </span>
              </motion.h2>

              {/* ── Decorative lines ── */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <div
                  className="h-px w-16 origin-right"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(167,139,250,0.3))",
                  }}
                />
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#a78bfa]/30"
                >
                  <path
                    d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z"
                    fill="currentColor"
                  />
                </svg>
                <div
                  className="h-px w-16 origin-left"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(167,139,250,0.3), transparent)",
                  }}
                />
              </div>

              {/* ── Description ── */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-cinema-muted"
              >
                Premium web design, Webflow, and SEO services to help your
                business stand out.
              </motion.p>

              {/* ── CTA Button ── */}
              <motion.div
                style={{
                  scale: reduced ? 1 : ctaScale,
                  y: reduced ? 0 : ctaY,
                }}
                className="mt-10"
              >
                <a
                  href="mailto:hello@arik.design"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#a78bfa]/25 px-8 py-4 text-sm font-medium tracking-wide text-white transition-all duration-300 select-none hover:-translate-y-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
                    boxShadow:
                      "0 0 40px -8px rgba(139,92,246,0.4), 0 20px 50px -15px rgba(91,33,182,0.45)",
                  }}
                >
                  {/* Shine sweep */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    Get in touch
                    <ArrowUpRight className="h-4 w-4 text-[#c4b5fd] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </motion.div>

              {/* ── Bottom accent ── */}
              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
