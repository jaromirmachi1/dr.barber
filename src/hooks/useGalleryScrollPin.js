import { useEffect, useState } from 'react'
import { subscribeLenisScroll } from './useLenisScroll'
import { isMobileViewport } from '../utils/viewport'
import { createScrollFrameListener } from '../utils/scrollFrame'

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

    const mobile = isMobileViewport()
    const progressBar = pin.querySelector('.gallery-pin__progress span')
    let maxScroll = 0

    const measure = () => {
      maxScroll = Math.max(0, inner.scrollWidth - track.clientWidth)
      const height = window.innerHeight + maxScroll
      setPinHeight((current) => (current === height ? current : height))
      return maxScroll
    }

    const update = () => {
      const viewport = window.innerHeight
      const scrollable = pin.offsetHeight - viewport

      if (scrollable <= 0) {
        inner.style.transform = 'translate3d(0, 0, 0)'
        if (mobile && progressBar) {
          progressBar.style.transform = 'scaleX(0)'
        } else {
          setProgress(0)
        }
        return
      }

      const rect = pin.getBoundingClientRect()
      const nextProgress = clamp(-rect.top / scrollable, 0, 1)

      inner.style.transform = `translate3d(${-nextProgress * maxScroll}px, 0, 0)`

      if (mobile && progressBar) {
        progressBar.style.transform = `scaleX(${nextProgress})`
        return
      }

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

    const runUpdate = () => {
      update()
    }

    const images = inner.querySelectorAll('img')
    const handleImageLoad = () => {
      measure()
      runUpdate()
    }

    images.forEach((image) => {
      if (image.complete) return
      image.addEventListener('load', handleImageLoad, { once: true })
    })

    const unsubScroll = subscribeLenisScroll(runUpdate)
    const onScroll = mobile ? createScrollFrameListener(runUpdate) : runUpdate

    const handleResize = () => {
      measure()
      runUpdate()
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const onLoad = () => {
      measure()
      runUpdate()
    }

    measure()
    runUpdate()
    requestAnimationFrame(onLoad)

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      resizeObserver.disconnect()
      unsubScroll()
      onScroll.cancel?.()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('load', onLoad)
      images.forEach((image) => {
        image.removeEventListener('load', handleImageLoad)
      })
      inner.style.transform = ''
      if (progressBar) progressBar.style.transform = ''
    }
  }, [pinRef, trackRef, innerRef])

  return { pinHeight, progress }
}
