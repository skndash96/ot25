import { auth } from '@/lib/auth'
import payloadConfig from '@/payload.config'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

export const GET = async (
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  },
) => {
  const { id: eventId } = await params

  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    )
  }

  try {
    const payload = await getPayload({
      config: payloadConfig,
    })

    const registrations = await payload.find({
      collection: 'registrations',
      where: {
        user: {
          equals: session.user.id,
        },
        event: {
          equals: eventId,
        },
      },
      select: {
        teamName: true,
        members: true,
        createdAt: true
      },
      depth: 0
    })

    const registration = registrations.totalDocs > 0 ? {
      teamName: registrations.docs[0].teamName,
      members: registrations.docs[0].members.map(m => m.user),
    } : null

    return NextResponse.json({
      data: registration
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching registration:', error)
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
  }
}

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  },
) => {
  const { id: eventId } = await params
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    )
  }

  try {
    const { teamName, members } = await req.json()

    if (!members || !Array.isArray(members) || members.length === 0) {
      return NextResponse.json(
        { error: 'Members array is required' },
        { status: 400 },
      )
    }

    const set = new Set(members)

    if (set.size > 1 && !teamName) {
      return NextResponse.json(
        { error: 'Team name is required' },
        { status: 400 },
      )
    }

    if (set.size !== members.length) {
      return NextResponse.json(
        { error: 'Duplicate members in the team' },
        { status: 400 },
      )
    }

    const payload = await getPayload({
      config: payloadConfig,
    })

    // Check if user is already registered for this event
    const alreadyExists = await payload.find({
      collection: 'registrations',
      where: {
        user: {
          equals: session.user.id,
        },
        event: {
          equals: eventId,
        },
      },
      select: {
        members: true
      },
      depth: 0
    })

    if (alreadyExists.totalDocs > 0) {
      return NextResponse.json(
        { error: 'You already registered for this event' },
        { status: 400 },
      )
    }

    // Get event details
    const event = await payload.findByID({
      collection: 'events',
      id: eventId,
      select: {
        isRegistrationClosed: true,
        teamSize: true,
      }
    })

    if (event.isRegistrationClosed === true) {
      return NextResponse.json(
        { error: 'Registrations are closed for this event' },
        { status: 400 },
      )
    }

    // Validate team size
    if (members.length !== event.teamSize) {
      return NextResponse.json(
        { error: `Team size must be exactly ${event.teamSize} members` },
        { status: 400 },
      )
    }

    if (members.some(m => typeof m !== 'string' || !/^\d{8}$/.test(m))) {
      return NextResponse.json(
      { error: 'Each member must be a valid roll number' },
      { status: 400 },
      )
    }

    const memberIds = await Promise.all(members.map(async rollNumber => {
      const q = await payload.find({
        collection: 'users',
        where: {
          rollNumber: {
            equals: rollNumber,
          }
        },
        select: {},
        limit: 1
      })
      
      return q.totalDocs > 0 ? q.docs[0].id : null
    }))

    for (const userIdx in memberIds) {
      if (!memberIds[userIdx]) {
        return NextResponse.json(
          { error: `No user found with roll number ${members[userIdx]}` },
          { status: 400 },
        )
      }
    }

    const existingRegistrations = await payload.find({
      collection: 'registrations',
      where: {
        event: {
          equals: eventId,
        },
        'members.user': {
          in: memberIds,
        },
      },
      select: {
        members: true
      }
    })

    if (existingRegistrations.totalDocs > 0) {
      const registeredMembers = existingRegistrations.docs.flatMap(reg => 
        reg.members.map(member => typeof member.user === 'string' ? member.user : member.user.rollNumber)
      ) as string[]

      return NextResponse.json(
        { error: `Some team members are already registered: ${registeredMembers.filter(r => members.includes(r)).join(', ')}` },
        { status: 400 },
      )
    }

    // Create registration with team members
    await payload.create({
      collection: 'registrations',
      data: {
        user: session.user.id,
        event: eventId,
        teamName: teamName || null,
        members: memberIds.map(id => ({ user: id! })),
      }
    })

    revalidateTag('event-'+eventId)

    return NextResponse.json(
      { data: true },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error registering for event:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  },
) => {
  const { id: eventId } = await params
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    )
  }

  try {
    const payload = await getPayload({
      config: payloadConfig,
    })

    const registration = await payload.find({
      collection: 'registrations',
      where: {
        user: {
          equals: session.user.id,
        },
        event: {
          equals: eventId,
        },
      },
    })

    if (registration.totalDocs === 0) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 },
      )
    }

    await payload.delete({
      collection: 'registrations',
      id: registration.docs[0].id,
    })

    revalidateTag('event-'+eventId)

    return NextResponse.json(
      { data: false },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error deleting registration:', error)
    return NextResponse.json({ error: 'Failed to unregister' }, { status: 500 })
  }
}