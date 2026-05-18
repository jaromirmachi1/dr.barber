import SectionBeamsBackground from '../components/SectionBeamsBackground'
import BookingSection from './BookingSection'
import SiteFooter from './SiteFooter'

export default function BookingClosure({ t }) {
  return (
    <div className="booking-closure">
      <div className="booking-closure__background section-beams-background" aria-hidden="true">
        <SectionBeamsBackground />
      </div>
      <BookingSection t={t} />
      <SiteFooter t={t} />
    </div>
  )
}
