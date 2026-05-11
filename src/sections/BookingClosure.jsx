import BookingBeamsBackground from '../components/BookingBeamsBackground'
import BookingSection from './BookingSection'
import SiteFooter from './SiteFooter'

export default function BookingClosure({ t }) {
  return (
    <div className="booking-closure">
      <div className="booking-closure__background" aria-hidden="true">
        <BookingBeamsBackground />
      </div>
      <BookingSection t={t} />
      <SiteFooter t={t} />
    </div>
  )
}
