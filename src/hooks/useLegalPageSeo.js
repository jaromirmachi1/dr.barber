import { useEffect } from 'react'
import { SITE_URL, sharedSeo } from '../seo/siteSeo'

function setMeta(name, content, { property = false } = {}) {
  if (!content) return

  const attr = property ? 'property' : 'name'
  let element = document.head.querySelector(`meta[${attr}="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setLink(rel, href, extra = {}) {
  if (!href) return

  const selector = Object.entries(extra).reduce(
    (query, [key, value]) => `${query}[${key}="${value}"]`,
    `link[rel="${rel}"]`,
  )

  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    Object.entries(extra).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

export function useLegalPageSeo({ locale, title, description, path }) {
  useEffect(() => {
    const language = locale === 'cs' ? 'cs' : 'en'
    const url = `${SITE_URL}${path}`

    document.documentElement.lang = language
    document.title = title

    setMeta('description', description)
    setMeta('robots', 'index, follow')
    setLink('canonical', url)

    setMeta('og:title', title, { property: true })
    setMeta('og:description', description, { property: true })
    setMeta('og:type', 'website', { property: true })
    setMeta('og:url', url, { property: true })
    setMeta('og:image', sharedSeo.ogImage, { property: true })

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', sharedSeo.ogImage)
  }, [locale, title, description, path])
}
