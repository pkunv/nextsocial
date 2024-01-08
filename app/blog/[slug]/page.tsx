import LikeButton from "@/components/LikeButton/LikeButton"
import { getCurrentUserId } from "@/lib/getCurrentUserId"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: { slug: true, id: true, title: true },
    where: { published: true }
  })

  return posts.map((post) => ({
    slug: post.slug ?? post.id + `-` + post.title.toLowerCase().replace(/ /g, "-")
  }))
}

export default async function BlogPostPage({ params }: Props) {
  const currentUserId = await getCurrentUserId()
  const post =
    (await prisma.post.findUnique({ where: { slug: params.slug }, include: { user: true } })) ??
    undefined
  const postLikes = await prisma.likes.findMany({ where: { postId: post?.id } })
  if (!post) notFound()

  return (
    <article className="card bg-neutral shadow-xl p-8 w-1/2">
      <h3 className="card-title text-3xl font-bold">{post.title}</h3>
      <span className="text-sm bg-neutral m-2">
        {post.user.name} | {post.createdAt.toLocaleDateString()}
      </span>
      <p>{post.content.substring(0, 32)}</p>
      <div className="divider"></div>
      <div className="flex justify-between">
        <span className="text-sm bg-neutral m-2">{postLikes.length} likes</span>

        {currentUserId && <LikeButton targetPostId={post.id} />}
      </div>
    </article>
  )
}
