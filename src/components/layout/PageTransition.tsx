import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easings } from "../../lib/utils";

interface PageTransitionProps {
  children: ReactNode;
  /** unique key — changing it replays the reveal */
  pageKey?: string;
}

/**
 * Single-page intro transition: three cinema-black curtains rise to reveal
 * the site, with a small monogram flash. Plays once on mount (or when
 * pageKey changes).
 */
export function PageTransition({ children, pageKey = "home" }: PageTransitionProps) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[80] flex items-end overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{
                  backgroundColor: ["#1a1a24", "#12121a", "#0a0a0f"][i],
                  transformOrigin: "top",
                }}
                initial={{ y: 0 }}
                animate={{ y: "-101%" }}
                transition={{
                  duration: 0.9,
                  ease: easings.expo,
                  delay: 0.55 + i * 0.09,
                }}
              />
            ))}
            <motion.span
              className="label relative z-10 mb-12 ml-8 text-cinema-muted"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Nasim Hossain — UI/UX &amp; Frontend
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pageKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        {children}
      </motion.div>
    </>
  );
}
