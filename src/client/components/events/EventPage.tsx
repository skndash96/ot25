'use client'

import { Event } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Calendar, Clock, MapPin, Users, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EventPage({ event }: { event: Event }) {
  const [hasRegistered, setHasRegistered] = useState<boolean | undefined>()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/registrations/${event.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch registration')
        return res.json()
      })
      .then(({ data }) => {
        setHasRegistered(data)
      })
      .catch((err) => {
        toast.error(`Error fetching registration`)
        console.error('Error fetching registration:', err)
      })
  }, [event.id])

  const handleSubmitRegistration = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/registrations/${event.id}`, {
        method: hasRegistered ? 'DELETE' : 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to register for event')
      }

      const json = await response.json()
      const newHasRegistered = json.data
      setHasRegistered(newHasRegistered)

      toast.success(
        newHasRegistered
          ? 'Successfully registered for the event!'
          : 'Successfully unregistered from the event!',
      )
    } catch (error) {
      toast.error('Error completing the action')
      console.error('Error completing the action (Register/Unregister):', error)
    }
  }

  const thumbnailUrl =
    (event.thumbnail &&
      (typeof event.thumbnail === 'string' ? event.thumbnail : event.thumbnail.url)) ||
    'https://picsum.photos/400/500'

  return (
    <>
      {/* Back Navigation */}
      <div className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events</span>
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6 flex flex-col md:flex-row md:items-start md:gap-8">
          <div className="relative aspect-[4/5] w-full max-w-xs md:max-w-md lg:max-w-lg shrink-0 mx-auto rounded-2xl overflow-hidden bg-neutral-800 shadow-2xl">
            <Image
              fill
              src={thumbnailUrl}
              alt={event.title}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 384px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="space-y-6 grow">
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 leading-tight">
                {event.title}
                <div className="ml-2 -translate-y-1/6 text-base inline-block font-medium text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full">
                  {event.type}
                </div>
              </h1>
            </div>

            <div className="bg-neutral-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-neutral-300">
                <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>
                  {new Date(event.date).toLocaleString('en', {
                    day: 'numeric',
                    weekday: 'long',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-3 text-neutral-300">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center gap-3 text-neutral-300">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-3 text-neutral-300">
                <Users className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>{event.totalRegistrations || 0} registered</span>
              </div>
            </div>

            {hasRegistered ? (
              <div className="mt-4 text-center space-y-2">
                <div className="inline-flex items-center gap-2 text-amber-400 bg-amber-400/10 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium text-xl">You're registered!</span>
                </div>

                <button
                  onClick={handleSubmitRegistration}
                  className="ml-4 -translate-y-1/4 text-base underline text-neutral-400 hover:text-red-400 transition"
                >
                  Unregister
                </button>
              </div>
            ) : (
              <button
                disabled={hasRegistered === undefined}
                onClick={handleSubmitRegistration}
                className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 disabled:bg-transparent bg-amber-400 hover:bg-amber-500 text-neutral-900 shadow-lg hover:shadow-amber-400/25"
              >
                {hasRegistered === undefined ? 'Loading...' : 'Register for Event'}
              </button>
            )}
          </div>
        </div>

        {/* Description and Rules - Full Width */}
        <div className="mt-12 space-y-8">
          {/* Description */}
          {event.description && (
            <div className="bg-neutral-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-amber-400 mb-4">About This Event</h3>
              <div className="prose prose-invert prose-amber max-w-none text-neutral-300">
                <RichText data={event.description} />
              </div>
            </div>
          )}

          {/* Rules */}
          {event.rules && (
            <div className="bg-neutral-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-amber-400 mb-4">Event Rules</h3>
              <div className="prose prose-invert prose-amber max-w-none text-neutral-300">
                <RichText data={event.rules} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
