import logo from '../assets/curves-logo.png'
import UiTherapyCredit from '../components/UiTherapyCredit'

export default function SiteFooter({ t }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <img src={logo} alt="Doktor Barber logo" className="site-footer__brand" />
        <UiTherapyCredit className="uityherapy-credit--footer" tone="white" />
        <nav aria-label="Footer links">
          {t.footer.links.map((link) => (
            <a
              href={link.href}
              key={link.label}
              {...(link.external
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
