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
import { usePageSeo } from "./hooks/usePageSeo";
import SiteHeader from "./sections/SiteHeader";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import GallerySection from "./sections/GallerySection";
import LocationSection from "./sections/LocationSection";
import BookingModal from "./components/BookingModal";
import BookingClosure from "./sections/BookingClosure";

function App() {
  const [locale, setLocale] = useState("cs");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);
  useLenisSmoothScroll();
  usePageSeo(locale);
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
    document.body.style.overflow = menuOpen || bookingOpen ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setBookingOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, bookingOpen]);

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
        onBook={openBooking}
      />

      <BrandLogoFlyout
        metrics={metrics}
        headerOnDark={headerOnDark}
        reducedMotion={reducedMotion}
      />

      <main>
        <HeroSection t={t} heroLogoRef={heroLogoRef} />
        <MarqueeSection />
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <TestimonialsSection t={t} />
        <GallerySection t={t} />
        <LocationSection t={t} />
      </main>

      <BookingClosure t={t} onBook={openBooking} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={closeBooking}
        title={t.booking.modalTitle}
      />

      <button
        type="button"
        className={`book-floating ${bookOnDark ? "book-floating--on-dark" : ""}`}
        onClick={openBooking}
      >
        BOOK US
      </button>
    </div>
  );
}

export default App;
