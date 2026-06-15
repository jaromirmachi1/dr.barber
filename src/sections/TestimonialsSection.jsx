import { useEffect, useMemo, useState } from 'react'
import { isMobileViewport } from '../utils/viewport'

const DESKTOP_TESTIMONIALS_PER_PAGE = 3
const MOBILE_TESTIMONIALS_PER_PAGE = 2

function useTestimonialsPerPage() {
  const [perPage, setPerPage] = useState(() =>
    isMobileViewport()
      ? MOBILE_TESTIMONIALS_PER_PAGE
      : DESKTOP_TESTIMONIALS_PER_PAGE,
  )

  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)')
    const sync = () => {
      setPerPage(
        query.matches
          ? MOBILE_TESTIMONIALS_PER_PAGE
          : DESKTOP_TESTIMONIALS_PER_PAGE,
      )
    }

    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return perPage
}

function buildPages(list, perPage) {
  const pages = []

  for (let i = 0; i < list.length; i += perPage) {
    pages.push(list.slice(i, i + perPage))
  }

  return pages
}

export default function TestimonialsSection({ t }) {
  const testimonialsPerPage = useTestimonialsPerPage()
  const [activePage, setActivePage] = useState(0)
  const testimonialPages = useMemo(
    () => buildPages(t.testimonials.list, testimonialsPerPage),
    [t.testimonials.list, testimonialsPerPage],
  )
  const visibleTestimonials =
    testimonialPages[activePage] ?? testimonialPages[0] ?? []

  useEffect(() => {
    setActivePage((page) => Math.min(page, Math.max(testimonialPages.length - 1, 0)))
  }, [testimonialPages.length])

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
