import { auth } from '@/lib/auth'
import payloadConfig from '@/payload.config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export const GET = async () => {
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
        }
      },
    })

    return NextResponse.json({
      data: registrations.docs.map(r => typeof r.event === 'string' ? r.event : r.event.id)
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
  }
}