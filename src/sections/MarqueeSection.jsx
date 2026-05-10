import { useMarqueePhysics } from "../hooks/useMarqueePhysics";
import galleryInterior from "../assets/unnamed.jpg";
import galleryDetail from "../assets/unnamed-2.jpg";
import galleryWide from "../assets/2026-04-30.jpg";

const galleryImages = [
  {
    src: galleryInterior,
    alt: "Doktor Barber interior with stone texture and barber chair",
    className: "is-primary",
  },
  {
    src: galleryDetail,
    alt: "Warm wood and gold-lit barber station detail",
    className: "is-left",
  },
  {
    src: galleryWide,
    alt: "Wide view of the Doktor Barber interior and chairs",
    className: "is-right",
  },
];

export default function MarqueeSection({ t }) {
  const stripRef = useMarqueePhysics();

  return (
    <section
      ref={stripRef}
      className="marquee-strip"
      aria-label="Brand philosophy marquee"
    >
      <div className="marquee-row">
        <div className="marquee-track">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index}>{t.marquee}</span>
          ))}
        </div>
      </div>
      <div className="marquee-gallery-zone">
        <div className="marquee-row marquee-row--inverted">
          <div className="marquee-track marquee-track--reverse">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index}>{t.marqueeSecondary}</span>
            ))}
          </div>
        </div>
        <div className="marquee-gallery-rule" aria-hidden="true" />
        <div
          className="marquee-gallery"
          aria-label="Doktor Barber interior gallery"
        >
          {galleryImages.map((image) => (
            <figure
              className={`marquee-gallery-card ${image.className}`}
              key={image.src}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
