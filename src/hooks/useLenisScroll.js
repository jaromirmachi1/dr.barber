const scrollListeners = new Set()

export function subscribeLenisScroll(listener) {
  scrollListeners.add(listener)
  return () => scrollListeners.delete(listener)
}

export function notifyLenisScroll(scroll) {
  scrollListeners.forEach((listener) => listener(scroll))
}
