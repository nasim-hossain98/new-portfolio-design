import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Ambient backdrop for the whole page: a deep cinema-black vignette with
 * faint champagne-gold glows drifting above and below.
 * Fixed + low-opacity, so it layers under all sections without noise.
 */
export function GradientMesh() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(200,169,126,0.05) 0%, transparent 55%)," +
            "radial-gradient(90% 60% at 85% 100%, rgba(200,169,126,0.04) 0%, transparent 60%)," +
            "radial-gradient(140% 140% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* drifting champagne wash — top left */}
      {!reduced && (
        <motion.div
          animate={{ x: [0, 90, 0], y: [0, -50, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 h-[70vh] w-[70vw] rounded-full opacity-60 blur-3xl will-change-transform"
          style={{
            background:
              "radial-gradient(closest-side, rgba(200,169,126,0.05), transparent 70%)",
          }}
        />
      )}

      {/* drifting champagne warmth — bottom right */}
      {!reduced && (
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 40, 0] }}
          transition={{ duration: 41, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-1/5 -bottom-1/5 h-[60vh] w-[55vw] rounded-full opacity-50 blur-3xl will-change-transform"
          style={{
            background:
              "radial-gradient(closest-side, rgba(200,169,126,0.045), transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
