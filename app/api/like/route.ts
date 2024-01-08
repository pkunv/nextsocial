import { getCurrentUserId } from "@/lib/getCurrentUserId"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: Request) {
  const currentUserId = await getCurrentUserId()
  if (currentUserId === null)
    return NextResponse.json({}, { status: 400, statusText: "You are not signed in." })

  const { targetPostId } = await req.json()

  const record = await prisma.likes.create({
    data: {
      userId: currentUserId,
      postId: targetPostId
    }
  })
  return NextResponse.json(record)
}

export async function DELETE(req: NextRequest) {
  const currentUserId = await getCurrentUserId()
  if (currentUserId === null)
    return NextResponse.json({}, { status: 400, statusText: "You are not signed in." })
  if (req.nextUrl.searchParams.get("targetPostId") === null)
    return NextResponse.json({}, { status: 400, statusText: "Target post ID is not submitted." })

  const targetPostId = parseInt(req.nextUrl.searchParams.get("targetPostId")!)

  const record = await prisma.likes.delete({
    where: {
      userId_postId: {
        userId: currentUserId,
        postId: targetPostId
      }
    }
  })

  return NextResponse.json(record)
}
