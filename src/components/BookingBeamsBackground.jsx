import { lazy, Suspense } from 'react'

const Beams = lazy(() => import('./Beams/Beams'))

const bookingBeamsProps = {
  beamNumber: 14,
  lightColor: '#c8a96e',
  noiseIntensity: 1.6,
  rotation: -18,
  speed: 1.6,
}

export default function BookingBeamsBackground() {
  return (
    <Suspense fallback={null}>
      <Beams {...bookingBeamsProps} />
    </Suspense>
  )
}
