export default function ServicesSection({ t }) {
  return (
    <section
      id="services"
      className="services-section"
      aria-labelledby="services-title"
    >
      <div className="services-heading">
        <span>{t.services.kicker}</span>
        <h2 id="services-title">{t.services.title}</h2>
      </div>

      <div className="service-list">
        {t.services.list.map((service) => (
          <article key={service.name} className="service-row">
            <div className="service-copy">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
            <span className="service-rule" aria-hidden="true" />
            <p className="service-price">{service.price}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
