import { useRef, useState } from "react";
import { useMarqueePhysics } from "../hooks/useMarqueePhysics";
import vyska2 from "../assets/gallery/vyska2.webp";
import vyska3 from "../assets/gallery/vyska3.webp";
import vyska4 from "../assets/gallery/vyska4.webp";
import vyska5 from "../assets/gallery/vyska5.webp";
import vyska6 from "../assets/gallery/vyska6.webp";

const heroCursorImages = [
  {
    src: vyska2,
    alt: "Doktor Barber — vertical salon interior",
  },
  {
    src: vyska3,
    alt: "Doktor Barber — barber station detail",
  },
  {
    src: vyska4,
    alt: "Doktor Barber — grooming space atmosphere",
  },
  {
    src: vyska5,
    alt: "Doktor Barber — interior texture and light",
  },
  {
    src: vyska6,
    alt: "Doktor Barber — salon portrait view",
  },
];

export default function HeroSection({ t, heroLogoRef }) {
  const heroMarqueeRef = useMarqueePhysics();
  const [heroActive, setHeroActive] = useState(false);
  const [heroFrame, setHeroFrame] = useState(0);
  const heroFrameRef = useRef(0);

  const handleHeroPointerMove = (event) => {
    const heroMain = event.currentTarget;
    const heroBlock = heroMain.parentElement;
    if (!heroBlock) return;

    const { left, top } = heroBlock.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const nextFrame =
      Math.abs(Math.floor((x + y) / 220)) % heroCursorImages.length;

    heroBlock.style.setProperty("--cursor-x", `${x}px`);
    heroBlock.style.setProperty("--cursor-y", `${y}px`);

    if (!heroActive) {
      setHeroActive(true);
    }

    if (nextFrame !== heroFrameRef.current) {
      heroFrameRef.current = nextFrame;
      setHeroFrame(nextFrame);
    }
  };

  return (
    <section id="hero" className="hero-block">
      <div
        className={`hero-cursor-gallery ${heroActive ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        {heroCursorImages.map((item, index) => (
          <div
            className={`hero-frame ${heroFrame === index ? "is-active" : ""}`}
            key={item.src}
          >
            <img src={item.src} alt="" />
          </div>
        ))}
      </div>

      <div
        className="hero-main"
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={() => setHeroActive(false)}
      >
        <div className="hero-content">
          <div
            ref={heroLogoRef}
            className="hero-logo-anchor"
            aria-hidden="true"
          />
          <h1>
            <span>{t.hero.titleTop}</span>
            <span>{t.hero.titleBottom}</span>
          </h1>
        </div>
      </div>

      <div ref={heroMarqueeRef} className="hero-marquee">
        <div className="marquee-row marquee-row--hero">
          <div className="marquee-track">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index}>{t.marquee}</span>
            ))}
          </div>
        </div>
        <div className="marquee-row marquee-row--inverted hero-marquee__inverted">
          <div className="marquee-track marquee-track--reverse">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={`secondary-${index}`}>{t.marqueeSecondary}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
