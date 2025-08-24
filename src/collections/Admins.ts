import { admins, noAccess } from '@/access/index'
import type { CollectionConfig } from 'payload'

export const Admins: CollectionConfig = {
  slug: 'admins',
  access: {
    read: admins,
    update: noAccess,
    delete: noAccess,
    create: noAccess
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 100, // 100 days
  },
  fields: [
    {
      name: 'name',
      type: 'text'
    }
  ],
}
