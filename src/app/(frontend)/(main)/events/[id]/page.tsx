import EventTemplate from '@/client/components/events/EventPage'
import { Event } from '@/payload-types'

const getEvent = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL! + `/api/events/${id}`, {
    next: {
      revalidate: 30 * 60, // 30 minutes
      tags: ['events', 'event-' + id],
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json() as Promise<Event>
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await getEvent(id)

  return {
    title: event.title + ' | OT25 Events',
    description: 'Find out Details, Rulebook and more about ' + event.title,
    openGraph: {
      title: event.title + ' | OT25 Events',
      description: 'Find out Details, Rulebook and more about ' + event.title,
      images: event.thumbnail || undefined
    },
  }
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const event = await getEvent(id)

    return <EventTemplate event={event as Event} />
  } catch (e) {
    console.error('Error fetching event:', e)
    return <div>Error loading event. Please try again later.</div>
  }
}
