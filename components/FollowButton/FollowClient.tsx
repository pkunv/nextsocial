"use client"
import Progress from "@/components/Progress"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
interface Props {
  targetUserId: string
  isFollowing: boolean
}

export default function FollowClient({ targetUserId, isFollowing }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending
  const follow = async () => {
    setIsFetching(true)

    const res = await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({ targetUserId }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    setIsFetching(false)

    startTransition(() => {
      router.refresh()
    })
  }

  const unfollow = async () => {
    setIsFetching(true)

    const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: "DELETE"
    })

    setIsFetching(false)
    startTransition(() => router.refresh())
  }

  if (isFollowing) {
    return (
      <button
        className="btn"
        onClick={unfollow}
      >
        {!isMutating ? "Unfollow" : <Progress />}
      </button>
    )
  } else {
    return (
      <button
        className="btn"
        onClick={follow}
      >
        {!isMutating ? "Follow" : <Progress />}
      </button>
    )
  }
}
