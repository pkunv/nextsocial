import UserCard from "@/components/UserCard"
import { prisma } from "@/lib/prisma"

export default async function Users() {
  const users = await prisma.user.findMany()

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
          />
        )
      })}
    </div>
  )
}
