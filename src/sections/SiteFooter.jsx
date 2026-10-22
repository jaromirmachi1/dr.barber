import logo from '../assets/curves-logo.png'
import UiTherapyCredit from '../components/UiTherapyCredit'

export default function SiteFooter({ t }) {
  const { footer } = t

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <img src={logo} alt="Doktor Barber logo" className="site-footer__brand" />
        <UiTherapyCredit className="uityherapy-credit--footer" tone="white" />
        <nav aria-label="Footer links">
          {footer.links.map((link) => (
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
      <p className="site-footer__operator">
        <span>{footer.operatorLabel}</span>
        <a href={footer.operatorHref}>
          {footer.operatorName}
          <span aria-hidden="true"> · </span>
          {footer.operatorIco}
        </a>
      </p>
    </footer>
  )
}
