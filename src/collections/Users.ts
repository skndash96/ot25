import { admins } from '@/access/admins'
import type { Access, CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: admins, // next auth takes care of giving profile data to client
    update: admins,
    delete: admins,
    create: admins
  },
  admin: {
    useAsTitle: 'rollNumber',
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "gender",
      options: ["MALE", "FEMALE", "OTHER"],
      type: "select",
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: 'image',
      type: 'text',
    },
    {
      name: "rollNumber",
      type: "text"
    },
    {
      name: "department",
      type: "text"
    },
    {
      name: "phoneNumber",
      type: "text"
    },
  ],
}
