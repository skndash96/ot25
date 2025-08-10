import type { Access, CollectionConfig } from 'payload'

const restrictOtherUsers : Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  return false
}

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: restrictOtherUsers,
    update: restrictOtherUsers,
    delete: restrictOtherUsers,
    create: restrictOtherUsers
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
