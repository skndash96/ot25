import type { Access, CollectionConfig } from 'payload'

const isAdmin: Access = ({ req, id }) => {
  if (req.user?.collection === 'admins') {
    return true
  }
  return false
}

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
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
      type: 'text'
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
      name: 'totalRegistrations',
      type: 'number',
      virtual: 'registrations.length'
    },
    {
      name: 'registrations',
      type: 'join',
      collection: 'registrations',
      on: "event",
      hasMany: true,
      admin: {
        allowCreate: false
      }
    }
  ],
}
