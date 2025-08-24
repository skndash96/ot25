import { admins } from '@/access/admins'
import { anyone } from '@/access/anyone'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    update: admins,
    delete: admins,
    create: admins,
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true
}
