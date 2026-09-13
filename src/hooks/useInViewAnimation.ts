import { useEffect, useRef } from "react";
import { useAnimation, useInView, type Variants } from "framer-motion";
import { easings } from "../lib/utils";
import { useReducedMotion } from "./useReducedMotion";

interface Options {
  once?: boolean;
  amount?: number | "some" | "all";
  /** extra delay (seconds) before the reveal starts */
  delay?: number;
  /**
   * Start the `"visible"` / `"hidden"` variant labels instead of direct
   * values — required when children declare their own `variants` and rely
   * on propagation from this controller.
   */
  variantsMode?: boolean;
}

/** Reusable fade/rise reveal driven by viewport intersection */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const { once = true, amount = 0.25, delay = 0, variantsMode = false } = options;
  const ref = useRef<T | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once, amount, margin: "0px 0px -8% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      if (variantsMode) controls.set("visible");
      else controls.set({ opacity: 1, y: 0, x: 0 });
      return;
    }
    if (inView) {
      if (variantsMode) {
        controls.start("visible");
      } else {
        controls.start({
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.8, ease: easings.smooth, delay },
        });
      }
    } else if (!once) {
      if (variantsMode) controls.start("hidden");
      else controls.start({ opacity: 0, y: 32 });
    }
  }, [inView, reduced, controls, once, delay, variantsMode]);

  return { ref, controls, inView };
}

/** Shared variants for consumers that prefer `animate={controls}` + variants */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easings.smooth },
  },
};
