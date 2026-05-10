import { useEffect, useState } from 'react'
import './App.css'
import { siteContent } from './content/siteContent'
import SiteHeader from './sections/SiteHeader'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import TestimonialsSection from './sections/TestimonialsSection'
import BookingSection from './sections/BookingSection'
import SiteFooter from './sections/SiteFooter'

function App() {
  const [locale, setLocale] = useState('cs')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = siteContent[locale]

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <div className="page">
      <SiteHeader
        t={t}
        locale={locale}
        setLocale={setLocale}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main>
        <HeroSection t={t} />
        <MarqueeSection t={t} />
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <TestimonialsSection t={t} />
        <BookingSection t={t} />
      </main>

      <SiteFooter t={t} />

      <a href="#booking" className="book-floating">
        BOOK US
      </a>
    </div>
  )
}

export default App
