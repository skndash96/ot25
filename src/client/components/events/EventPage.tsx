'use client'

import { Event } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Calendar, MapPin, Users, CheckCircle, ArrowLeft, X, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { json } from 'zod'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (teamName: string, members: string[]) => void
  teamSize: number
  isLoading: boolean
  userId: string
}

function RegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  teamSize,
  isLoading,
  userId,
}: RegistrationModalProps) {
  const [teamName, setTeamName] = useState('')
  const [members, setMembers] = useState<string[]>([])

  useEffect(() => {
    if (isOpen) {
      // Initialize with userId as first member and empty strings for remaining slots
      const initialMembers = Array(teamSize)
        .fill('')
        .map((_, index) => (index === 0 ? userId : ''))
      setMembers(initialMembers)
    }
  }, [isOpen, teamSize, userId])

  const updateMember = (index: number, value: string) => {
    const newMembers = [...members]
    newMembers[index] = value
    setMembers(newMembers)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validMembers = members.filter((member) => member.trim() !== '')

    if (validMembers.length < teamSize) {
      toast.error(`Please enter all ${teamSize} team members`)
      return
    }

    onSubmit(teamName, validMembers)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-neutral-800 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-amber-400">Register for Event</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm text-neutral-300 mb-4">
              Team Size: {teamSize} {teamSize === 1 ? 'member' : 'members'}
            </p>

            <div className="space-y-3">
              {teamSize > 1 && (
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Team Name</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.currentTarget.value)}
                    placeholder={'Enter team name'}
                    className={`w-full px-3 py-2 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 transition-colors ${'bg-neutral-700 focus:outline-none focus:border-amber-400'}`}
                    required
                  />
                </div>
              )}

              {members.map((member, index) => (
                <div key={index}>
                  <label className="block text-sm text-neutral-300 mb-1">
                    {index === 0 ? 'Team Leader (You)' : `Member ${index + 1} Roll Number`}
                  </label>
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder={index === 0 ? 'Your roll number' : 'Enter roll number'}
                    disabled={index === 0 && member !== ''}
                    className={`w-full px-3 py-2 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 transition-colors ${
                      index === 0
                        ? 'bg-neutral-600 cursor-not-allowed'
                        : 'bg-neutral-700 focus:outline-none focus:border-amber-400'
                    }`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-neutral-600 text-neutral-300 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2 px-4 bg-amber-400 hover:bg-amber-500 text-neutral-900 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function EventPage({ event }: { event: Event }) {
  const { data: session } = useSession()
  const userId = useMemo(() => session?.user.id, [session])
  const [hasRegistered, setHasRegistered] = useState<string | undefined>()
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!userId) {
      setHasRegistered(undefined)
      return
    }

    fetch(`/api/registrations/${event.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch registration')
        return res.json()
      })
      .then(({ data }) => {
        setHasRegistered(data.teamName)
      })
      .catch((err) => {
        toast.error(`Error fetching registration`)
        console.error('Error fetching registration:', err)
      })
  }, [userId, event.id])

  const handleRegistration = async (teamName: string, members: string[]) => {
    if (!userId) {
      toast.error('You must be logged in to register')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/registrations/${event.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName,
          members: members.map((rollNumber) => rollNumber.trim()),
        }),
      })

      const json = (await response.json()) as any

      if (!response.ok) {
        toast.error(json.error || json.message || 'Failed to register for event')
        return
      }

      setHasRegistered(json.teamName || 'registered')
      setShowModal(false)

      toast.success('Successfully registered for the event!')
    } catch (error) {
      toast.error('Error completing the registration')
      console.error('Error completing the registration:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnregister = async () => {
    try {
      const response = await fetch(`/api/registrations/${event.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to unregister from event')
      }

      setHasRegistered(undefined)
      toast.success('Successfully unregistered from the event!')
    } catch (error) {
      toast.error('Error unregistering from the event')
      console.error('Error unregistering:', error)
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
              {event.date && (
                <>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    Date Information
                  </div>

                  <RichText data={event.date} />
                </>
              )}

              {event.location && (
                <div className="flex items-center gap-3 text-neutral-300">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-neutral-300">
                <Users className="w-5 h-5 text-amber-400 flex-shrink-0" />
                {event.takeRegistrations ? (
                  <span>
                    {event.totalRegistrations || 0} registered • Team size: {event.teamSize}
                  </span>
                ) : (
                  <span>On-spot Entries</span>
                )}
              </div>
            </div>

            {hasRegistered ? (
              <div className="mt-4 text-center space-y-4">
                <div className="inline-flex items-center gap-2 text-amber-400 bg-amber-400/10 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium text-xl">
                    You&apos;re registered {hasRegistered === 'registered' ? '' : `'${hasRegistered}'`}!
                  </span>
                </div>

                {event.whatsappLink && (
                  <div className="flex flex-col items-center gap-2">
                    <a
                      href={event.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Join WhatsApp Group</span>
                    </a>
                  </div>
                )}

                <button
                  onClick={handleUnregister}
                  className="ml-4 -translate-y-1/4 text-base underline text-neutral-400 hover:text-red-400 transition"
                >
                  Unregister
                </button>
              </div>
            ) : (
              <>
                <button
                  disabled={hasRegistered === undefined || event.isRegistrationClosed || !userId}
                  onClick={() => setShowModal(true)}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed bg-amber-400 hover:bg-amber-500 text-neutral-900 shadow-lg hover:shadow-amber-400/25"
                >
                  {!userId
                    ? 'Please Log in'
                    : event.takeRegistrations === false
                      ? 'On-spot Entries Only'
                      : hasRegistered === undefined
                        ? 'Loading...'
                        : event.isRegistrationClosed
                          ? 'Registration Closed'
                          : 'Register for Event'}
                </button>

                {event.gFormLink && (
                  <Link
                    target="_blank"
                    rel="nofollow"
                    href={event.gFormLink}
                    className="block w-fit ml-auto underline"
                  >
                    B.Sc / B.Ed Student or trouble registering?
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* Description and Rules - Full Width */}
        <div className="mt-4 md:mt-12 space-y-8">
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

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRegistration}
        teamSize={event.teamSize}
        isLoading={isLoading}
        userId={session?.user?.rollNumber || ''}
      />
    </>
  )
}
