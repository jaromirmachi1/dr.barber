import { forwardRef } from "react";
import logo from "../assets/curves-logo.png";

const menuLinks = [
  { href: "#services", key: "services" },
  { href: "#testimonials", key: "testimonials" },
  { href: "#location", key: "location" },
];

const menuActions = [
  { href: "#booking", key: "reservation", isPrimary: true },
  {
    href: "https://www.instagram.com/doktorbarber/",
    key: "instagram",
    external: true,
  },
  {
    href: "https://www.google.com/search?q=Doktor+Barber+Brno+reviews",
    key: "rate",
    external: true,
  },
];

const SiteHeader = forwardRef(function SiteHeader(
  {
    t,
    locale,
    setLocale,
    menuOpen,
    setMenuOpen,
    headerOnDark,
    logoVisible = true,
  },
  headerLogoRef,
) {
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`site-header ${headerOnDark ? "site-header--on-dark" : ""} ${
        menuOpen ? "site-header--menu-open" : ""
      }`}
    >
      <a
        ref={headerLogoRef}
        href="#hero"
        className={`brand-logo ${logoVisible ? "" : "brand-logo--hidden"}`}
        aria-label="Doktor Barber home"
        onClick={closeMenu}
      >
        <img src={logo} alt="Doktor Barber logo" />
      </a>
      <div className="menu-wrap">
        <button
          type="button"
          className={`hamburger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="menu-panel"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <span />
          <span />
          <span />
        </button>
        <button
          type="button"
          className={`menu-backdrop ${menuOpen ? "is-open" : ""}`}
          onClick={closeMenu}
          aria-label="Close navigation menu"
          aria-hidden={!menuOpen}
          disabled={!menuOpen}
          tabIndex={menuOpen ? 0 : -1}
        />
        <div
          id="menu-panel"
          className={`menu-panel ${menuOpen ? "is-open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className="menu-panel__inner">
            <div className="menu-panel__head">
              <span className="menu-panel__eyebrow">{t.menu.kicker}</span>
              <p className="menu-panel__title">{t.menu.title}</p>
            </div>

            <nav className="menu-nav" aria-label="Primary navigation">
              {menuLinks.map((link, index) => (
                <a
                  href={link.href}
                  key={link.key}
                  onClick={closeMenu}
                  style={{ "--i": index }}
                >
                  <span className="menu-nav__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="menu-nav__label">{t.nav[link.key]}</span>
                  <span className="menu-nav__arrow" aria-hidden="true">
                    &#8599;
                  </span>
                </a>
              ))}
            </nav>

            <aside
              className="menu-aside"
              aria-label="Contact and quick actions"
            >
              <ul className="menu-contact">
                {menuActions.map((action) => (
                  <li key={action.key}>
                    <a
                      href={action.href}
                      className={
                        action.isPrimary
                          ? "menu-contact__link menu-contact__link--primary"
                          : "menu-contact__link"
                      }
                      onClick={!action.external ? closeMenu : undefined}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noreferrer" : undefined}
                    >
                      <span className="menu-contact__label">
                        {t.menu.actions[action.key]}
                      </span>
                      <small className="menu-contact__detail">
                        {t.menu.actionDetails[action.key]}
                      </small>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="menu-aside__meta">
                <span className="menu-location">{t.menu.locationLabel}</span>
                <div className="language-switch">
                  <span>{t.languageLabel}</span>
                  <button
                    type="button"
                    onClick={() => setLocale("cs")}
                    className={locale === "cs" ? "active" : ""}
                  >
                    CZ
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocale("en")}
                    className={locale === "en" ? "active" : ""}
                  >
                    EN
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </header>
  );
});

export default SiteHeader;
