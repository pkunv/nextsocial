import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!)

  const data = await req.json()
  data.userId = currentUserId

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

  data.slug = `${data.id}-${data.title.replace(/\s/g, "-")}`

  const post = await prisma.post.update({
    where: { userId: currentUserId, id: data.id },
    data
  })

  return NextResponse.json(post)
}
