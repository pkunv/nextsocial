import PostCard from "@/components/PostCard"
import { prisma } from "@/lib/prisma"

export default async function Users() {
  const posts = await prisma.post.findMany({ include: { user: true } })
  return (
    <div
      className="grid grid-rows-1 gap-4"
      id="posts-list"
    >
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            {...post}
          />
        )
      })}
    </div>
  )
}
