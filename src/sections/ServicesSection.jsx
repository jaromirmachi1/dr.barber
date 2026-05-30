import { Fragment } from 'react'
import SectionBeamsBackground from '../components/SectionBeamsBackground'
import { servicesBeamsPreset } from '../components/sectionBeamsPreset'

export default function ServicesSection({ t }) {
  return (
    <section
      id="services"
      className="services-section"
      aria-labelledby="services-title"
    >
      <div className="services-section__background section-beams-background" aria-hidden="true">
        <SectionBeamsBackground preset={servicesBeamsPreset} />
      </div>
      <div className="services-heading">
        <h2 id="services-title">{t.services.title}</h2>
      </div>

      <div className="service-list">
        {t.services.list.map((service, index) => {
          const previousGroup =
            index > 0 ? t.services.list[index - 1].group : null
          const showGroup =
            service.group && service.group !== previousGroup

          return (
            <Fragment key={`${service.group}-${service.name}`}>
              {showGroup ? (
                <div className="service-group">
                  <span>{service.group}</span>
                </div>
              ) : null}
              <article className="service-row">
                <div className="service-copy">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="service-rule" aria-hidden="true" />
                <p className="service-price">{service.price}</p>
              </article>
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}
