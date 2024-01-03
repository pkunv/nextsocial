"use client"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

interface Props {
  targetPostId: number
  isLiking: boolean
}

export default function LikeClient({ targetPostId, isLiking }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending
  const like = async () => {
    setIsFetching(true)

    const res = await fetch("/api/like", {
      method: "POST",
      body: JSON.stringify({ targetPostId }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    setIsFetching(false)

    startTransition(() => {
      router.refresh()
    })
  }

  const unlike = async () => {
    setIsFetching(true)

    const res = await fetch(`/api/like?targetPostId=${targetPostId}`, {
      method: "DELETE"
    })

    setIsFetching(false)
    startTransition(() => router.refresh())
  }

  if (isLiking) {
    return (
      <button
        className="btn"
        onClick={unlike}
      >
        {!isMutating ? "Unfollow" : "..."}
      </button>
    )
  } else {
    return (
      <button
        className="btn"
        onClick={like}
      >
        {!isMutating ? "Follow" : "..."}
      </button>
    )
  }
}
