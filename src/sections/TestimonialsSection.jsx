export default function TestimonialsSection({ t }) {
  return (
    <section id="testimonials" className="testimonials-section">
      <h2>{t.testimonials.title}</h2>
      <div className="testimonial-grid">
        {t.testimonials.list.map((quote) => (
          <blockquote key={quote}>{quote}</blockquote>
        ))}
      </div>
    </section>
  )
}
