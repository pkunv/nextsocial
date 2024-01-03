import { getCurrentUserId } from "@/lib/getCurrentUserId"
import { prisma } from "@/lib/prisma"
import LikeClient from "./LikeClient"

interface Props {
  targetPostId: number
}

export default async function LikeButton({ targetPostId }: Props) {
  const currentUserId = (await getCurrentUserId()) ?? undefined

  const isLiking = await prisma.likes.findFirst({
    where: { userId: currentUserId, postId: targetPostId }
  })
  return (
    <LikeClient
      targetPostId={targetPostId}
      isLiking={!!isLiking}
    />
  )
}
