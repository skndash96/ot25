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
    read: restrictOtherUsers,
    update: restrictOtherUsers,
    delete: restrictOtherUsers,
    create: restrictOtherUsers,
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: new Date(),
      admin: {
        readOnly: true,
      },
    },
  ],
}
