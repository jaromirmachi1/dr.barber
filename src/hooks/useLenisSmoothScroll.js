import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { notifyLenisScroll } from './useLenisScroll'

export function useLenisSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      smoothWheel: true,
      lerp: 0.085,
      wheelMultiplier: 0.88,
      touchMultiplier: 1,
    })

    const onScroll = (instance) => {
      notifyLenisScroll(instance.scroll)
    }

    lenis.on('scroll', onScroll)
    notifyLenisScroll(lenis.scroll)

    return () => {
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [])
}
