import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { GoBackButton } from "@/components/GoBackButton"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"
import PostDelete from "./PostDelete"
import { PostUpdateForm } from "./PostUpdateForm"

interface Props {
  params: { slug: string }
}

export default async function ManageBlogPostPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/api/auth/signin")

  const currentUserEmail = session.user?.email ?? ""
  const user = await prisma.user.findUnique({ where: { email: currentUserEmail } })
  const post = (await prisma.post.findUnique({ where: { slug: params.slug } })) ?? undefined
  if (!post) notFound()
  if (post.userId !== user?.id) redirect("/blog")

  return (
    <div className="w-1/2">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        {post.title}
      </h1>
      <PostUpdateForm post={post} />
      <div className="divider"></div>
      <PostDelete post={post} />
      <div className="divider"></div>
      <section>
        <GoBackButton />
      </section>
    </div>
  )
}
