import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { CardStack, type CardStackItem } from "../ui/card-stack";
import { testimonials } from "../../data/portfolioData";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { easings, cn } from "../../lib/utils";
import type { Testimonial } from "../../types";

type TestimonialStackItem = CardStackItem & {
  testimonial: Testimonial;
};

const stackItems: TestimonialStackItem[] = testimonials.map((testimonial) => ({
  id: testimonial.id,
  title: testimonial.name,
  description: testimonial.quote,
  tag: testimonial.role,
  testimonial,
}));

function TestimonialCard({
  item,
  active,
}: {
  item: TestimonialStackItem;
  active: boolean;
}) {
  const { testimonial } = item;

  return (
    <div
      className={cn(
        "group relative isolate flex h-full w-full overflow-hidden bg-cinema-surface",
        active
          ? "bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,126,0.06),transparent_55%),linear-gradient(160deg,#14141e_0%,#0d0d14_100%)]"
          : "bg-[linear-gradient(160deg,#111118_0%,#0b0b10_100%)]"
      )}
    >
      {/* Vertical accent spine */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 z-20 h-full w-[3px] transition-all duration-700",
          active
            ? "bg-gradient-to-b from-cinema-accent via-cinema-accent/60 to-transparent shadow-[0_0_20px_rgba(200,169,126,0.4)]"
            : "bg-gradient-to-b from-cinema-accent/30 via-cinema-accent/10 to-transparent"
        )}
      />

      {/* Decorative oversized quote glyph */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -left-2 -top-6 select-none font-serif text-[11rem] leading-none transition-all duration-700",
          active
            ? "text-cinema-accent/[0.09] scale-105"
            : "text-cinema-text/[0.03]"
        )}
      >
        “
      </span>

      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-overlay [background-image:url(&quot;data:image/svg+xml,%3Csvg viewBox=&apos;0 0 256 256&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cfilter id=&apos;n&apos;%3E%3CfeTurbulence type=&apos;fractalNoise&apos; baseFrequency=&apos;0.85&apos; numOctaves=&apos;4&apos; stitchTiles=&apos;stitch&apos;/%3E%3C/filter%3E%3Crect width=&apos;100%25&apos; height=&apos;100%25&apos; filter=&apos;url(%23n)&apos;/%3E%3C/svg%3E&quot;)] [background-size:128px_128px]"
      />

      {/* Shimmer sweep on active */}
      <motion.div
        aria-hidden="true"
        animate={active ? { x: ["-180%", "520%"] } : undefined}
        transition={{ duration: 5.2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 z-0 w-16 rotate-12 bg-gradient-to-r from-transparent via-cinema-accent/[0.06] to-transparent blur-md"
      />

      {/* Content area */}
      <div className="relative z-10 flex h-full w-full flex-col pl-7 pr-6 py-6 sm:pl-9 sm:pr-8 sm:py-8">
        {/* Top row: stars + verified badge */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-[3px]" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.span
                key={index}
                initial={false}
                animate={active ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Star
                  size={12}
                  fill="currentColor"
                  strokeWidth={1}
                  className="text-cinema-accent drop-shadow-[0_0_4px_rgba(200,169,126,0.5)]"
                />
              </motion.span>
            ))}
          </div>
          {active && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-emerald-300/90"
            >
              <BadgeCheck size={11} strokeWidth={2} />
              Verified
            </motion.span>
          )}
        </div>

        {/* Blockquote */}
        <blockquote className="flex-1 font-display text-[clamp(1.15rem,2.2vw,1.5rem)] font-light leading-[1.45] tracking-[-0.015em] text-cinema-text/95">
          <span className="text-cinema-accent/70">&ldquo;</span>
          {testimonial.quote}
          <span className="text-cinema-accent/70">&rdquo;</span>
        </blockquote>

        {/* Footer */}
        <footer className="mt-6 flex items-center gap-3.5 border-t border-cinema-text/[0.07] pt-5">
          <span
            className={cn(
              "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-base font-bold transition-all duration-500",
              active
                ? "bg-gradient-to-br from-cinema-accent to-cinema-accent/70 text-cinema-black shadow-[0_0_24px_rgba(200,169,126,0.3)]"
                : "border border-cinema-accent/20 bg-cinema-accent/[0.06] text-cinema-accent/70"
            )}
          >
            {testimonial.name.charAt(0)}
            {active && (
              <span className="absolute -inset-0.5 rounded-xl border border-cinema-accent/30 animate-ping opacity-20" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-cinema-text">{testimonial.name}</p>
            <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.14em] text-cinema-muted/80">
              {testimonial.role}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative z-10 overflow-hidden bg-cinema-black py-24 md:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[45%] h-[38rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cinema-accent/[0.06] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-[#7185ad]/[0.04] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cinema-accent/30 to-transparent shadow-[0_0_12px_rgba(200,169,126,0.2)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cinema-accent/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-container-page px-4 sm:px-6">
        <div className="relative mb-8 md:mb-12">
          <SectionHeader
            label="Client Stories"
            title="Built with trust"
            accent="remembered by results"
            description="Drag, swipe, or select a card to explore what clients say about working together."
            className="mb-0 md:mb-0"
          />
          <motion.p
            initial={reduced ? false : { opacity: 0, scale: 0.7, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easings.expo }}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[clamp(8rem,20vw,18rem)] leading-none text-cinema-accent/[0.025]"
          >
            “
          </motion.p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 65, rotateX: 8, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: easings.expo }}
          className="[transform-style:preserve-3d]"
        >
          <CardStack
            items={stackItems}
            initialIndex={0}
            maxVisible={5}
            cardWidth={590}
            cardHeight={360}
            overlap={0.7}
            spreadDeg={24}
            depthPx={105}
            tiltXDeg={7}
            activeLiftPx={30}
            autoAdvance
            intervalMs={3600}
            pauseOnHover
            showDots
            renderCard={(item, state) => (
              <TestimonialCard item={item} active={state.active} />
            )}
          />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="label mt-7 text-center text-cinema-muted"
        >
          Swipe or use arrow keys
        </motion.p>
      </div>
    </section>
  );
}
