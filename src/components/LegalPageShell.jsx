import logo from "../assets/curves-logo.png";
import SiteFooter from "../sections/SiteFooter";

export default function LegalPageShell({ t, locale, setLocale, children }) {
  return (
    <div className="page page--legal">
      <header className="legal-header">
        <a href="/" className="legal-header__logo" aria-label="Doktor Barber home">
          <img src={logo} alt="Doktor Barber logo" />
        </a>
        <div className="legal-header__locale" role="group" aria-label={t.languageLabel}>
          <button
            type="button"
            className={locale === "cs" ? "is-active" : ""}
            onClick={() => setLocale("cs")}
            aria-pressed={locale === "cs"}
          >
            CS
          </button>
          <button
            type="button"
            className={locale === "en" ? "is-active" : ""}
            onClick={() => setLocale("en")}
            aria-pressed={locale === "en"}
          >
            EN
          </button>
        </div>
      </header>

      <main className="legal-main">{children}</main>

      <div className="legal-footer-wrap">
        <SiteFooter t={t} />
      </div>
    </div>
  );
}
