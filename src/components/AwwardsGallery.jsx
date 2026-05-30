import { forwardRef } from 'react'
import './AwwardsGallery.css'

const cardVariants = ['is-tall', 'is-wide', 'is-portrait', 'is-portrait', 'is-tall']

const AwwardsGallery = forwardRef(function AwwardsGallery(
  { images, hint, innerRef },
  trackRef,
) {
  return (
    <div className="awwwards-gallery">
      <div className="awwwards-gallery__edge awwwards-gallery__edge--left" aria-hidden="true" />
      <div className="awwwards-gallery__edge awwwards-gallery__edge--right" aria-hidden="true" />

      <div className="awwwards-gallery__track" ref={trackRef}>
        <div className="awwwards-gallery__inner" ref={innerRef}>
          {images.map((image, index) => (
            <figure
              className={`awwwards-gallery__card ${cardVariants[index % cardVariants.length]}`}
              key={image.src}
            >
              <img src={image.src} alt={image.alt} loading="lazy" draggable={false} />
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {hint ? <p className="awwwards-gallery__hint">{hint}</p> : null}
    </div>
  )
})

export default AwwardsGallery
