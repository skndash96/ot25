import EventsList from "@/client/components/events/EventsList"
import { Event } from "@/payload-types"

export default async function EventsPage() {
  try {
    const eventsRes = await fetch(
      process.env.NEXT_PUBLIC_URL!+`/api/events?limit=100`,
      {
        next: {
          revalidate: 30*60, // 30 minutes
          tags: ['events']
        },
      }
    )
  
    if (!eventsRes.ok) {
      throw new Error('Failed to fetch data')
    }
  
    const eventsData = await eventsRes.json()
    const events = eventsData.docs as Event[]
  
    return (
      <EventsList events={events} />
    )
  } catch (e) {
    console.error('Error fetching events:', e)
    return <div>Error loading events. Please try again later.</div>
  }
}