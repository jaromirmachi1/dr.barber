import { useEffect, useRef } from 'react'

export function useMarqueePhysics(options = {}) {
  const { reverse = false } = options
  const stripRef = useRef(null)

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tracks = [...strip.querySelectorAll('.marquee-track')]
    const positions = new Array(tracks.length).fill(0)
    const baseSpeed = 0.28
    const scrollBoostGain = 2.2
    let currentBoost = 0
    let targetBoost = 0
    let lastY = window.scrollY
    let lastTime = performance.now()
    let rafId = 0

    const animate = (time) => {
      const delta = Math.min(32, time - lastTime) / 1000
      lastTime = time
      currentBoost += (targetBoost - currentBoost) * 0.06
      targetBoost *= 0.9

      tracks.forEach((track, index) => {
        const direction =
          tracks.length >= 2 ? (index === 0 ? -1 : 1) : reverse ? 1 : -1
        const speed = baseSpeed + currentBoost * scrollBoostGain
        const loopPx = track.scrollWidth / 2
        if (!loopPx) return

        positions[index] += (speed * delta * loopPx) / 50
        positions[index] =
          ((positions[index] % loopPx) + loopPx) % loopPx

        const x =
          direction > 0 ? positions[index] - loopPx : -positions[index]
        track.style.transform = `translate3d(${x}px, 0, 0)`
      })

      rafId = requestAnimationFrame(animate)
    }

    const onScroll = () => {
      const y = window.scrollY
      const dy = Math.abs(y - lastY)
      lastY = y
      targetBoost = Math.min(1, targetBoost + Math.min(80, dy) * 0.006)
    }

    const kickoff = () => {
      rafId = requestAnimationFrame(animate)
    }
    requestAnimationFrame(() => requestAnimationFrame(kickoff))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [reverse])

  return stripRef
}
