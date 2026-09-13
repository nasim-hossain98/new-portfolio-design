import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function signedOffset(index: number, active: number, length: number, loop: boolean) {
  const raw = index - active;
  if (!loop || length <= 1) return raw;

  const alternative = raw > 0 ? raw - length : raw + length;
  return Math.abs(alternative) < Math.abs(raw) ? alternative : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 560,
  cardHeight = 350,
  overlap = 0.64,
  spreadDeg = 28,
  perspectivePx = 1200,
  depthPx = 90,
  tiltXDeg = 7,
  activeLiftPx = 28,
  activeScale = 1.03,
  inactiveScale = 0.92,
  springStiffness = 260,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 3200,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const length = items.length;
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const [stageWidth, setStageWidth] = React.useState(cardWidth + 48);
  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, length));
  const [hovering, setHovering] = React.useState(false);

  React.useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateWidth = () => setStageWidth(stage.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    setActive((current) => wrapIndex(current, length));
  }, [length]);

  React.useEffect(() => {
    const item = items[active];
    if (item) onChangeIndex?.(active, item);
  }, [active, items, onChangeIndex]);

  const canGoPrevious = loop || active > 0;
  const canGoNext = loop || active < length - 1;

  const previous = React.useCallback(() => {
    if (!length || !canGoPrevious) return;
    setActive((current) => wrapIndex(current - 1, length));
  }, [canGoPrevious, length]);

  const next = React.useCallback(() => {
    if (!length || !canGoNext) return;
    setActive((current) => wrapIndex(current + 1, length));
  }, [canGoNext, length]);

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !length || (pauseOnHover && hovering)) return;

    const timer = window.setInterval(() => {
      if (loop || active < length - 1) next();
    }, Math.max(700, intervalMs));

    return () => window.clearInterval(timer);
  }, [active, autoAdvance, hovering, intervalMs, length, loop, next, pauseOnHover, reduceMotion]);

  if (!length) return null;

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const responsiveWidth = Math.min(cardWidth, Math.max(280, stageWidth - 40));
  const cardSpacing = Math.max(24, Math.round(responsiveWidth * (1 - overlap)));
  const stepDegrees = maxOffset > 0 ? spreadDeg / maxOffset : 0;
  const activeItem = items[active];

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        ref={stageRef}
        className="relative w-full outline-none"
        style={{ height: cardHeight + 120 }}
        tabIndex={0}
        role="region"
        aria-label="Client testimonial carousel"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") previous();
          if (event.key === "ArrowRight") next();
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[15%] bottom-5 h-32 rounded-[50%] bg-cinema-accent/[0.07] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-20 h-56 w-[55%] -translate-x-1/2 rounded-full bg-cinema-text/[0.025] blur-3xl"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const offset = signedOffset(index, active, length, loop);
              const distance = Math.abs(offset);
              if (distance > maxOffset) return null;

              const isActive = offset === 0;
              const x = offset * cardSpacing;
              const y = distance * 18;
              const z = -distance * depthPx;
              const rotateZ = offset * stepDegrees;
              const rotateY = offset * -4;
              const rotateX = isActive ? 0 : tiltXDeg;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;

              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.16,
                    onDragEnd: (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                      if (reduceMotion) return;
                      const threshold = Math.min(150, responsiveWidth * 0.2);
                      if (info.offset.x > threshold || info.velocity.x > 650) previous();
                      if (info.offset.x < -threshold || info.velocity.x < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 overflow-hidden rounded-[1.65rem] border will-change-transform select-none",
                    isActive
                      ? "cursor-grab border-cinema-accent/35 shadow-[0_35px_120px_rgba(0,0,0,0.55),0_0_60px_rgba(200,169,126,0.08)] active:cursor-grabbing"
                      : "cursor-pointer border-cinema-text/10 shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
                  )}
                  style={{
                    width: responsiveWidth,
                    height: cardHeight,
                    zIndex: 100 - distance,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x, y: y + 50, rotateZ, rotateX, rotateY, scale: scale * 0.94 }
                  }
                  animate={{
                    opacity: 1 - distance * 0.12,
                    x,
                    y: y + lift,
                    z,
                    rotateZ,
                    rotateX,
                    rotateY,
                    scale,
                  }}
                  exit={{ opacity: 0, y: y + 35, scale: scale * 0.92 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: springStiffness, damping: springDamping }
                  }
                  onClick={() => setActive(index)}
                  {...dragProps}
                >
                  <div className="h-full w-full">
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultCard item={item} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots && activeItem ? (
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2.5">
            {items.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    selected
                      ? "w-7 bg-cinema-accent"
                      : "w-1.5 bg-cinema-text/20 hover:bg-cinema-text/45"
                  )}
                  aria-label={`Show ${item.title}`}
                  aria-current={selected ? "true" : undefined}
                />
              );
            })}
          </div>

          {activeItem.href ? (
            <a
              href={activeItem.href}
              target="_blank"
              rel="noreferrer"
              className="text-cinema-muted transition-colors hover:text-cinema-accent"
              aria-label={`Open ${activeItem.title}`}
            >
              <ArrowUpRight size={15} />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function DefaultCard({ item }: { item: CardStackItem }) {
  return (
    <div className="relative h-full w-full bg-cinema-surface">
      {item.imageSrc ? (
        <img
          src={item.imageSrc}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/25 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        {item.tag ? <span className="label mb-3 text-cinema-accent">{item.tag}</span> : null}
        <p className="font-display text-2xl text-cinema-text">{item.title}</p>
        {item.description ? (
          <p className="mt-2 line-clamp-2 text-sm text-cinema-text/70">{item.description}</p>
        ) : null}
      </div>
    </div>
  );
}
