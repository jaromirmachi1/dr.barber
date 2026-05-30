import { useEffect, useState } from 'react'
import { subscribeLenisScroll } from './useLenisScroll'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function useGalleryScrollPin({ pinRef, trackRef, innerRef }) {
  const [pinHeight, setPinHeight] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const pin = pinRef.current
    const track = trackRef.current
    const inner = innerRef.current
    if (!pin || !track || !inner) return undefined

    const measure = () => {
      const maxScroll = Math.max(0, inner.scrollWidth - track.clientWidth)
      const height = window.innerHeight + maxScroll
      setPinHeight((current) => (current === height ? current : height))
      return maxScroll
    }

    const update = () => {
      const maxScroll = measure()
      const viewport = window.innerHeight
      const scrollable = pin.offsetHeight - viewport

      if (scrollable <= 0) {
        inner.style.transform = 'translate3d(0, 0, 0)'
        setProgress(0)
        return
      }

      const rect = pin.getBoundingClientRect()
      const nextProgress = clamp(-rect.top / scrollable, 0, 1)

      inner.style.transform = `translate3d(${-nextProgress * maxScroll}px, 0, 0)`
      setProgress((current) =>
        Math.abs(current - nextProgress) < 0.001 ? current : nextProgress,
      )
    }

    const resizeObserver = new ResizeObserver(() => {
      measure()
      update()
    })

    resizeObserver.observe(inner)
    resizeObserver.observe(track)

    const images = inner.querySelectorAll('img')
    images.forEach((image) => {
      if (image.complete) return
      image.addEventListener('load', update, { once: true })
    })

    const unsubScroll = subscribeLenisScroll(update)
    window.addEventListener('resize', update, { passive: true })
    window.addEventListener('scroll', update, { passive: true })

    const onLoad = () => {
      measure()
      update()
    }

    measure()
    update()
    requestAnimationFrame(onLoad)

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      resizeObserver.disconnect()
      unsubScroll()
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
      window.removeEventListener('load', onLoad)
      images.forEach((image) => {
        image.removeEventListener('load', update)
      })
      inner.style.transform = ''
    }
  }, [pinRef, trackRef, innerRef])

  return { pinHeight, progress }
}
