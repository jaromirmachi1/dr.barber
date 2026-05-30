export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://doktorbarber.cz'

export const SITE_NAME = 'Doktor Barber'

export const business = {
  name: SITE_NAME,
  streetAddress: 'Jarmily Kurandové 8',
  postalCode: '612 00',
  addressLocality: 'Brno-Královo Pole',
  addressRegion: 'Jihomoravský kraj',
  addressCountry: 'CZ',
  telephone: '+420 774 034 077',
  phoneHref: '+420774034077',
  email: null,
  instagram: 'https://www.instagram.com/doktorbarber/',
  googleMaps:
    'https://www.google.com/maps/search/?api=1&query=Jarmily%20Kurandov%C3%A9%208%2C%20612%2000%20Brno-Kr%C3%A1lovo%20Pole',
  geo: {
    latitude: 49.2142,
    longitude: 16.5984,
  },
  priceRange: '$$',
}

export const siteSeo = {
  cs: {
    title: 'Doktor Barber | Prémiové holičství Brno',
    description:
      'Doktor Barber — pánský grooming ateliér v Brně-Králově Poli. Precizní střih, péče o vousy, holení a rituální péče v luxusní atmosféře. Rezervujte termín online.',
    keywords:
      'barber Brno, holičství Brno, pánský střih, úprava vousů, holení Brno, Doktor Barber, Královo Pole, grooming',
    ogLocale: 'cs_CZ',
    ogLocaleAlternate: 'en_US',
  },
  en: {
    title: 'Doktor Barber | Premium Barber Atelier Brno',
    description:
      'Doktor Barber — a mens grooming atelier in Brno-Královo Pole. Precision cuts, beard care, hot towel shaves and ritual grooming in a luxury barbershop atmosphere. Book online.',
    keywords:
      'barber Brno, barbershop Brno, mens haircut, beard grooming, shave Brno, Doktor Barber, Královo Pole, grooming',
    ogLocale: 'en_US',
    ogLocaleAlternate: 'cs_CZ',
  },
}

export const sharedSeo = {
  ogImage: `${SITE_URL}/og-image.jpg`,
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Doktor Barber — interiér luxusního holičství v Brně',
  themeColor: '#030303',
  twitterSite: '@doktorbarber',
}
