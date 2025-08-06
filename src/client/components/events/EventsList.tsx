"use client"
import { Event } from '@/payload-types'
import React from 'react'
import EventCard from './EventCard'

export default function EventsList({
  events
}: {
  events: Event[]
}) {
  return (
    <div>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
