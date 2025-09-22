import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/howto/record-telemetry')({
  component: HowToRecordTelemetry,
})

export default function HowToRecordTelemetry() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Howto: Record Telemetry</h1>
      <p>Instructions for recording telemetry.</p>
    </div>
  )
}
