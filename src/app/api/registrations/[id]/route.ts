import { auth } from '@/lib/auth'
import payloadConfig from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

export const GET = async (
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
    })

    return NextResponse.json({
      data: registrations
    }, { status: 200 })
  } catch (error) {
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
    const payload = await getPayload({
      config: payloadConfig,
    })

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
    })

    if (alreadyExists.totalDocs > 0) {
      return NextResponse.json(
        { error: 'You are already registered for this event' },
        { status: 400 },
      )
    }

    await payload.create({
      collection: 'registrations',
      data: {
        user: session.user.id,
        event: eventId,
      }
    })

    return NextResponse.json(
      { message: `Registered successfully` },
      { status: 201 },
    )
  } catch (error) {
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

    return NextResponse.json(
      { message: `Unregistered successfully` },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: 'Failed to unregister' }, { status: 500 })
  }
}
