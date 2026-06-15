import { useEffect, useState } from 'react'
import { subscribeLenisScroll } from './useLenisScroll'
import { isMobileViewport } from '../utils/viewport'
import { createScrollFrameListener } from '../utils/scrollFrame'

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

function metricsChanged(current, next, threshold = 0.75) {
  if (!current) return true

  return (
    Math.abs(current.left - next.left) >= threshold ||
    Math.abs(current.top - next.top) >= threshold ||
    Math.abs(current.width - next.width) >= threshold ||
    current.showHeaderLogo !== next.showHeaderLogo ||
    current.showFlyout !== next.showFlyout
  )
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

      const next = {
        left: lerp(heroRect.left, headerRect.left, progress),
        top: lerp(heroRect.top, headerRect.top, progress),
        width: lerp(heroRect.width, headerRect.width, progress),
        progress,
        showHeaderLogo,
        showFlyout: !menuOpen && progress < 0.995,
      }

      setMetrics((current) =>
        metricsChanged(current, next) ? next : current,
      )
    }

    const handleScroll = (scrollY) => {
      measure(typeof scrollY === 'number' ? scrollY : getScrollY())
    }

    const handleResize = () => handleScroll()

    const onScroll = isMobileViewport()
      ? createScrollFrameListener(handleScroll)
      : handleScroll

    const unsubLenis = subscribeLenisScroll(handleScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    const frame = requestAnimationFrame(() => handleScroll())

    return () => {
      unsubLenis()
      onScroll.cancel?.()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frame)
    }
  }, [heroAnchorRef, headerAnchorRef, menuOpen, reducedMotion])

  return {
    metrics,
    reducedMotion,
  }
}
