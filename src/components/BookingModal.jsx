import { useEffect } from 'react'
import { BONFERO_BOOKING_URL } from '../constants/booking'
import './BookingModal.css'

export default function BookingModal({ isOpen, onClose, title }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <div
      className={`booking-modal ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={`booking-modal__backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-label="Close reservation"
        tabIndex={isOpen ? 0 : -1}
      />

      <div
        className="booking-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <header className="booking-modal__header">
          <h2 id="booking-modal-title">{title}</h2>
          <button
            type="button"
            className="booking-modal__close"
            onClick={onClose}
            aria-label="Close reservation"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </header>

        <div className="booking-modal__frame-wrap">
          {isOpen ? (
            <iframe
              src={BONFERO_BOOKING_URL}
              title={title}
              className="booking-modal__frame"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
