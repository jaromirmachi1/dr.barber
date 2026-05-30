import { useEffect } from 'react'
import { buildBarbershopSchema, buildWebSiteSchema } from '../seo/schema'
import { SITE_URL, sharedSeo, siteSeo } from '../seo/siteSeo'

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

function setJsonLd(id, data) {
  let script = document.getElementById(id)

  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(data)
}

export function usePageSeo(locale) {
  useEffect(() => {
    const seo = siteSeo[locale] ?? siteSeo.cs
    const language = locale === 'cs' ? 'cs' : 'en'

    document.documentElement.lang = language

    document.title = seo.title

    setMeta('description', seo.description)
    setMeta('keywords', seo.keywords)
    setMeta('author', 'Doktor Barber')
    setMeta('robots', 'index, follow, max-image-preview:large')
    setMeta('googlebot', 'index, follow')
    setMeta('theme-color', sharedSeo.themeColor)

    setLink('canonical', SITE_URL)

    setMeta('og:title', seo.title, { property: true })
    setMeta('og:description', seo.description, { property: true })
    setMeta('og:type', 'website', { property: true })
    setMeta('og:url', SITE_URL, { property: true })
    setMeta('og:site_name', 'Doktor Barber', { property: true })
    setMeta('og:locale', seo.ogLocale, { property: true })
    setMeta('og:locale:alternate', seo.ogLocaleAlternate, { property: true })
    setMeta('og:image', sharedSeo.ogImage, { property: true })
    setMeta('og:image:width', sharedSeo.ogImageWidth, { property: true })
    setMeta('og:image:height', sharedSeo.ogImageHeight, { property: true })
    setMeta('og:image:alt', sharedSeo.ogImageAlt, { property: true })

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', seo.title)
    setMeta('twitter:description', seo.description)
    setMeta('twitter:image', sharedSeo.ogImage)

    if (sharedSeo.twitterSite) {
      setMeta('twitter:site', sharedSeo.twitterSite)
    }

    setJsonLd('schema-barbershop', buildBarbershopSchema(locale))
    setJsonLd('schema-website', buildWebSiteSchema(locale))
  }, [locale])
}
