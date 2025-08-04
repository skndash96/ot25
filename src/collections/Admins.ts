import type { Access, CollectionConfig } from 'payload'

const restrictOtherUsers : Access = ({ req, id }) => {
  if (req.user?.collection === 'admins' || req.user?.id && req.user.id === id) {
    return true
  }
  return false
}

export const Admins: CollectionConfig = {
  slug: 'admins',
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
  },
  fields: [
    // Email added by default
  ],
}
