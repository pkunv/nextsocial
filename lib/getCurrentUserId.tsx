import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { prisma } from "./prisma"

export const getCurrentUserId = async () => {
  const session = await getServerSession(authOptions)

  return session?.user?.email
    ? await prisma.user
        .findUnique({ where: { email: session.user.email } })
        .then((user) => user?.id!)
    : null
}
