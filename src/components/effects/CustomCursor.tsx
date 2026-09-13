import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type CursorMode = "default" | "link" | "view";

/**
 * Custom cursor: a precise dot + trailing ring that swells over interactive
 * elements. Elements can opt into a labeled "View" state via
 * `data-cursor="view"` (used on project cards).
 * Only activates on fine pointers; the native cursor is restored otherwise.
 */
export function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [hidden, setHidden] = useState(true);
  const reduced = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const target = e.target as HTMLElement | null;
      const labeled = target?.closest<HTMLElement>("[data-cursor]");
      if (labeled) {
        setMode((labeled.dataset.cursor as CursorMode) ?? "view");
        return;
      }
      const interactive = target?.closest("a, button, [role='button'], input, textarea, select, label");
      setMode(interactive ? "link" : "default");
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [reduced, x, y]);

  const ringSize = mode === "view" ? 84 : mode === "link" ? 56 : 36;
  const template = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;
  const ringTemplate = useMotionTemplate`translate3d(${ringX}px, ${ringY}px, 0)`;

  if (reduced) return null;

  return (
    <>
      {/* dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100]"
        style={{ transform: template, opacity: hidden ? 0 : 1 }}
      >
        <div className="relative -top-[3px] -left-[3px] h-1.5 w-1.5 rounded-full bg-cinema-accent" />
      </motion.div>

      {/* trailing ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99]"
        style={{ transform: ringTemplate, opacity: hidden ? 0 : 1 }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            backgroundColor: mode === "view" ? "rgba(200,169,126,0.12)" : "transparent",
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center rounded-full border border-cinema-accent/40"
          style={{ translateX: "-50%", translateY: "-50%" }}
        >
          {mode === "view" && (
            <span className="label text-[9px] text-cinema-accent">View</span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
