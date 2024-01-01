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
  const post = (await prisma.post.findUnique({ where: { slug: params.slug } })) ?? undefined
  if (!post) notFound()

  return (
    <div className="prose lg:prose-xl">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
