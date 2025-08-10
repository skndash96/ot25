import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      const payload = await getPayload({ config: payloadConfig })

      if (account && profile && account.provider === 'google') {
        const email = profile.email || ''
        const userDocs = await payload.find({
          collection: 'users',
          where: {
            email: {
              equals: email,
            },
          },
        })

        if (userDocs.totalDocs > 0) {
          return true
        } else {
          await payload.create({
            collection: 'users',
            data: {
              name: profile.name || '',
              gender: null,
              email,
              image: profile.picture || '',
              rollNumber: '',
              department: '',
              phoneNumber: '',
            },
          })
          return true
        }
      }
      return false
    },

    async jwt({ token, user, profile }) {
      const payload = await getPayload({ config: payloadConfig })

      const email = profile?.email ?? user?.email ?? token.user.email

      if (!email) {
        return null
      }

      const userDocs = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (userDocs.totalDocs > 0) {
        const dbUser = userDocs.docs[0]
        token.user = {
          id: dbUser.id,
          email: dbUser.email || '',
          gender: dbUser.gender || null,
          name: dbUser.name || '',
          image: dbUser.image || '',
          rollNumber: dbUser.rollNumber || '',
          department: dbUser.department || '',
          phoneNumber: dbUser.phoneNumber || '',
        }

        // remove default props
        delete token.name
        delete token.email
        delete token.picture
        delete token.sub

        return token
      }

      return null
    },

    async session({ session, token }) {
      const tokenUser = token.user

      session.user = {
        id: tokenUser.id,
        name: tokenUser.name || '',
        gender: tokenUser.gender || null,
        email: tokenUser.email || '',
        image: tokenUser.image || '',
        rollNumber: tokenUser.rollNumber || '',
        department: tokenUser.department || '',
        phoneNumber: tokenUser.phoneNumber || '',
        emailVerified: null
      }

      return session
    },
  },
})
