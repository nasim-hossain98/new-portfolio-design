import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface MagneticEffect<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (e: MouseEvent<T>) => void;
  onMouseLeave: () => void;
}

/**
 * Magnetic pull toward the pointer. Attach `ref` + handlers to the element
 * and feed `x`/`y` into a `motion.*` style.
 */
export function useMagneticEffect<T extends HTMLElement = HTMLElement>(
  strength = 0.35
): MagneticEffect<T> {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 160, damping: 16, mass: 0.2 });
  const y = useSpring(rawY, { stiffness: 160, damping: 16, mass: 0.2 });

  const onMouseMove = (e: MouseEvent<T>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) * strength);
    rawY.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave };
}
