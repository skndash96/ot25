'use client'
import { Event } from '@/payload-types'
import React, { useEffect, useMemo, useState } from 'react'
import EventCard from './EventCard'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

export default function EventsList({ events }: { events: Event[] }) {
  const { data: session } = useSession()
  const userId = useMemo(() => session?.user.id, [session])
  const [registrations, setRegistrations] = useState<string[]>([])

  const eventsByType = useMemo(
    () =>
      events.reduce(
        (acc, e) => {
          if (!acc[e.type]) {
            acc[e.type] = []
          }

          acc[e.type].push(e)
          return acc
        },
        {} as Record<string, Event[]>,
      ),
    [events],
  )

  useEffect(() => {
    if (!userId) {
      return
    }

    fetch(`/api/registrations`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch registrations')
        return res.json()
      })
      .then(({ data }) => {
        setRegistrations(data)
      })
      .catch((err) => {
        toast.error(`Error fetching registrations`)
        console.error('Error fetching registrations:', err)
      })
  }, [userId])

  return (
    <div className="p-4 md:p-8">
        {Object.entries(eventsByType).map(([type, typeEvents]) => (
          <div key={type} className="mb-8">
            <h1 className="text-3xl font-bold text-amber-400 capitalize">{type}</h1>
            <ul className="flex flex-row overflow-auto gap-4">
              {typeEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  hasRegistered={registrations.some((reg) => reg === event.id)}
                />
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}
