export default function BookingSection({ t }) {
  return (
    <section id="booking" className="booking-cta booking-marble">
      <h2>{t.booking.title}</h2>
      <a href="#" className="cta-button secondary">
        {t.booking.cta}
      </a>
    </section>
  )
}
