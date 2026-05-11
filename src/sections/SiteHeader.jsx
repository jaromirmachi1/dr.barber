import logo from '../assets/curves-logo.png'

const menuLinks = [
  { href: '#about', key: 'about' },
  { href: '#services', key: 'services' },
  { href: '#testimonials', key: 'testimonials' },
  { href: '#booking', key: 'booking' },
]

const menuActions = [
  { href: '#booking', key: 'reservation', isPrimary: true },
  {
    href: 'https://www.instagram.com/doktorbarber/',
    key: 'instagram',
    external: true,
  },
  {
    href: 'https://www.google.com/search?q=Doktor+Barber+Brno+reviews',
    key: 'rate',
    external: true,
  },
]

export default function SiteHeader({
  t,
  locale,
  setLocale,
  menuOpen,
  setMenuOpen,
  headerOnDark,
}) {
  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`site-header ${headerOnDark ? 'site-header--on-dark' : ''} ${
        menuOpen ? 'site-header--menu-open' : ''
      }`}
    >
      <a
        href="#hero"
        className="brand-logo"
        aria-label="Doktor Barber home"
        onClick={closeMenu}
      >
        <img src={logo} alt="Doktor Barber logo" />
      </a>
      <div className="menu-wrap">
        <button
          type="button"
          className={`hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="menu-panel"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span />
          <span />
          <span />
        </button>
        <button
          type="button"
          className={`menu-backdrop ${menuOpen ? 'is-open' : ''}`}
          onClick={closeMenu}
          aria-label="Close navigation menu"
          aria-hidden={!menuOpen}
          disabled={!menuOpen}
          tabIndex={menuOpen ? 0 : -1}
        />
        <div
          id="menu-panel"
          className={`menu-panel ${menuOpen ? 'is-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <div className="menu-panel__inner">
            <div className="menu-panel__intro">
              <span>{t.menu.kicker}</span>
              <p>{t.menu.title}</p>
            </div>

            <nav className="menu-nav" aria-label="Primary navigation">
              {menuLinks.map((link, index) => (
                <a href={link.href} key={link.key} onClick={closeMenu}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {t.nav[link.key]}
                </a>
              ))}
            </nav>

            <div className="menu-actions" aria-label="Quick actions">
              {menuActions.map((action) => (
                <a
                  href={action.href}
                  key={action.key}
                  className={action.isPrimary ? 'menu-action menu-action--primary' : 'menu-action'}
                  onClick={!action.external ? closeMenu : undefined}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noreferrer' : undefined}
                >
                  <span>{t.menu.actions[action.key]}</span>
                  <small>{t.menu.actionDetails[action.key]}</small>
                </a>
              ))}
            </div>

            <div className="menu-panel__footer">
              <span>{t.menu.locationLabel}</span>
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
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
