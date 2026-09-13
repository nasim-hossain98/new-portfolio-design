import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";
import { cn } from "../../lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  /** renders an <a> when provided, otherwise a <button> */
  href?: string;
  className?: string;
  strength?: number;
  variant?: "outline" | "solid";
  onClick?: () => void;
}

/** Pill button with a magnetic pull toward the pointer */
export function MagneticButton({
  children,
  href,
  className,
  strength = 0.35,
  variant = "outline",
  onClick,
}: MagneticButtonProps) {
  const { ref, x, y, onMouseMove, onMouseLeave } =
    useMagneticEffect<HTMLElement>(strength);

  const styles = cn(
    "label inline-flex items-center gap-2.5 rounded-pill px-7 py-3.5",
    "transition-colors duration-300 select-none",
    variant === "outline" &&
      "border border-cinema-text/20 text-cinema-text hover:border-cinema-accent/70 hover:text-cinema-accent hover:bg-cinema-accent/5",
    variant === "solid" &&
      "border border-cinema-black/20 bg-cinema-black/10 text-cinema-black hover:bg-cinema-black/15",
    className
  );

  const motionStyle = { x, y };

  if (href) {
    return (
      <motion.a
        ref={ref as never}
        href={href}
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={motionStyle}
        className={styles}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as never}
      type="button"
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={motionStyle}
      className={styles}
    >
      {children}
    </motion.button>
  );
}
