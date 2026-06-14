import { useEffect, useRef } from 'react'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/** Primary card: no motion. Left/right cards move upward as the user scrolls down. */
const SIDE_TRAVEL = 360

export function useGalleryParallax() {
  const galleryRef = useRef(null)

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const left = gallery.querySelector('.marquee-gallery-card.is-left')
    const right = gallery.querySelector('.marquee-gallery-card.is-right')
    if (!left || !right) return

    const mobileQuery = window.matchMedia('(max-width: 900px)')
    const sideTravel = () => (mobileQuery.matches ? 180 : SIDE_TRAVEL)

    let rafId = 0
    let scheduled = false
    let startY = 0
    let endY = 1

    const measure = () => {
      const rect = gallery.getBoundingClientRect()
      const vh = window.innerHeight
      const scrollY = window.scrollY
      const galleryTop = scrollY + rect.top

      startY = galleryTop - vh
      endY = galleryTop + rect.height
    }

    const update = () => {
      scheduled = false
      const progress = clamp(
        (window.scrollY - startY) / Math.max(endY - startY, 1),
        0,
        1,
      )

      const sideOffset = progress * sideTravel()

      left.style.transform = `translate3d(0, ${-sideOffset}px, 0)`
      right.style.transform = `translate3d(0, ${-sideOffset}px, 0)`
    }

    const requestUpdate = () => {
      if (scheduled) return
      scheduled = true
      rafId = requestAnimationFrame(update)
    }

    const handleResize = () => {
      measure()
      requestUpdate()
    }

    measure()
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
      left.style.removeProperty('transform')
      right.style.removeProperty('transform')
    }
  }, [])

  return galleryRef
}
