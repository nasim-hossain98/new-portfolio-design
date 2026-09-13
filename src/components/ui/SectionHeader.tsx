import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";
import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  label?: string;
  /** main heading — string for an animated reveal, node for custom markup */
  title: ReactNode;
  /** optional italicised second line */
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Consistent editorial section heading: label, display title, optional copy */
export function SectionHeader({
  label,
  title,
  accent,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const { ref, controls } = useInViewAnimation<HTMLDivElement>({
    amount: 0.3,
    variantsMode: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-12",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {label && (
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="label text-cinema-accent"
        >
          {label}
        </motion.span>
      )}

      <h2 className="font-display text-display-lg text-cinema-text text-balance">
        {typeof title === "string" ? (
          <>
            <AnimatedText text={title} as="span" />
            {accent && (
              <AnimatedText
                text={accent}
                as="span"
                className="font-serif italic text-cinema-accent"
                delay={0.12}
              />
            )}
          </>
        ) : (
          title
        )}
      </h2>

      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.15 },
            },
          }}
          className={cn("max-w-md text-sm leading-relaxed text-cinema-muted", align === "center" && "mx-auto")}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
