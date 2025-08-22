import { admins } from '@/access/admins'
import { anyone } from '@/access/anyone'
import { Event } from '@/payload-types'
import type { CollectionBeforeReadHook, CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: anyone,
    update: admins,
    delete: admins,
    create: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      required: false,
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'type',
      type: 'select',
      options: ['Guest Lecture', 'Proshow', 'Workshop', 'Event', 'Other'],
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'rules',
      type: 'richText',
    },
    {
      name: 'totalRegistrations',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'registrations',
      type: 'join',
      collection: 'registrations',
      on: 'event',
      hasMany: true,
      admin: {
        allowCreate: false,
      },
      access: {
        read: admins,
      },
    },
  ],
  hooks: {
    beforeRead: [
      async ({ doc }) => {
        if (!doc) return doc
        doc.totalRegistrations = doc.registrations?.docs?.length ?? 0
        return doc
      },
    ] as CollectionBeforeReadHook<Event>[],
    afterChange: [
      async ({ doc, operation }) => {
        const tags = ['events']
        if (operation === 'update') tags.push(`event-${doc.id}`)

        for (const tag of tags) {
          await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/revalidate/events?${tag === "events" ? "" : "id="+tag}`,
            {
              method: 'PUT'
            }
          ).catch((error) => {
            console.error(`Failed to revalidate tag ${tag}:`, error)
          })
        }

        return doc
      },
    ],
  },
}
