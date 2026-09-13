import { useId } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface FilmGrainProps {
  opacity?: number;
  /** animate the noise field (steps jitter) — costs a little CPU */
  animated?: boolean;
}

/**
 * Full-viewport SVG turbulence overlay for an analog film-grain texture.
 * Pure CSS/SVG — no canvas, plays nicely with Lenis transforms.
 */
export function FilmGrain({ opacity = 0.05, animated = true }: FilmGrainProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduced = useReducedMotion();
  const animate = animated && !reduced;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
        style={{ opacity, mixBlendMode: "overlay" }}
      >
        <div
          className={animate ? `grain-jitter-${id}` : "absolute inset-0"}
          style={animate ? undefined : {}}
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id={`grain-${id}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.72"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#grain-${id})`} />
          </svg>
        </div>
      </div>

      {animate && (
        <style>{`
          @keyframes grain-jitter-${id} {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-2%, -3%); }
            20% { transform: translate(3%, 2%); }
            30% { transform: translate(-3%, 3%); }
            40% { transform: translate(2%, -2%); }
            50% { transform: translate(-2%, 2%); }
            60% { transform: translate(3%, -3%); }
            70% { transform: translate(-3%, -2%); }
            80% { transform: translate(2%, 3%); }
            90% { transform: translate(-1%, 1%); }
          }
          .grain-jitter-${id} {
            position: absolute;
            inset: -12%;
            animation: grain-jitter-${id} 0.9s steps(9) infinite;
            will-change: transform;
          }
        `}</style>
      )}
    </>
  );
}
