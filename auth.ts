import NextAuth, {type DefaultSession } from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/lib/db"
import { getUserById } from "@/lib/data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "@/lib/data/two-factor-confirmation"

//any new fields to add in the user session
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOauth: boolean
}

declare module "next-auth" {
  interface Session {
      user: ExtendedUser
  }       
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error"
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      // allow OAuth without email verification
      if (account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id as string);

      //prevent sign in without email verification
      if(!existingUser?.emailVerified) return false

      if(existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser?.id)

        if(!twoFactorConfirmation) return false

        //delete two factor authentication for login
        await db.twoFactorConfirmation.delete({
          where: {id: twoFactorConfirmation.id}
        })

        return true
      }
      
      return true
    },

    async jwt({ token }) {
      if(!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token

      token.role = existingUser.role

      return token
    },

    async session({ token, session }) {
      if(token.sub && session.user) {
        session.user.id = token.sub
      }
      if(token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session
    }
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  ...authConfig,
})