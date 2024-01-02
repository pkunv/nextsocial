import Search from "@/components/Search"
import UserCard from "@/components/UserCard"
import { getCurrentUserId } from "@/lib/getCurrentUserId"
import { prisma } from "@/lib/prisma"

export default async function Users({
  searchParams: { q }
}: {
  searchParams: { q: string | undefined }
}) {
  const currentUserId = await getCurrentUserId()

  let users = await prisma.user.findMany({ include: { followedBy: true } })

  if (q) {
    users = users.filter((user) => {
      return user.name?.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    })
  }

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Users
      </h1>
      <section>
        <h2 className="text-4xl font-extrabold">Users list</h2>
        <Search
          search={true}
          searchBy={false}
        />
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
      </section>
    </>
  )
}
