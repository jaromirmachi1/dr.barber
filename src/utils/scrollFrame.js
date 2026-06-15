export function createScrollFrameListener(callback) {
  let rafId = 0

  const onScroll = () => {
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      rafId = 0
      callback()
    })
  }

  onScroll.cancel = () => {
    cancelAnimationFrame(rafId)
    rafId = 0
  }

  return onScroll
}
