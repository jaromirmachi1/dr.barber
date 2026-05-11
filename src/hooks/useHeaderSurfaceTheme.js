import { useEffect, useState } from 'react'

/** Viewport Y (px from top) — band where the fixed header sits over content */
const HEADER_PROBE_Y = 52
/** Distance from viewport bottom to sample behind the floating BOOK US control */
const BOOK_FLOATING_PROBE_FROM_BOTTOM = 52

function getSurfaceThemeAt(probeY) {
  const sections = [
    document.getElementById('hero'),
    document.querySelector('.marquee-strip'),
    ...document.querySelectorAll('main > section:not(#hero):not(.marquee-strip)'),
    document.querySelector('.site-footer'),
  ].filter(Boolean)

  for (const section of sections) {
    const rect = section.getBoundingClientRect()
    if (rect.top < probeY && rect.bottom > probeY) {
      if (section.classList.contains('marquee-strip')) return 'dark'
      if (section.classList.contains('services-section')) return 'dark'
      if (section.classList.contains('booking-cta')) return 'dark'
      if (section.classList.contains('site-footer')) return 'dark'
      return 'light'
    }
  }

  return 'light'
}

function useSurfaceTheme(probeY) {
  const [onDark, setOnDark] = useState(false)

  useEffect(() => {
    const update = () => {
      setOnDark(getSurfaceThemeAt(probeY()) === 'dark')
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [probeY])

  return onDark
}

const headerProbeY = () => HEADER_PROBE_Y
const bookFloatingProbeY = () =>
  window.innerHeight - BOOK_FLOATING_PROBE_FROM_BOTTOM

export function useHeaderSurfaceTheme() {
  return useSurfaceTheme(headerProbeY)
}

export function useBookFloatingSurfaceTheme() {
  return useSurfaceTheme(bookFloatingProbeY)
}
