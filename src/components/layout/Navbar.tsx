import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useSmoothScroll } from "./SmoothScroll";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { easings, cn } from "../../lib/utils";
import type { NavItem } from "../../types";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

const liVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easings.expo },
  },
  exit: { opacity: 0, y: 30, transition: { duration: 0.25, ease: "easeIn" as const } },
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollY } = useScrollProgress();
  const { lenis, scrollTo } = useSmoothScroll();
  const reduced = useReducedMotion();

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  /* glassmorphism after 100px of scroll */
  const scrolled = scrollY > 100;

  /* scroll-spy — piggyback on the throttled scroll progress updates */
  useEffect(() => {
    const probe = scrollY + window.innerHeight * 0.35;
    let current = SECTION_IDS[0];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= probe) current = id;
    }
    setActive(current);
  }, [scrollY]);

  /* Escape closes; Tab is trapped inside the open menu */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const overlay = overlayRef.current;
      if (!overlay) return;
      const focusables = [
        toggleRef.current,
        ...Array.from(overlay.querySelectorAll<HTMLElement>("a, button")),
      ].filter((el): el is HTMLElement => el !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /* focus first link on open; freeze Lenis while the menu is up */
  useEffect(() => {
    if (open) {
      lenis?.stop();
      overlayRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [open, lenis]);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <motion.header
        initial={reduced ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easings.expo, delay: 1.4 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-[400ms]",
          scrolled
            ? "border-b border-white/5 bg-cinema-black/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto grid h-16 max-w-container-page grid-cols-[1fr_auto] items-center px-6 md:h-20 md:grid-cols-[1fr_auto_1fr]">
          {/* logo — scrolls to top */}
          <button
            onClick={() => go("#home")}
            aria-label="arik — back to top"
            className="justify-self-start font-display text-xl tracking-wider text-cinema-text transition-colors duration-300 hover:text-cinema-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cinema-accent"
          >
            arik<span className="text-cinema-accent">.</span>
          </button>

          {/* desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => go(item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group relative py-2 text-xs font-medium tracking-widest uppercase",
                        "transition-colors duration-300",
                        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cinema-accent",
                        isActive
                          ? "text-cinema-accent"
                          : "text-cinema-muted hover:text-cinema-accent"
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-cinema-accent",
                          "transition-transform duration-300 ease-out",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* mobile toggle */}
          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-white/10 text-cinema-text transition-colors duration-300 hover:border-cinema-accent/60 hover:text-cinema-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinema-accent md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ opacity: 0, rotate: -40 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 40 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.15 } }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-cinema-black/95 px-8 backdrop-blur-2xl md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              className="flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.href}
                  variants={liVariants}
                  className="border-b border-white/5"
                >
                  <button
                    onClick={() => go(item.href)}
                    className={cn(
                      "group flex w-full items-baseline gap-5 py-4 text-left",
                      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cinema-accent"
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-3xl tracking-wide uppercase transition-colors duration-300",
                        active === item.href.slice(1)
                          ? "text-cinema-accent"
                          : "text-cinema-text group-hover:text-cinema-accent"
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
