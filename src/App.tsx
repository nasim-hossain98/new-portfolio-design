import { useEffect, useRef } from "react";
import {
  SmoothScroll,
  useSmoothScroll,
} from "./components/layout/SmoothScroll";
import { PageTransition } from "./components/layout/PageTransition";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { ClientMarquee } from "./components/sections/ClientMarquee";
import { ServicesSection } from "./components/sections/ServicesSection";
import { SelectedWork } from "./components/sections/SelectedWork";
import { ProcessSection } from "./components/sections/ProcessSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { AboutSection } from "./components/sections/AboutSection";
import { CTASection } from "./components/sections/CTASection";
import { AllWorksPage } from "./pages/AllWorksPage";
import { FilmGrain } from "./components/effects/FilmGrain";
import { GradientMesh } from "./components/effects/GradientMesh";
import { CustomCursor } from "./components/effects/CustomCursor";
import { consumePendingSection, useRoute } from "./lib/router";

/** Landing page — every editorial section stacked in order. */
function HomePage() {
  return (
    <>
      <main className="relative">
        <HeroSection />
        <ClientMarquee />
        <ServicesSection />
        <SelectedWork />
        <ProcessSection />
        <TestimonialsSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

/** Resets scroll on navigation, or jumps to the section a link asked for. */
function RouteScroll() {
  const { lenis, scrollTo } = useSmoothScroll();
  const route = useRoute();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const frame = requestAnimationFrame(() => {
      const section = consumePendingSection();

      if (route === "works" || !section) {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
        return;
      }

      scrollTo(section);
    });

    return () => cancelAnimationFrame(frame);
    // `lenis` / `scrollTo` are read at navigation time only — not dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  return null;
}

function App() {
  const route = useRoute();

  return (
    <SmoothScroll>
      <CustomCursor />
      <GradientMesh />
      <FilmGrain />

      <Navbar />
      <RouteScroll />

      <PageTransition pageKey={route}>
        {route === "works" ? (
          <>
            <main className="relative">
              <AllWorksPage />
            </main>
            <Footer />
          </>
        ) : (
          <HomePage />
        )}
      </PageTransition>
    </SmoothScroll>
  );
}

export default App;
