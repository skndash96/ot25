import { Event } from '@/payload-types'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

export default function EventCard({ event }: { event: Event }) {
  return (
    <div>
      <div>
        <Image width={200} height={250} src={event.thumbnail && (typeof event.thumbnail === "string" ? event.thumbnail : event.thumbnail.url) || "https://picsum.photos/400/500"} alt={event.title} className="rounded-lg" />
      </div>
      <div>
        <h2 className='text-xl font-semibold'>{event.title}</h2>
        <h4 className='text-sm'>
          {new Date(event.date).toLocaleString("en", {
            day: 'numeric',
            weekday: 'long',
            month: 'short'
          })} at {event.time}
        </h4>
        <h4>Location: {event.location}</h4>
        {event.description && <RichText data={event.description!} />}
        <Link href={`/events/${event.id}`} className='text-blue-500 hover:underline'>
          View Details
        </Link>
      </div>
    </div>
  )
}
