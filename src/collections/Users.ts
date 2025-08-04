import type { Access, CollectionConfig } from 'payload'

const restrictOtherUsers : Access = ({ req, id }) => {
  if (req.user?.collection === 'admins' || req.user?.id && req.user.id === id) {
    return true
  }
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
    useAsTitle: 'email',
  },
  auth: {
    disableLocalStrategy: true
  },
  fields: [
    // Email added by default
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
