import ComingSoon from "@/client/components/ComingSoon"
import EventsList from "@/client/components/events/EventsList"
import payloadConfig from "@/payload.config"
import { getPayload } from "payload"

export const revalidate = 1800

export default async function EventsPage() {
  return (
    <ComingSoon />
  )

  try {
    const payload = await getPayload({
      config: payloadConfig
    })

    const { docs: events } = await payload.find({
      collection: 'events',
      where: {
        isPublic: {
          equals: true
        }
      },
      limit: 100
    })

    return (
      <EventsList events={events} />
    )
  } catch (e) {
    console.error('Error fetching events:', e)
    return <div>Error loading events. Please try again later.</div>
  }
}