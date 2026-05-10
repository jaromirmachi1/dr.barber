import { useEffect, useState } from 'react'

/** Viewport Y (px from top) — band where the fixed header sits over content */
const PROBE_Y = 52

function surfaceBehindHeader() {
  const probe = PROBE_Y
  const sections = [
    document.getElementById('hero'),
    document.querySelector('.marquee-strip'),
    ...document.querySelectorAll('main > section:not(#hero):not(.marquee-strip)'),
    document.querySelector('.site-footer'),
  ].filter(Boolean)

  for (const section of sections) {
    const rect = section.getBoundingClientRect()
    if (rect.top < probe && rect.bottom > probe) {
      if (section.classList.contains('marquee-strip')) return 'dark'
      if (
        section.classList.contains('booking-cta') &&
        section.classList.contains('booking-marble')
      ) {
        return 'dark'
      }
      if (section.classList.contains('site-footer')) return 'dark'
      return 'light'
    }
  }

  return 'light'
}

export function useHeaderSurfaceTheme() {
  const [onDark, setOnDark] = useState(false)

  useEffect(() => {
    const update = () => {
      setOnDark(surfaceBehindHeader() === 'dark')
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return onDark
}
