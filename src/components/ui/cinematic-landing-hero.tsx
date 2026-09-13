import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Flame, Handshake, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STYLES = `
  .cinematic-hero .gsap-reveal { visibility: hidden; }
  .cinematic-hero .film-grain { position:absolute; inset:0; pointer-events:none; z-index:50; opacity:.05; mix-blend-mode:overlay; background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>'); }
  .cinematic-hero .hero-grid { background-size:60px 60px; background-image:linear-gradient(to right,rgba(240,240,245,.055) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,240,245,.055) 1px,transparent 1px); mask-image:radial-gradient(ellipse at center,#000 0%,transparent 70%); }
  .cinematic-hero .text-matte { color:#f0f0f5; text-shadow:0 10px 30px rgba(240,240,245,.16),0 2px 4px rgba(240,240,245,.08); }
  .cinematic-hero .text-silver { background:linear-gradient(180deg,#fff 0%,#70707e 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; filter:drop-shadow(0 10px 20px rgba(0,0,0,.35)); transform:translateZ(0); }
  .cinematic-hero .card-silver { background:linear-gradient(180deg,#fff 0%,#a1a1aa 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; filter:drop-shadow(0 12px 24px rgba(0,0,0,.8)); transform:translateZ(0); }
  .cinematic-hero .depth-card { background:linear-gradient(145deg,#18243e 0%,#090b11 62%,#08090d 100%); box-shadow:0 40px 100px -20px rgba(0,0,0,.9),0 20px 40px -20px rgba(0,0,0,.8),inset 0 1px 2px rgba(255,255,255,.18),inset 0 -2px 4px rgba(0,0,0,.8); border:1px solid rgba(255,255,255,.06); }
  .cinematic-hero .card-sheen { position:absolute; inset:0; border-radius:inherit; pointer-events:none; z-index:50; background:radial-gradient(800px circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(200,169,126,.12),transparent 42%); mix-blend-mode:screen; }
  .cinematic-hero .portrait-stage { transform-style:preserve-3d; filter:drop-shadow(0 42px 45px rgba(0,0,0,.55)); }
  .cinematic-hero .portrait-aura { position:absolute; inset:-12%; border-radius:45%; background:radial-gradient(circle at 50% 35%,rgba(200,169,126,.25),rgba(45,70,115,.14) 38%,transparent 70%); filter:blur(35px); transform:translateZ(-50px); }
  .cinematic-hero .portrait-offset-frame { position:absolute; inset:18px -15px -18px 15px; border:1px solid rgba(200,169,126,.34); border-radius:2.2rem; transform:translateZ(-18px); }
  .cinematic-hero .portrait-shell { position:relative; isolation:isolate; overflow:hidden; border-radius:2rem; background:#08090d; border:1px solid rgba(255,255,255,.12); box-shadow:inset 0 1px 0 rgba(255,255,255,.16),inset 0 0 55px rgba(0,0,0,.35),0 35px 80px rgba(0,0,0,.6); }
  .cinematic-hero .portrait-shell::before { content:""; position:absolute; inset:0; z-index:4; pointer-events:none; border-radius:inherit; box-shadow:inset 0 0 0 1px rgba(255,255,255,.04),inset 0 -80px 100px rgba(0,0,0,.35); }
  .cinematic-hero .portrait-image { transition:transform 1.4s cubic-bezier(.16,1,.3,1),filter 1s ease; filter:saturate(.55) contrast(1.12) brightness(.82); }
  .cinematic-hero .portrait-stage:hover .portrait-image { transform:scale(1.045); filter:saturate(.72) contrast(1.08) brightness(.9); }
  .cinematic-hero .portrait-light { position:absolute; inset:0; z-index:2; pointer-events:none; background:radial-gradient(circle at 52% 26%,rgba(255,238,210,.14),transparent 31%),linear-gradient(180deg,rgba(29,50,88,.12),transparent 45%,rgba(5,6,10,.92) 100%); }
  .cinematic-hero .portrait-sheen { position:absolute; inset:-50%; z-index:3; pointer-events:none; background:linear-gradient(110deg,transparent 42%,rgba(255,255,255,.1) 49%,transparent 56%); transform:translateX(-45%) rotate(8deg); transition:transform 1.2s cubic-bezier(.16,1,.3,1); }
  .cinematic-hero .portrait-stage:hover .portrait-sheen { transform:translateX(45%) rotate(8deg); }
  .cinematic-hero .glass-badge { background:linear-gradient(135deg,rgba(255,255,255,.1),rgba(255,255,255,.015)); backdrop-filter:blur(24px); box-shadow:0 0 0 1px rgba(255,255,255,.1),0 25px 50px -12px rgba(0,0,0,.8),inset 0 1px 1px rgba(255,255,255,.18); }
  .cinematic-hero .hero-button { transition:transform .4s cubic-bezier(.25,1,.5,1),box-shadow .4s cubic-bezier(.25,1,.5,1); }
  .cinematic-hero .hero-button:hover { transform:translateY(-3px); }
  .cinematic-hero .button-light { color:#0f172a; background:linear-gradient(180deg,#fff,#e8e8eb); box-shadow:0 2px 4px rgba(0,0,0,.15),0 12px 24px -4px rgba(0,0,0,.4),inset 0 1px 1px #fff; }
  .cinematic-hero .button-dark { color:#fff; background:linear-gradient(180deg,#29292d,#151518); box-shadow:0 0 0 1px rgba(255,255,255,.1),0 12px 24px -4px rgba(0,0,0,.9),inset 0 1px 1px rgba(255,255,255,.14); }
  .cinematic-hero .progress-ring { transform:rotate(-90deg); transform-origin:center; stroke-dasharray:402; stroke-dashoffset:402; stroke-linecap:round; }
  @media (prefers-reduced-motion:reduce) { .cinematic-hero .gsap-reveal { visibility:visible; } }
`;

