"use client"

import { Post } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "react-toastify"

export default function PostDelete({ post }: { post: Post }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFetching(true)

    const res = await fetch(`/api/post?id=${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      toast.success("You deleted your post succesfully!", {
        autoClose: 1500
      })
      startTransition(() => {
        router.replace("/blog")
      })
    } else
      toast.error(`There is a problem with your request: ${res.statusText}`, {
        autoClose: 3500
      })
    setIsFetching(false)
  }
  return (
    <section>
      <form onSubmit={submitForm}>
        <button
          type="submit"
          className="btn btn-warning w-full"
        >
          Delete
        </button>
      </form>
    </section>
  )
}
