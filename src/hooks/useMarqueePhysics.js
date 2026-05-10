import { useEffect, useRef } from 'react'

export function useMarqueePhysics() {
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
        const direction = index === 0 ? -1 : 1
        const speed = baseSpeed + currentBoost * scrollBoostGain
        positions[index] = (positions[index] + speed * delta) % 50
        track.style.transform = `translate3d(${direction * positions[index]}%, 0, 0)`
      })

      rafId = requestAnimationFrame(animate)
    }

    const onScroll = () => {
      const y = window.scrollY
      const dy = Math.abs(y - lastY)
      lastY = y
      targetBoost = Math.min(1, targetBoost + Math.min(80, dy) * 0.006)
    }

    rafId = requestAnimationFrame(animate)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return stripRef
}
