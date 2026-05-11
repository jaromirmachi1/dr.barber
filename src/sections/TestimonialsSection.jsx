import { useMemo, useState } from 'react'

const TESTIMONIALS_PER_PAGE = 3

export default function TestimonialsSection({ t }) {
  const [activePage, setActivePage] = useState(0)
  const testimonialPages = useMemo(() => {
    const pages = []

    for (let i = 0; i < t.testimonials.list.length; i += TESTIMONIALS_PER_PAGE) {
      pages.push(t.testimonials.list.slice(i, i + TESTIMONIALS_PER_PAGE))
    }

    return pages
  }, [t.testimonials.list])
  const visibleTestimonials = testimonialPages[activePage] ?? testimonialPages[0] ?? []

  return (
    <section
      id="testimonials"
      className="testimonials-section"
      aria-labelledby="testimonials-title"
    >
      <div className="testimonials-heading">
        <span>{t.testimonials.kicker}</span>
        <h2 id="testimonials-title">{t.testimonials.title}</h2>
      </div>

      <div className="testimonial-panel" aria-live="polite">
        {visibleTestimonials.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <blockquote>
              <p>“{item.quote}”</p>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.detail}</span>
              </footer>
            </blockquote>
          </article>
        ))}
      </div>

      <div className="testimonial-footer">
        <div className="testimonial-meta" aria-label={t.testimonials.metaLabel}>
          {t.testimonials.meta.map((item) => (
            <p key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </p>
          ))}
        </div>

        {testimonialPages.length > 1 && (
          <div
            className="testimonial-pagination"
            aria-label={t.testimonials.paginationLabel}
          >
            {testimonialPages.map((_, index) => (
              <button
                type="button"
                key={index}
                className={index === activePage ? 'is-active' : ''}
                onClick={() => setActivePage(index)}
                aria-current={index === activePage ? 'page' : undefined}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
