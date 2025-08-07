import type { Access, CollectionConfig } from 'payload'

const restrictOtherUsers : Access = ({ req, id }) => {
  if (req.user?.collection === 'admins' || req.user?.id && req.user.id === id) {
    return true
  }
  return false
}

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  access: {
    read: () => true,
    update: restrictOtherUsers,
    delete: restrictOtherUsers,
    create: restrictOtherUsers,
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
        read: ({ req }) => req.user?.collection === 'admins',
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
