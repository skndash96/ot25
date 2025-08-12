import EventTemplate from '@/client/components/events/EventPage'
import { Event } from '@/payload-types'

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const res = await fetch(process.env.NEXT_PUBLIC_URL! + `/api/events/${id}`, {
      next: {
        revalidate: 30 * 60, // 30 minutes
        tags: ['events', 'event-' + id],
      },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return <EventTemplate event={data as Event} />
  } catch (e) {
    console.error('Error fetching event:', e)
    return <div>Error loading event. Please try again later.</div>
  }
}
