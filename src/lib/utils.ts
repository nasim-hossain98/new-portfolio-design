import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes conditionally */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number into [min, max] */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/* ---------------------------------------------------------------------------
   Easing curves — mirror the tokens in index.css for JS-driven animation
--------------------------------------------------------------------------- */
export const easings = {
  smooth: [0.22, 1, 0.36, 1] as const,
  expo: [0.16, 1, 0.3, 1] as const,
  back: [0.34, 1.56, 0.64, 1] as const,
  linear: [0, 0, 1, 1] as const,
  /* cinematic design-system curves (mirror @theme tokens) */
  cinematic: [0.25, 0.46, 0.45, 0.94] as const,
  dramatic: [0.77, 0, 0.175, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
} as const;

/** Framer Motion transition presets */
export const transitions = {
  smooth: { duration: 0.8, ease: easings.smooth },
  expo: { duration: 0.9, ease: easings.expo },
  back: { duration: 0.6, ease: easings.back },
  stagger: (children = 0.08, delay = 0) => ({
    delayChildren: delay,
    staggerChildren: children,
  }),
} as const;
