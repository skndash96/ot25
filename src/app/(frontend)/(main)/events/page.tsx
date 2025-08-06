import EventsList from "@/client/components/events/EventsList"
import { Event } from "@/payload-types"

export default async function EventsPage() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_URL!+`/api/events?limit=100`,
    {
      next: {
        revalidate: 30*60, // 30 minutes
        tags: ['events']
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  const events = data.docs as Event[]

  return (
    <EventsList events={events} />
  )
}