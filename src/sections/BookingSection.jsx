export default function BookingSection({ t, onBook }) {
  return (
    <section id="booking" className="booking-cta booking-section">
      <h2>{t.booking.title}</h2>
      <button type="button" className="cta-button secondary" onClick={onBook}>
        {t.booking.cta}
      </button>
    </section>
  )
}
