import PostCard from "@/components/PostCard"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { PostForm } from "./PostForm"

export default async function Posts() {
  const posts = await prisma.post.findMany({ include: { user: true } })
  const session = await getServerSession(authOptions)

  return (
    <div
      className="grid grid-rows-1 gap-4"
      id="posts-list"
    >
      {session ? <PostForm /> : null}
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
