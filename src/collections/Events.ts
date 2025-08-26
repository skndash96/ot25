import { admins, anyone } from '@/access/index'
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
  admin: {
    useAsTitle: 'title'
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
      name: 'gFormLink',
      type: 'text',
      required: false
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'takeRegistrations',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'isRegistrationClosed',
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
      name: 'teamSize',
      type: 'number',
      min: 1,
      required: true,
      defaultValue: 1
    },
    {
      name: 'whatsappLink',
      type: 'text',
      required: false,
    },
    {
      name: 'date',
      type: 'richText'
    },
    {
      name: 'location',
      type: 'text'
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
      defaultLimit: 500,
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
