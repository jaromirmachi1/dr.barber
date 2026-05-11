import { useEffect, useState } from "react";
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
import BookingSection from "./sections/BookingSection";
import SiteFooter from "./sections/SiteFooter";

function App() {
  const [locale, setLocale] = useState("cs");
  const [menuOpen, setMenuOpen] = useState(false);
  useLenisSmoothScroll();
  const headerOnDark = useHeaderSurfaceTheme();
  const bookOnDark = useBookFloatingSurfaceTheme();
  const t = siteContent[locale];

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
        t={t}
        locale={locale}
        setLocale={setLocale}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        headerOnDark={headerOnDark}
      />

      <main>
        <HeroSection t={t} />
        <MarqueeSection t={t} />
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <TestimonialsSection t={t} />
        <LocationSection t={t} />
        <BookingSection t={t} />
      </main>

      <SiteFooter t={t} />

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
