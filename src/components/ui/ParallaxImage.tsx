import { motion } from "framer-motion";
import { useParallax } from "../../hooks/useParallax";
import { cn } from "../../lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** total vertical drift in px across the viewport */
  distance?: number;
}

/** Image with a scroll-linked vertical drift inside a clipped frame */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  distance = 72,
}: ParallaxImageProps) {
  const { ref, y } = useParallax<HTMLDivElement>(distance);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1.18 }}
        className={cn(
          "h-full w-full object-cover will-change-transform",
          imgClassName
        )}
      />
    </div>
  );
}
