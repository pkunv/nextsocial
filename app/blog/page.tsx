import PostCard from "@/components/PostCard"
import Search from "@/components/Search"
import { getCurrentUserId } from "@/lib/getCurrentUserId"
import { prisma } from "@/lib/prisma"
import { PostForm } from "./PostForm"

export default async function Blog({
  searchParams: { q, searchBy }
}: {
  searchParams: { q: string | undefined; searchBy: string | undefined }
}) {
  let posts = await prisma.post.findMany({ include: { user: true } })

  if (q) {
    posts = posts.filter((post) => {
      if (searchBy === "title" || !searchBy) {
        return post.title.toLocaleLowerCase().includes(q)
      } else if (searchBy === "content") {
        return post.content.toLocaleLowerCase().includes(q)
      } else if (searchBy === "user") {
        return post.user.name?.toLocaleLowerCase().includes(q)
      }
    })
  }
  const currentUserId = await getCurrentUserId()

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Blog
      </h1>
      {currentUserId ? <PostForm /> : null}
      <div className="divider"></div>
      <section className="my-2 w-1/2">
        <h2 className="text-4xl font-extrabold">Posts list</h2>
        <Search />
        <div
          id="posts-list"
          className="grid grid-rows-1 gap-4 mt-2"
        >
          {posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                {...post}
                currentUserId={currentUserId}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
