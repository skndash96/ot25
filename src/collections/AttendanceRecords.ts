import { admins, noAccess } from '@/access/index'
import type { CollectionConfig } from 'payload'

export const AttendanceRecords: CollectionConfig = {
  slug: 'attendance-records',
  access: {
    read: admins,
    update: noAccess,
    delete: noAccess,
    create: noAccess
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
      name: "attendee",
      type: "relationship",
      relationTo: "users",
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
      name: "timestamp",
      type: "date",
      required: true,
      admin: {
        readOnly: true,
      }
    }
  ],
}
