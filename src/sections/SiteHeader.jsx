import logo from '../assets/curves-logo.png'

export default function SiteHeader({
  t,
  locale,
  setLocale,
  menuOpen,
  setMenuOpen,
}) {
  return (
    <header className="site-header">
      <a href="#hero" className="brand-logo" aria-label="Doktor Barber home">
        <img src={logo} alt="Doktor Barber logo" />
      </a>
      <div className="menu-wrap">
        <button
          type="button"
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="menu-panel"
          aria-label="Open navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="menu-panel"
          className={`menu-panel ${menuOpen ? 'is-open' : ''}`}
        >
          <a href="#about" onClick={() => setMenuOpen(false)}>
            {t.nav.about}
          </a>
          <a href="#services" onClick={() => setMenuOpen(false)}>
            {t.nav.services}
          </a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>
            {t.nav.testimonials}
          </a>
          <a href="#booking" onClick={() => setMenuOpen(false)}>
            {t.nav.booking}
          </a>
          <div className="language-switch">
            <span>{t.languageLabel}</span>
            <button
              type="button"
              onClick={() => setLocale('cs')}
              className={locale === 'cs' ? 'active' : ''}
            >
              CZ
            </button>
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={locale === 'en' ? 'active' : ''}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
