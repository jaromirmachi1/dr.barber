import { useEffect, useRef } from 'react'
import { createScrollFrameListener } from '../utils/scrollFrame'
import { isMobileViewport } from '../utils/viewport'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/** Primary card: no motion. Left/right cards move upward as the user scrolls down. */
const DESKTOP_SIDE_TRAVEL = 360
const MOBILE_LEFT_TRAVEL = 120
const MOBILE_RIGHT_TRAVEL = 260

function getGalleryProgress(gallery) {
  const rect = gallery.getBoundingClientRect()
  const scrollable = rect.height + window.innerHeight
  if (scrollable <= 0) return 0

  return clamp((window.innerHeight - rect.top) / scrollable, 0, 1)
}

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
    let visible = false

    const getOffsets = (progress) => {
      if (mobileQuery.matches) {
        return {
          left: progress * MOBILE_LEFT_TRAVEL,
          right: progress * MOBILE_RIGHT_TRAVEL,
        }
      }

      const offset = progress * DESKTOP_SIDE_TRAVEL
      return { left: offset, right: offset }
    }

    const applyTransforms = () => {
      const progress = getGalleryProgress(gallery)
      const { left: leftOffset, right: rightOffset } = getOffsets(progress)

      left.style.transform = `translate3d(0, ${-leftOffset}px, 0)`
      right.style.transform = `translate3d(0, ${-rightOffset}px, 0)`
    }

    const onScroll = createScrollFrameListener(() => {
      if (!visible) return
      applyTransforms()
    })

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) applyTransforms()
      },
      { rootMargin: '20% 0px' },
    )

    intersectionObserver.observe(gallery)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', applyTransforms, { passive: true })

    applyTransforms()

    return () => {
      intersectionObserver.disconnect()
      onScroll.cancel?.()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', applyTransforms)
      left.style.removeProperty('transform')
      right.style.removeProperty('transform')
    }
  }, [])

  return galleryRef
}
