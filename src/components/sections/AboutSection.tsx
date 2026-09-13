import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FaInstagram,
  FaXTwitter,
  FaDribbble,
  FaLinkedinIn,
} from "react-icons/fa6";
import { ArrowUpRight, Asterisk } from "lucide-react";
import type { IconType } from "react-icons";
import { SectionHeader } from "../ui/SectionHeader";
import { personalInfo } from "../../data/portfolioData";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { easings } from "../../lib/utils";

const SOCIALS: { label: string; icon: IconType; href: string }[] = [
  { label: "Instagram", icon: FaInstagram, href: personalInfo.socials.instagram },
  { label: "Twitter", icon: FaXTwitter, href: personalInfo.socials.twitter },
  { label: "Dribbble", icon: FaDribbble, href: personalInfo.socials.dribbble },
  { label: "LinkedIn", icon: FaLinkedinIn, href: personalInfo.socials.linkedin },
];

const STATS = [
  { value: "05+", label: "Years crafting" },
  { value: "40+", label: "Projects shipped" },
  { value: "100%", label: "Built with care" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const portraitY = useSpring(
    useTransform(scrollYProgress, [0, 0.48, 1], [110, 0, -90]),
    { stiffness: 90, damping: 24 }
  );
  const portraitRotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -8]),
    { stiffness: 90, damping: 24 }
  );
  const portraitRotateY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [-13, 0, 11]),
    { stiffness: 90, damping: 24 }
  );
  const portraitScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.72, 1],
    [0.9, 1, 1, 0.94]
  );
  const rearPlaneY = useTransform(scrollYProgress, [0, 1], [45, -55]);
  const rearPlaneRotate = useTransform(scrollYProgress, [0, 1], [-8, 7]);

  const copyY = useSpring(
    useTransform(scrollYProgress, [0, 0.48, 1], [70, 0, -55]),
    { stiffness: 100, damping: 26 }
  );
  const copyRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -4]);
  const copyRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -4]);
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["4%", "-34%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], [100, -120]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 overflow-hidden border-y border-cinema-text/[0.06] bg-cinema-surface py-24 md:py-36"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: reduced ? 0 : glowY }}
        className="pointer-events-none absolute -left-48 top-1/4 h-[34rem] w-[34rem] rounded-full bg-cinema-accent/[0.07] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-gradient-radial from-cinema-text/[0.05] to-transparent blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,240,245,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(240,240,245,.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[16%] w-full overflow-hidden whitespace-nowrap"
      >
        <motion.div
          style={{ x: reduced ? "-14%" : marqueeX }}
          className="flex w-max items-center will-change-transform"
        >
          {[0, 1, 2].map((item) => (
            <span
              key={item}
              className="mr-16 shrink-0 font-display text-[clamp(5rem,14vw,12rem)] font-light leading-none tracking-[-0.04em] text-cinema-text/[0.025] select-none md:mr-28"
            >
              {personalInfo.name}
              <span className="ml-16 font-serif italic text-cinema-accent/[0.06] md:ml-28">
                About
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-container-page px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 xl:gap-28">
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: easings.cinematic }}
            className="relative mx-auto w-full max-w-[27rem] [perspective:1400px]"
          >
            <motion.div
              aria-hidden="true"
              style={{
                y: reduced ? 0 : rearPlaneY,
                rotate: reduced ? -5 : rearPlaneRotate,
                translateZ: -80,
              }}
              className="absolute inset-5 rounded-[2rem] border border-cinema-accent/20 bg-cinema-accent/[0.035]"
            />
            <motion.div
              aria-hidden="true"
              style={{ y: reduced ? 0 : rearPlaneY, translateZ: -40 }}
              className="absolute -inset-4 rounded-[2.25rem] border border-cinema-text/[0.06]"
            />

            <motion.div
              style={{
                y: reduced ? 0 : portraitY,
                rotateX: reduced ? 0 : portraitRotateX,
                rotateY: reduced ? 0 : portraitRotateY,
                scale: reduced ? 1 : portraitScale,
                transformPerspective: 1400,
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-cinema-text/10 bg-cinema-black shadow-[0_45px_100px_rgba(0,0,0,0.55)]">
                <img
                  src="/profile.png"
                  alt={personalInfo.name}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                  className="h-full w-full object-cover object-top saturate-[0.72] contrast-[1.08] brightness-[0.72]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/5 to-transparent" />
                <div className="absolute inset-0 bg-cinema-accent/[0.04] mix-blend-color" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                  <p className="label mb-2 text-cinema-accent">Designer · Developer</p>
                  <p className="font-display text-3xl leading-none text-cinema-text">
                    Mohammad Nasim
                  </p>
                </div>
              </div>

              <motion.div
                style={{ translateZ: 75 }}
                className="absolute -right-5 top-8 rounded-2xl border border-cinema-text/10 bg-cinema-black/75 px-4 py-3 shadow-2xl backdrop-blur-xl md:-right-12 md:top-12"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cinema-accent opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cinema-accent" />
                  </span>
                  <div>
                    <p className="text-[0.58rem] uppercase tracking-[0.18em] text-cinema-muted">
                      Current status
                    </p>
                    <p className="mt-0.5 text-xs text-cinema-text">Available for projects</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ translateZ: 55 }}
                className="absolute -bottom-6 -left-3 flex h-20 w-20 items-center justify-center rounded-full border border-cinema-accent/30 bg-cinema-surface/90 shadow-2xl backdrop-blur-xl md:-left-10 md:h-24 md:w-24"
              >
                <div className="text-center">
                  <Asterisk className="mx-auto mb-1 h-4 w-4 text-cinema-accent" />
                  <span className="label text-[0.5rem] leading-tight text-cinema-muted">
                    Since
                    <br />
                    2019
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: easings.cinematic, delay: 0.12 }}
            style={{
              y: reduced ? 0 : copyY,
              rotateX: reduced ? 0 : copyRotateX,
              rotateY: reduced ? 0 : copyRotateY,
              transformPerspective: 1400,
            }}
            className="relative rounded-[2rem] border border-cinema-text/[0.08] bg-cinema-black/25 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-9 lg:p-10"
          >
            <div className="absolute right-6 top-6 flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-cinema-muted">
              <span>01</span>
              <span className="h-px w-8 bg-cinema-text/15" />
              <span>About</span>
            </div>

            <SectionHeader
              align="left"
              className="mb-8 max-w-xl pr-10"
              label="Behind the pixels"
              title="I shape ideas into"
              accent="digital experiences."
            />

            <div className="grid gap-5 text-sm leading-[1.9] text-cinema-muted sm:grid-cols-2">
              <p>
                I'm {personalInfo.name}, a freelance web designer and developer with over
                five years of experience creating expressive, high-performing websites.
              </p>
              <p>
                I blend thoughtful UX, distinctive visual direction, and clean development
                to build digital work that feels as good as it functions.
              </p>
            </div>

            <div className="my-8 grid grid-cols-3 border-y border-cinema-text/[0.08] py-6">
              {STATS.map(({ value, label }, index) => (
                <div
                  key={label}
                  className={index > 0 ? "border-l border-cinema-text/[0.08] pl-4 sm:pl-6" : "pr-4 sm:pr-6"}
                >
                  <p className="font-display text-2xl text-cinema-text sm:text-3xl">{value}</p>
                  <p className="mt-1 text-[0.55rem] uppercase tracking-[0.12em] text-cinema-muted sm:text-[0.62rem]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-cinema-accent px-5 py-3 text-xs font-medium text-cinema-black transition-transform duration-300 hover:-translate-y-1"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="flex items-center gap-2">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cinema-text/10 text-cinema-muted transition-all duration-300 hover:-translate-y-1 hover:border-cinema-accent/50 hover:bg-cinema-accent/[0.06] hover:text-cinema-accent"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
