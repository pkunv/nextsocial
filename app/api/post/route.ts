import { getCurrentUserId } from "@/lib/getCurrentUserId"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

const createSlug = (id: number, title: string) =>
  `${id}-${title
    .replace(/[^\w\s-]/g, "")
    .replace(/\s/g, "-")
    .toLowerCase()}`

const validateTitle = (title: string) => title.length > 3 || title.length < 50

const validateContent = (content: string) => content.length > 3 || content.length < 10000

const validatePost = (post: Prisma.PostCreateInput) =>
  validateTitle(post.title) && validateContent(post.content)

/* POST */
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

  const slug = createSlug(post.id, post.title)

  post = await prisma.post.update({
    where: { userId: currentUserId, id: post.id },
    data: { slug }
  })

  return NextResponse.json(post)
}

/* PUT */
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!)

  const data = await req.json()

  if (!validatePost(data))
    return NextResponse.json({ error: "Post validation error." }, { status: 400 })
  // i know that making a fake request we could possibly pass id as anything but it's just a demo
  data.slug = createSlug(data.id, data.title)

  const post = await prisma.post.update({
    where: { userId: currentUserId, id: data.id },
    data
  })

  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 400 })

  return NextResponse.json(post)
}

/* DELETE */
export async function DELETE(req: NextRequest) {
  const currentUserId = await getCurrentUserId()
  const postId = req.nextUrl.searchParams.get("id")

  if (!currentUserId)
    return NextResponse.json({ error: "User session not found." }, { status: 400 })
  if (!postId) return NextResponse.json({ error: "Post id not found." }, { status: 400 })

  const post = await prisma.post.delete({
    where: { userId: currentUserId, id: parseInt(postId) }
  })

  return NextResponse.json(post)
}
