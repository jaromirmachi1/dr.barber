import logo from '../assets/curves-logo.png'
import UiTherapyCredit from '../components/UiTherapyCredit'

export default function SiteFooter({ t }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <img src={logo} alt="Doktor Barber logo" className="site-footer__brand" />
        <UiTherapyCredit className="uityherapy-credit--footer" tone="white" />
        <nav aria-label="Social links">
          {t.footer.socials.map((social) => (
            <a href="#" key={social}>
              {social}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
