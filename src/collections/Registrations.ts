import { admins, noAccess } from '@/access/admins'
import { anyone } from '@/access/anyone'
import type { CollectionConfig } from 'payload'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  access: {
    read: anyone,
    update: noAccess,
    delete: noAccess,
    create: noAccess,
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        read: admins,
      }
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: new Date(),
      admin: {
        readOnly: true,
      },
    },
  ]
}
