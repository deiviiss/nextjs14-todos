// nextauth.d.ts
import { type DefaultUser } from 'next-auth'

interface IUser extends DefaultUser {
  roles?: string[]
  isActivate?: boolean
}

declare module 'next-auth' {
  interface User extends IUser { }
  interface Session {
    user?: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser { }
}
