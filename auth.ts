import NextAuth, {type DefaultSession } from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/lib/db"
import { getUserById } from "@/lib/data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "@/lib/data/two-factor-confirmation"
import { getAccountByUserId } from "./lib/data/account"

//any new fields to add in the user session
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
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

      const existingAccount = await getAccountByUserId(existingUser.id)
      
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isOAuth = !!existingAccount
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },

    async session({ token, session }) {
      if(token.sub && session.user) {
        session.user.id = token.sub
      }
      if(token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
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