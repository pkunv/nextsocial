import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your email...", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials, req) {
        // TODO: only e2e user for now
        /*
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } })

        // Check if user exists and credentials are defined
        if (!user || !credentials?.email || !credentials?.password) {
          return null
        }

        // Validate password
        const isPasswordMatch = await isPasswordValid(credentials?.password, user.password)

        if (!isPasswordMatch) {
          return null
        }
        */
        return {
          name: user.name,
          email: user.email
        }
      }
    })
  ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
