import { SmoothScroll } from "./components/layout/SmoothScroll";
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
import { FilmGrain } from "./components/effects/FilmGrain";
import { GradientMesh } from "./components/effects/GradientMesh";
import { CustomCursor } from "./components/effects/CustomCursor";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <GradientMesh />
      <FilmGrain />

      <PageTransition pageKey="home">
        <Navbar />
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
      </PageTransition>
    </SmoothScroll>
  );
}

export default App;
