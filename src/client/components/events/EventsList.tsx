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
      <h1>
        <span className="text-3xl font-bold text-amber-400">Events</span>
      </h1>

      <ul className='mt-4 flex flex-row flex-wrap gap-4'>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            hasRegistered={registrations.some((reg) => reg === event.id)}
          />
        ))}
      </ul>
    </div>
  )
}
