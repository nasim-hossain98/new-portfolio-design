import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
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
        "group relative isolate flex h-full w-full flex-col overflow-hidden bg-cinema-surface p-6 sm:p-8",
        active && "bg-[linear-gradient(145deg,#171720,#0f0f16)]"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),transparent_32%,transparent_70%,rgba(167,139,250,0.05))]"
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-cinema-accent/[0.07] blur-3xl transition-all duration-700",
          active && "scale-125 bg-cinema-accent/[0.13]"
        )}
      />
      <motion.div
        aria-hidden="true"
        animate={active ? { x: ["-180%", "520%"] } : undefined}
        transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 -z-10 w-20 rotate-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-sm"
      />

      <div className="flex items-center justify-between">
        <span
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cinema-accent/20 bg-cinema-accent/[0.08] text-cinema-accent transition-transform duration-500",
            active && "scale-105 shadow-[0_0_30px_rgba(167,139,250,0.12)]"
          )}
        >
          <Quote size={19} fill="currentColor" strokeWidth={1.4} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-cinema-accent shadow-[0_0_14px_rgba(167,139,250,0.8)]" />
        </span>

        <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={11}
              fill="currentColor"
              strokeWidth={1.4}
              className="text-cinema-accent"
            />
          ))}
        </div>
      </div>

      <blockquote className="my-7 line-clamp-6 flex-1 font-display text-[clamp(1.2rem,2.3vw,1.55rem)] leading-[1.38] tracking-[-0.01em] text-cinema-text">
        “{testimonial.quote}”
      </blockquote>

      <footer className="flex items-center gap-3 border-t border-cinema-text/10 pt-5">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cinema-accent/25 bg-cinema-accent/10 font-display text-lg font-semibold text-cinema-accent transition-colors duration-500",
            active && "bg-cinema-accent text-cinema-black"
          )}
        >
          {testimonial.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-cinema-text">{testimonial.name}</p>
          <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.15em] text-cinema-muted">
            {testimonial.role}
          </p>
        </div>
        <span className="label ml-auto hidden text-cinema-accent/60 sm:block">
          Verified
        </span>
      </footer>
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
        className="pointer-events-none absolute left-1/2 top-[45%] h-[38rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cinema-accent/[0.045] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cinema-accent/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
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
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easings.expo }}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(7rem,19vw,16rem)] leading-none text-cinema-text/[0.018]"
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
