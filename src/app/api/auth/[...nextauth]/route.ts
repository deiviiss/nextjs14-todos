import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { signInEmailPassword } from '@/auth/actions/auth-actions'
import prisma from '@/libs/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Correo electrónico', type: 'email', placeholder: 'tu-correo@mail.com' },
        password: { label: 'Contraseña', type: 'password', placeholder: '********' }
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(credentials?.email || '', credentials?.password || '')

        if (user) {
          return user
        }

        return null
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {

    async signIn({ user, account, profile }) {
      return true
    },

    async jwt({ token, account, profile }) {
      const dbUser = await prisma.user.findFirst({
        where: { email: token?.email ?? 'no-email' }
      })

      if (dbUser?.isActive === false) {
        throw new Error('User is not active')
      }

      token.roles = dbUser?.roles ?? ['no roles']
      token.id = dbUser?.id ?? 'no id'

      return token
    },

    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles
        session.user.id = token.id
      }
      return session
    }

  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
