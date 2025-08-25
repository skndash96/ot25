import { Event } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle } from 'lucide-react'

export default function EventCard({
  event,
  hasRegistered,
}: {
  event: Event
  hasRegistered: boolean
}) {
  const imageUrl =
    (event.thumbnail &&
      (typeof event.thumbnail === 'string' ? event.thumbnail : event.thumbnail.url)) ||
    'https://picsum.photos/400/500'

  return (
    <li className="w-fit flex flex-col shrink-0 gap-3 group bg-neutral-800 border border-neutral-700 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-amber-400/50">
      <div className="flex-shrink-0 w-fit mx-auto relative">
        <div className="w-full max-w-60 aspect-[0.8] relative rounded-lg overflow-hidden bg-neutral-700 border border-neutral-600">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={event.title}
            width={400}
            height={500}
            className="object-cover"
            sizes="80px"
          />
        </div>
        {hasRegistered && (
          <div className="absolute -top-1 -right-1 bg-amber-400 text-neutral-900 rounded-full p-1">
            <CheckCircle className="w-3 h-3" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-bold text-amber-400 leading-tight">{event.title}</h2>
        <h3 className="text-sm text-amber-300">{event.type}</h3>

        <div className="mt-2 space-y-1">
          {/* <div className="flex items-center gap-1 text-neutral-300">
            <Calendar className="w-3 h-3 text-amber-400" />
            <span className="text-sm">
              {new Date(event.date).toLocaleString('en', {
                day: 'numeric',
                weekday: 'short',
                month: 'short',
              })}
            </span>
            <Clock className="w-3 h-3 text-amber-400 ml-1" />
            <span className="text-sm">{event.time}</span>
          </div> */}

          {event.location && (
            <div className="flex items-center gap-1 text-neutral-300">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span className="text-sm truncate">{event.location}</span>
            </div>
          )}
        </div>

        {/* Mobile View Details Link */}
        <Link
          href={`/events/${event.id}`}
          className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors py-2 px-4 border border-amber-400/30 rounded-lg hover:bg-amber-400/10"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </li>
  )
}
