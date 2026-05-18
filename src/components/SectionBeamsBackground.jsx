import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { sectionBeamsPreset } from './sectionBeamsPreset'

const Beams = lazy(() => import('./Beams/Beams'))

function useBeamsSectionActive() {
  const rootRef = useRef(null)
  const [active, setActive] = useState(false)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    const sync = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const margin = 160
      setActive(rect.bottom > -margin && rect.top < vh + margin)
    }

    sync()

    if (typeof IntersectionObserver === 'undefined') {
      window.addEventListener('scroll', sync, { passive: true })
      window.addEventListener('resize', sync, { passive: true })
      return () => {
        window.removeEventListener('scroll', sync)
        window.removeEventListener('resize', sync)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setActive(entry.isIntersecting)
      },
      { root: null, rootMargin: '160px 0px', threshold: 0 }
    )
    io.observe(el)

    window.addEventListener('resize', sync, { passive: true })
    return () => {
      window.removeEventListener('resize', sync)
      io.disconnect()
    }
  }, [])

  return { rootRef, active }
}

export default function SectionBeamsBackground({ preset = sectionBeamsPreset }) {
  const { rootRef, active } = useBeamsSectionActive()

  return (
    <div ref={rootRef} className="section-beams-root">
      <Suspense fallback={null}>
        <Beams {...preset} active={active} />
      </Suspense>
    </div>
  )
}
