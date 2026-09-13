import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { easings, cn } from "../../lib/utils";
import type { RevealVariant } from "../../types";

interface AnimatedTextProps {
  text: string;
  variant?: RevealVariant;
  className?: string;
  /** base delay (seconds) before the stagger begins */
  delay?: number;
  /** gap (seconds) between each unit */
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

const unit: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: easings.expo },
  },
};

function split(text: string, variant: RevealVariant): string[] {
  if (variant === "character") return text.split("");
  if (variant === "word") return text.split(" ");
  return text.split("\n");
}

/** Character / word / line reveal driven by viewport intersection */
export function AnimatedText({
  text,
  variant = "word",
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
  as = "span",
}: AnimatedTextProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;
  const parts = split(text, variant);

  if (reduced) {
    return <Tag className={cn("block", className)}>{text}</Tag>;
  }

  return (
    <Tag
      className={cn("block", className)}
      variants={container(delay, variant === "character" ? stagger : stagger * 2)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      aria-label={text}
    >
      {parts.map((part, i) => (
        <motion.span
          key={i}
          variants={unit}
          className="inline-block overflow-hidden align-bottom will-change-transform"
          aria-hidden="true"
        >
          <span className="inline-block will-change-transform">
            {part === " " || part === "" ? "\u00A0" : part}
          </span>
          {variant === "word" && i < parts.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
