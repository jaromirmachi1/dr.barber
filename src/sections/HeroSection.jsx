import { useRef, useState } from 'react'
import galleryInterior from '../assets/unnamed.jpg'
import galleryDetail from '../assets/unnamed-2.jpg'
import galleryWide from '../assets/2026-04-30.jpg'

const heroCursorImages = [
  {
    src: galleryInterior,
    alt: 'Doktor Barber interior with stone texture and barber chair',
  },
  {
    src: galleryDetail,
    alt: 'Warm wood and gold-lit barber station detail',
  },
  {
    src: galleryWide,
    alt: 'Wide view of the Doktor Barber interior and chairs',
  },
]

export default function HeroSection({ t }) {
  const [heroActive, setHeroActive] = useState(false)
  const [heroFrame, setHeroFrame] = useState(0)
  const heroFrameRef = useRef(0)

  const handleHeroPointerMove = (event) => {
    const hero = event.currentTarget
    const { left, top } = hero.getBoundingClientRect()
    const x = event.clientX - left
    const y = event.clientY - top
    const nextFrame =
      Math.abs(Math.floor((x + y) / 220)) % heroCursorImages.length

    hero.style.setProperty('--cursor-x', `${x}px`)
    hero.style.setProperty('--cursor-y', `${y}px`)

    if (!heroActive) {
      setHeroActive(true)
    }

    if (nextFrame !== heroFrameRef.current) {
      heroFrameRef.current = nextFrame
      setHeroFrame(nextFrame)
    }
  }

  return (
    <section
      id="hero"
      className="hero-section"
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={() => setHeroActive(false)}
    >
      <div
        className={`hero-cursor-gallery ${heroActive ? 'is-visible' : ''}`}
        aria-hidden="true"
      >
        {heroCursorImages.map((item, index) => (
          <div
            className={`hero-frame ${heroFrame === index ? 'is-active' : ''}`}
            key={item.src}
          >
            <img src={item.src} alt="" />
          </div>
        ))}
      </div>
      <h1>
        <span>{t.hero.titleTop}</span>
        <span>{t.hero.titleBottom}</span>
      </h1>
    </section>
  )
}
