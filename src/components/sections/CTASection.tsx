import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedText } from "../ui/AnimatedText";
import { MagneticButton } from "../ui/MagneticButton";
import { personalInfo } from "../../data/portfolioData";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/** Inverted champagne-gold block — the loudest moment on the page, reserved for conversion */
export function CTASection() {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="relative z-10 overflow-hidden bg-cinema-accent">
      {/* marquee banner */}
      <div className="overflow-hidden border-b border-cinema-black/15 py-3">
        <motion.div
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex w-max whitespace-nowrap will-change-transform"
        >
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="label mr-12 flex items-center gap-4 text-cinema-black"
            >
              Let&apos;s Talk
              <span className="text-cinema-black/40">+++</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* content */}
      <div className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="label mb-6 block text-cinema-black/60"
          >
            Project in mind?
          </motion.span>

          <h2 className="font-display text-display-xl font-light text-cinema-black">
            <AnimatedText text="Let's make your" as="span" stagger={0.04} />
            <AnimatedText
              text="Website shine"
              as="span"
              delay={0.15}
              stagger={0.04}
              className="font-serif italic"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-cinema-black/70"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10"
          >
            <MagneticButton
              href={`mailto:${personalInfo.email}`}
              variant="solid"
              className="gap-3 bg-cinema-black text-cinema-text hover:bg-cinema-surface"
            >
              Get in touch
              <ArrowUpRight size={15} className="text-cinema-accent" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
