const galleryModules = import.meta.glob('../assets/gallery/*.webp', {
  eager: true,
  import: 'default',
})

export const galleryImageSources = Object.keys(galleryModules)
  .sort((a, b) => a.localeCompare(b))
  .map((path) => galleryModules[path])
