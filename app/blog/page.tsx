import PostCard from "@/components/PostCard"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { PostForm } from "./PostForm"

export default async function Blog() {
  const posts = await prisma.post.findMany({ include: { user: true } })
  const session = await getServerSession(authOptions)

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Blog
      </h1>
      {session ? <PostForm /> : null}
      <section>
        <h2 className="text-4xl font-extrabold">Posts list</h2>
        <div
          id="posts-list"
          className="grid grid-rows-1 gap-4"
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
      </section>
    </>
  )
}
