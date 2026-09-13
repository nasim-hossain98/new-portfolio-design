import { useEffect, useState } from "react";
import { clamp } from "../lib/utils";
import type { ScrollProgressState } from "../types";

/**
 * Document scroll progress. Works with Lenis because Lenis drives the
 * native scroller, so `scroll` events fire every animation frame.
 */
export function useScrollProgress(): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    progress: 0,
    scrollY: 0,
    direction: 1,
  });

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState((prev) => ({
        progress: max > 0 ? clamp(y / max, 0, 1) : 0,
        scrollY: y,
        direction: y >= prev.scrollY ? 1 : -1,
      }));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return state;
}
