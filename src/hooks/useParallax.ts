import { useRef } from "react";
import {
  motionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface Parallax<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  /** vertical offset (px) driven by scroll */
  y: MotionValue<number>;
  /** 0 → 1 progress of the element travelling through the viewport */
  progress: MotionValue<number>;
}

/**
 * Scroll-linked vertical drift. The element moves from `+distance` to
 * `-distance` while it crosses the viewport.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  distance = 72
): Parallax<T> {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [distance, -distance]
  );

  return { ref, y, progress: reduced ? motionValue(0) : scrollYProgress };
}
