import logo from '../assets/curves-logo.png'

export default function BrandLogoFlyout({ metrics, headerOnDark, reducedMotion }) {
  if (reducedMotion || !metrics?.showFlyout) {
    return null
  }

  const onDark = headerOnDark && metrics.progress > 0.55

  return (
    <a
      href="#hero"
      className={`brand-logo-flyout ${onDark ? 'brand-logo-flyout--on-dark' : ''}`}
      aria-label="Doktor Barber home"
      style={{
        left: `${metrics.left}px`,
        top: `${metrics.top}px`,
        width: `${metrics.width}px`,
      }}
    >
      <img src={logo} alt="" />
    </a>
  )
}
