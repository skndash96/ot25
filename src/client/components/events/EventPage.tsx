import { Event } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import React from 'react'

export default function EventPage({ event }: { event: Event }) {
  return (
    <div>
      <div>
        <Image
          width={200}
          height={250}
          src={
            (event.thumbnail &&
              (typeof event.thumbnail === 'string' ? event.thumbnail : event.thumbnail.url)) ||
            'https://picsum.photos/400/500'
          }
          alt={event.title}
          className="rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <h4 className="text-sm">
          {new Date(event.date).toLocaleString('en', {
            day: 'numeric',
            weekday: 'long',
            month: 'short',
          })}{' '}
          at {event.time}
        </h4>
        <h4>Location: {event.location}</h4>
        {event.description && (
          <div>
            <h3 className="font-semibold">Description:</h3>
            <RichText data={event.description} />
          </div>
        )}
        {event.rules && (
          <div>
            <h3 className="font-semibold">Rules:</h3>
            <RichText data={event.rules} />
          </div>
        )}
        {JSON.stringify([event.registrations, event.totalRegistrations], null, 2)}
      </div>
    </div>
  )
}
