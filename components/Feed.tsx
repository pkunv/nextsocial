import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import PostCard from "./PostCard"

export default async function Feed() {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!)
  const following = await prisma.follows.findMany({
    where: { followerId: currentUserId }
  })

  const posts = await prisma.post.findMany({
    where: {
      userId: {
        in: following.map((follow) => follow.followingId)
      }
    },
    include: { user: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Your feed
      </h1>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          {...post}
        />
      )) ?? "No posts to show! Follow some users to see their posts here."}
    </>
  )
}
