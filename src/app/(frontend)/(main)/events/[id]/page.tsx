import EventTemplate from "@/client/components/events/EventPage"
import { Event } from "@/payload-types"

export default async function EventPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const res = await fetch(
    process.env.NEXT_PUBLIC_URL!+`/api/events/${id}`,
    {
      next: {
        revalidate: 1, // 30 minutes
        tags: ['events']
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return (
    <EventTemplate event={data as Event} />
  )
}