import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface MousePosition {
  /** spring-smoothed pointer coordinates */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** raw, un-smoothed pointer coordinates */
  rawX: MotionValue<number>;
  rawY: MotionValue<number>;
}

/** Track the pointer across the window; returns both raw and spring-smoothed values */
export function useMousePosition(stiffness = 320, damping = 30): MousePosition {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping, mass: 0.4 });
  const y = useSpring(rawY, { stiffness, damping, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return { x, y, rawX, rawY };
}
