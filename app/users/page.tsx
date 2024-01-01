import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserCard from "@/components/UserCard"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export default async function Users() {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!
  const currentUserId = currentUserEmail
    ? await prisma.user.findUnique({ where: { email: currentUserEmail } }).then((user) => user?.id!)
    : null

  const users = await prisma.user.findMany({ include: { followedBy: true } })

  return (
    <div
      className="grid gap-4 grid-cols-3 grid-rows-3"
      id="users-list"
    >
      {users.map((user) => {
        return (
          <UserCard
            key={user.id}
            {...user}
            userId={currentUserId}
          />
        )
      })}
    </div>
  )
}
