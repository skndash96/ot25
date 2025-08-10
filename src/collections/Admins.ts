import { admins } from '@/access/admins'
import type { CollectionConfig } from 'payload'

export const Admins: CollectionConfig = {
  slug: 'admins',
  access: {
    read: admins,
    update: admins,
    delete: admins,
    create: admins
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 100, // 100 days
  },
  fields: [],
}
