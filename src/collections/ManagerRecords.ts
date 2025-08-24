import { admins, SUPER_EMAIL } from '@/access/index'
import type { CollectionConfig } from 'payload'

export const ManagerRecords: CollectionConfig = {
  slug: 'manager-records',
  access: {
    read: admins,
    update: admins,
    delete: admins,
    create: admins
  },
  admin: {
    hidden: ({ user }) => !SUPER_EMAIL.includes(user?.email || "")
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: "manager",
      type: "relationship",
      relationTo: "admins",
      required: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: "records",
      type: "json",
      required: true,
      admin: {
        readOnly: true,
      }
    }
  ],
}
