import { useRef } from 'react'
import AwwardsGallery from '../components/AwwardsGallery'
import { galleryImageSources } from '../data/galleryImages'
import { useGalleryScrollPin } from '../hooks/useGalleryScrollPin'

export default function GallerySection({ t }) {
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const innerRef = useRef(null)

  const galleryImages = galleryImageSources.map((src, index) => ({
    src,
    alt:
      t.gallery.images[index % t.gallery.images.length]?.alt ??
      'Doktor Barber salon',
  }))

  const { pinHeight, progress } = useGalleryScrollPin({
    pinRef,
    trackRef,
    innerRef,
  })

  return (
    <section id="gallery" className="gallery-section" aria-labelledby="gallery-title">
      <div
        className="gallery-pin"
        ref={pinRef}
        style={{ height: pinHeight > 0 ? `${pinHeight}px` : undefined }}
      >
        <div className="gallery-pin__sticky">
          <div className="gallery-heading">
            <span>{t.gallery.kicker}</span>
            <div>
              <h2 id="gallery-title">{t.gallery.title}</h2>
              <p>{t.gallery.lede}</p>
            </div>
          </div>

          <div className="gallery-pin__viewport" aria-label={t.gallery.ariaLabel}>
            <AwwardsGallery
              ref={trackRef}
              innerRef={innerRef}
              images={galleryImages}
              hint={t.gallery.hint}
            />
          </div>

          <div className="gallery-pin__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </section>
  )
}
