import { User } from '@/payload-types'
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: Pick<User, 'id' | 'name' | 'gender' | 'email' | 'rollNumber' | 'department' | 'phoneNumber' | 'image'>
  }
}

declare module 'next-auth/jwt' {
  interface DefaultJWT {
    
  }
  interface JWT {
    user: Pick<User, 'id' | 'name' | 'gender' | 'email' | 'rollNumber' | 'department' | 'phoneNumber' | 'image'>
  }
}
