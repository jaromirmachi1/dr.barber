export default function ServicesSection({ t }) {
  return (
    <section id="services" className="services-section">
      <h2>{t.services.title}</h2>
      <div className="service-grid">
        {t.services.list.map((service) => (
          <article key={service.name} className="service-card">
            <div className="service-icon" aria-hidden="true" />
            <h3>{service.name}</h3>
            <p>{service.price}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
