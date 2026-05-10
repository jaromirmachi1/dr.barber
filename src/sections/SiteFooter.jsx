import logo from '../assets/curves-logo.png'

export default function SiteFooter({ t }) {
  return (
    <footer className="site-footer">
      <img src={logo} alt="Doktor Barber logo" />
      <p>{t.footer.address}</p>
      <nav aria-label="Social links">
        {t.footer.socials.map((social) => (
          <a href="#" key={social}>
            {social}
          </a>
        ))}
      </nav>
    </footer>
  )
}
