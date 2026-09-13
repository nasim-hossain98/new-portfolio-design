import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../lib/utils";

interface ScrollIndicatorProps {
  className?: string;
  label?: string;
}

/** Bouncing circular scroll cue with an animated progress ring */
export function ScrollIndicator({ className, label = "Scroll" }: ScrollIndicatorProps) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <span className="label text-cinema-muted">{label}</span>
      <motion.div
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-cinema-text/25"
      >
        <ArrowDown size={18} className="text-cinema-accent" />
      </motion.div>
    </div>
  );
}
