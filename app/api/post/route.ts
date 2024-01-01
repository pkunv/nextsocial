import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

const validateTitle = (title: string) => title.length < 3 || title.length > 50

const validateContent = (content: string) => content.length < 3 || content.length > 10000

const validatePost = (post: Prisma.PostCreateInput) =>
  validateTitle(post.title) && validateContent(post.content)

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!)

  const data = await req.json()

  if (!validatePost(data))
    return NextResponse.json({ error: "Post validation error." }, { status: 400 })

  data.userId = currentUserId
  data.published = true

  let post = await prisma.post.create({
    data
  })

  const slug = `${post.id}-${post.title.replace(/\s/g, "-")}`

  post = await prisma.post.update({
    where: { userId: currentUserId, id: post.id },
    data: { slug }
  })

  return NextResponse.json(post)
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!)

  const data = await req.json()

  if (!validatePost(data))
    return NextResponse.json({ error: "Post validation error." }, { status: 400 })

  data.slug = `${data.id}-${data.title.replace(/\s/g, "-")}`

  const post = await prisma.post.update({
    where: { userId: currentUserId, id: data.id },
    data
  })

  return NextResponse.json(post)
}
