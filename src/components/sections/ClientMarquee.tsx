import { motion } from "framer-motion";
import { clientLogos } from "../../data/portfolioData";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/** Infinite client-name marquee — content duplicated for a seamless loop */
export function ClientMarquee() {
  const reduced = useReducedMotion();
  const items = [...clientLogos, ...clientLogos];

  return (
    <section
      aria-label="Selected clients"
      className="relative z-10 overflow-hidden border-y border-cinema-text/10 bg-cinema-black py-9"
    >
      <motion.div
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-14 pr-14 will-change-transform hover:[animation-play-state:paused]"
      >
        {items.map(({ name }, i) => (
          <span key={`${name}-${i}`} className="flex items-center gap-14">
            <span className="text-lg font-medium tracking-wide whitespace-nowrap text-cinema-muted/70 transition-colors duration-300 hover:text-cinema-text">
              {name}
            </span>
            <span aria-hidden="true" className="text-[10px] text-cinema-accent/40">
              ✦
            </span>
          </span>
        ))}
      </motion.div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cinema-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cinema-black to-transparent" />
    </section>
  );
}
