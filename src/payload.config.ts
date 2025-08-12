// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Admins } from './collections/Admins'
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { Registrations } from './collections/Registrations'
import { AttendanceRecords } from './collections/AttendanceRecords'
import { ManagerRecords } from './collections/ManagerRecords'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Admins, Users, Media, Events, Registrations, AttendanceRecords, ManagerRecords],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: {
    origins: ["https://34b9925548ca.ngrok-free.app"]
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read'
      },
    }),
  ],
})
