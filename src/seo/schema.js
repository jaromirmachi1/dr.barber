import { SITE_URL, business, siteSeo } from './siteSeo'

export function buildBarbershopSchema(locale = 'cs') {
  const seo = siteSeo[locale] ?? siteSeo.cs

  return {
    '@context': 'https://schema.org',
    '@type': 'Barbershop',
    '@id': `${SITE_URL}/#barbershop`,
    name: business.name,
    description: seo.description,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: business.telephone,
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      postalCode: business.postalCode,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      addressCountry: business.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    sameAs: [business.instagram, business.googleMaps].filter(Boolean),
    areaServed: {
      '@type': 'City',
      name: 'Brno',
    },
    hasMap: business.googleMaps,
  }
}

export function buildWebSiteSchema(locale = 'cs') {
  const seo = siteSeo[locale] ?? siteSeo.cs

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: business.name,
    description: seo.description,
    url: SITE_URL,
    inLanguage: locale === 'cs' ? 'cs-CZ' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: business.name,
      url: SITE_URL,
    },
  }
}
