import { useEffect, useState } from 'react'
import { subscribeLenisScroll } from './useLenisScroll'

const SCROLL_DISTANCE = () => Math.min(window.innerHeight * 0.58, 720)

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3
}

function lerp(start, end, amount) {
  return start + (end - start) * amount
}

function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0
}

export function useHeroLogoFlyout({ heroAnchorRef, headerAnchorRef, menuOpen }) {
  const [metrics, setMetrics] = useState(null)
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reducedMotion) return undefined

    const measure = (scrollY = getScrollY()) => {
      const heroNode = heroAnchorRef.current
      const headerNode = headerAnchorRef.current

      if (!heroNode || !headerNode) return

      const heroRect = heroNode.getBoundingClientRect()
      const headerRect = headerNode.getBoundingClientRect()
      const rawProgress = Math.min(1, Math.max(0, scrollY / SCROLL_DISTANCE()))
      const progress = easeOutCubic(rawProgress)
      const showHeaderLogo = menuOpen || progress >= 0.995

      setMetrics({
        left: lerp(heroRect.left, headerRect.left, progress),
        top: lerp(heroRect.top, headerRect.top, progress),
        width: lerp(heroRect.width, headerRect.width, progress),
        progress,
        showHeaderLogo,
        showFlyout: !menuOpen && progress < 0.995,
      })
    }

    const handleScroll = (scrollY) => {
      measure(typeof scrollY === 'number' ? scrollY : getScrollY())
    }

    const handleResize = () => handleScroll()

    const unsubLenis = subscribeLenisScroll(handleScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    const frame = requestAnimationFrame(() => handleScroll())

    return () => {
      unsubLenis()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frame)
    }
  }, [heroAnchorRef, headerAnchorRef, menuOpen, reducedMotion])

  return {
    metrics,
    reducedMotion,
  }
}
