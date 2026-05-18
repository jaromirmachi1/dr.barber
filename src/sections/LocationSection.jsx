import salonInterior from '../assets/unnamed.jpg'
import salonDetail from '../assets/unnamed-2.jpg'
import salonWide from '../assets/2026-04-30.jpg'

export default function LocationSection({ t }) {
  const salonImages = [
    { src: salonInterior, alt: t.location.imageAlt.interior },
    { src: salonDetail, alt: t.location.imageAlt.detail },
    { src: salonWide, alt: t.location.imageAlt.wide },
  ]

  return (
    <section id="location" className="location-section" aria-labelledby="location-title">
      <div className="location-heading">
        <span className="location-heading-kicker">{t.location.kicker}</span>
        <h2 id="location-title">{t.location.title}</h2>
      </div>

      <div className="location-grid">
        <div className="location-gallery" aria-label={t.location.galleryLabel}>
          {salonImages.map((image) => (
            <figure key={image.src} className="location-image">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>

        <div className="location-panel">
          <article className="location-card">
            <ul className="location-details" aria-label={t.location.contactsLabel}>
              <li>
                <span>{t.location.addressLabel}</span>
                <p>{t.location.address}</p>
              </li>
              <li>
                <span>{t.location.phoneLabel}</span>
                <a href={`tel:${t.location.phoneHref}`}>{t.location.phone}</a>
              </li>
            </ul>

            <div className="location-actions">
              <a href={t.location.mapLink} target="_blank" rel="noreferrer">
                {t.location.directionsCta}
              </a>
              <a href={`tel:${t.location.phoneHref}`}>{t.location.callCta}</a>
            </div>
          </article>

          <div className="location-map" aria-label={t.location.mapLabel}>
            <iframe
              title={t.location.mapLabel}
              src={t.location.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