export interface CinematicHeroProps extends HTMLAttributes<HTMLElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "Nasim",
  tagline1 = "Designing digital,",
  tagline2 = "experiences with depth.",
  cardHeading = "Ideas, made tangible.",
  cardDescription = <>I combine thoughtful <strong className="font-semibold text-white">UI/UX design</strong> with precise frontend development to create expressive, high-performing digital experiences.</>,
  metricValue = 40,
  metricLabel = "Projects shipped",
  ctaHeading = "Let’s make something remarkable.",
  ctaDescription = "Have an ambitious idea? Let’s turn it into a focused, memorable digital experience.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        if (!cardRef.current || !deviceRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        cardRef.current.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
        gsap.to(deviceRef.current, {
          rotationY: (event.clientX / window.innerWidth - 0.5) * 18,
          rotationX: -(event.clientY / window.innerHeight - 0.5) * 18,
          ease: "power3.out",
          duration: 1.2,
        });
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".gsap-reveal", { visibility: "visible", autoAlpha: 1 });
        gsap.set(".main-card", { y: 0, autoAlpha: 1 });
        gsap.set(".progress-ring", { strokeDashoffset: 60 });
        gsap.set(".counter-value", { innerHTML: metricValue });
        return;
      }

      gsap.set(".opening-line", { autoAlpha: 0, y: 60, scale: 0.86, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".opening-accent", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-copy", ".card-brand", ".device-wrapper", ".floating-badge", ".portrait-detail"], { autoAlpha: 0 });
      gsap.set(".closing-cta", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      gsap.timeline({ delay: 0.3 })
        .to(".opening-line", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".opening-accent", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1");

      const mobile = window.innerWidth < 768;
      gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "+=7000", pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
      })
        .to([".opening-copy", ".hero-grid"], { scale: 1.15, filter: "blur(20px)", opacity: 0.15, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: 0, ease: "power3.inOut", duration: 1.5 })
        .fromTo(".device-wrapper", { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 }, { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=.8")
        .fromTo(".portrait-detail", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12, ease: "power3.out", duration: 1.3 }, "-=1.5")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, stagger: 0.2, ease: "back.out(1.5)", duration: 1.5 }, "-=2")
        .fromTo(".card-copy", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-brand", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".opening-copy", { autoAlpha: 0 })
        .set(".closing-cta", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".device-wrapper", ".floating-badge", ".card-copy", ".card-brand"], { scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05 })
        .to(".main-card", { width: mobile ? "92vw" : "85vw", height: mobile ? "92vh" : "85vh", borderRadius: mobile ? 32 : 40, ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".closing-cta", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, root);
    return () => ctx.revert();
  }, [metricValue]);

  return (
    <section ref={containerRef} id="home" className={cn("cinematic-hero relative flex h-screen w-full items-center justify-center overflow-hidden bg-cinema-black font-sans text-cinema-text antialiased", className)} style={{ perspective: "1500px" }} {...props}>
      <style>{STYLES}</style>
      <div className="film-grain" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0 z-0 opacity-50" aria-hidden="true" />

      <div className="opening-copy absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center [transform-style:preserve-3d]">
        <p className="opening-line gsap-reveal text-matte mb-2 text-5xl font-bold tracking-tight md:text-7xl lg:text-[6rem]">{tagline1}</p>
        <h1 className="opening-accent gsap-reveal text-silver text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-[6rem]">{tagline2}</h1>
      </div>

      <div className="closing-cta gsap-reveal absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center">
        <p className="label mb-5 text-cinema-accent">Available for select projects</p>
        <h2 className="text-silver mb-6 max-w-5xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">{ctaHeading}</h2>
        <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-cinema-muted md:text-xl">{ctaDescription}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a href="#work" className="hero-button button-light flex items-center justify-center gap-3 rounded-[1.25rem] px-7 py-4 font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cinema-accent">
            Selected work <ArrowDownRight size={18} />
          </a>
          <a href="#contact" className="hero-button button-dark flex items-center justify-center gap-3 rounded-[1.25rem] px-7 py-4 font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cinema-accent">
            Start a project <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <div ref={cardRef} className="main-card depth-card gsap-reveal pointer-events-auto relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] md:h-[85vh] md:w-[85vw] md:rounded-[40px]">
          <div className="card-sheen" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-12 lg:py-0">
            <div className="card-brand gsap-reveal order-1 z-20 flex w-full justify-center lg:order-3 lg:justify-end">
              <h2 className="card-silver text-6xl font-black uppercase tracking-tighter md:text-[6rem] lg:text-[7rem]">{brandName}</h2>
            </div>

            <div className="device-wrapper relative order-2 z-10 flex h-[380px] w-full items-center justify-center lg:h-[600px]" style={{ perspective: "1200px" }}>
              <div className="relative flex h-full w-full scale-[.67] items-center justify-center md:scale-[.84] lg:scale-100">
                <div ref={deviceRef} className="portrait-stage relative aspect-[4/5] w-[360px] will-change-transform">
                  <div className="portrait-aura" aria-hidden="true" />
                  <div className="portrait-offset-frame" aria-hidden="true" />
                  <div className="portrait-shell h-full w-full">
                    <img
                      src="/profile.png"
                      alt="Mohammad Nasim"
                      className="portrait-image h-full w-full object-cover object-top"
                    />
                    <div className="portrait-light" aria-hidden="true" />
                    <div className="absolute inset-0 z-[2] bg-cinema-accent/[0.05] mix-blend-color" aria-hidden="true" />
                    <div className="portrait-sheen" aria-hidden="true" />
                    <div className="portrait-detail absolute top-6 right-6 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cinema-accent shadow-[0_0_8px_rgba(200,169,126,.8)]" />
                      <span className="text-[9px] font-bold tracking-[.14em] text-white/70 uppercase">Available</span>
                    </div>
                    <div className="portrait-detail absolute inset-x-0 bottom-0 z-10 p-7 md:p-8">
                      <div className="mb-5 h-px w-12 bg-cinema-accent/70" />
                      <p className="label mb-2 text-cinema-accent">Designer · Developer</p>
                      <p className="font-display text-4xl leading-none text-cinema-text">Mohammad Nasim</p>
                      <p className="mt-3 text-xs tracking-wide text-white/45">UI/UX · Frontend · Creative direction</p>
                    </div>
                  </div>
                  <span className="portrait-detail absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] font-bold tracking-[.3em] text-white/25 uppercase lg:block">Based worldwide</span>
                </div>

                <div className="floating-badge glass-badge absolute top-5 left-[-20px] z-30 flex items-center gap-3 rounded-xl p-3 lg:top-12 lg:left-[-100px] lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cinema-accent/30 bg-cinema-accent/10"><Flame size={17} className="text-cinema-accent" /></div>
                  <div><p className="text-xs font-bold text-white lg:text-sm">5+ years of craft</p><p className="text-[10px] text-white/45 lg:text-xs">Built with intention</p></div>
                </div>
                <div className="floating-badge glass-badge absolute right-[-20px] bottom-8 z-30 flex items-center gap-3 rounded-xl p-3 lg:right-[-100px] lg:bottom-16 lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cinema-accent/30 bg-cinema-accent/10"><Handshake size={17} className="text-cinema-accent" /></div>
                  <div><p className="text-xs font-bold text-white lg:text-sm">{metricValue}+ {metricLabel}</p><p className="text-[10px] text-white/45 lg:text-xs">Open to collaborate</p></div>
                </div>
              </div>
            </div>

            <div className="card-copy gsap-reveal order-3 z-20 flex w-full flex-col justify-center px-4 text-center lg:order-1 lg:px-0 lg:text-left">
              <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:mb-5 lg:text-4xl">{cardHeading}</h3>
              <p className="mx-auto hidden max-w-sm text-sm leading-relaxed font-normal text-blue-100/65 md:block md:text-base lg:mx-0 lg:max-w-none lg:text-lg">{cardDescription}</p>
              <a href="mailto:hello@arik.design" className="mt-7 hidden w-fit items-center gap-2 text-xs font-bold tracking-widest text-cinema-accent uppercase lg:flex">Say hello <Mail size={14} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
