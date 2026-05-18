import { useEffect, useRef, useState } from "react";
import BrandLogoFlyout from "./components/BrandLogoFlyout";
import { useHeroLogoFlyout } from "./hooks/useHeroLogoFlyout";
import "./App.css";
import { siteContent } from "./content/siteContent";
import {
  useBookFloatingSurfaceTheme,
  useHeaderSurfaceTheme,
} from "./hooks/useHeaderSurfaceTheme";
import { useLenisSmoothScroll } from "./hooks/useLenisSmoothScroll";
import SiteHeader from "./sections/SiteHeader";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import LocationSection from "./sections/LocationSection";
import BookingClosure from "./sections/BookingClosure";

function App() {
  const [locale, setLocale] = useState("cs");
  const [menuOpen, setMenuOpen] = useState(false);
  useLenisSmoothScroll();
  const headerOnDark = useHeaderSurfaceTheme();
  const bookOnDark = useBookFloatingSurfaceTheme();
  const t = siteContent[locale];
  const heroLogoRef = useRef(null);
  const headerLogoRef = useRef(null);
  const { metrics, reducedMotion } = useHeroLogoFlyout({
    heroAnchorRef: heroLogoRef,
    headerAnchorRef: headerLogoRef,
    menuOpen,
  });
  const logoVisible = reducedMotion || Boolean(metrics?.showHeaderLogo);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <div className="page">
      <SiteHeader
        ref={headerLogoRef}
        t={t}
        locale={locale}
        setLocale={setLocale}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        headerOnDark={headerOnDark}
        logoVisible={logoVisible}
      />

      <BrandLogoFlyout
        metrics={metrics}
        headerOnDark={headerOnDark}
        reducedMotion={reducedMotion}
      />

      <main>
        <HeroSection t={t} heroLogoRef={heroLogoRef} />
        <MarqueeSection t={t} />
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <TestimonialsSection t={t} />
        <LocationSection t={t} />
      </main>

      <BookingClosure t={t} />

      <a
        href="#booking"
        className={`book-floating ${bookOnDark ? "book-floating--on-dark" : ""}`}
      >
        BOOK US
      </a>
    </div>
  );
}

export default App;
