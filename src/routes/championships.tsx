import { createFileRoute } from '@tanstack/react-router'
import RaceCalendarGallery from '../components/RaceCalenderGallery'

export const Route = createFileRoute('/championships')({
  component: Championships,
})

export default function Championships() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        Championships
      </h1>
      <p className="text-lg leading-relaxed">
        Here you can find the current race calendar with all planned events and
        their details.
      </p>
      <RaceCalendarGallery />
    </>
  )
}
