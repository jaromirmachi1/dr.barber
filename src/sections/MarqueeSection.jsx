import { useGalleryParallax } from "../hooks/useGalleryParallax";
import galleryInterior from "../assets/gallery/vyska5.webp";
import galleryDetail from "../assets/gallery/brb6.webp";
import galleryWide from "../assets/gallery/brb9.webp";

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

export default function MarqueeSection() {
  const galleryRef = useGalleryParallax();

  return (
    <section
      className="marquee-strip"
      aria-label="Interior gallery and philosophy marquee"
    >
      <div className="marquee-gallery-zone">
        <div
          ref={galleryRef}
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
