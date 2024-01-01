"use client"

import { Post } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "react-toastify"

export function PostUpdateForm({ post }: { post: Post }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFetching(true)

    const formData = new FormData(e.currentTarget)

    const body = {
      title: formData.get("title"),
      content: formData.get("content"),
      id: post.id
    }

    const res = await fetch("/api/post", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      let post = await res.json()
      toast.success("You updated your post succesfully!", {
        autoClose: 1500
      })
      router.replace(`/blog/${post.slug}/manage`)
    } else
      toast.error(`There is a problem with your request: ${res.statusText}`, {
        autoClose: 3500
      })
    setIsFetching(false)
  }

  return (
    <div>
      <h2 className="text-4xl font-extrabold">Update this post</h2>
      <form
        onSubmit={updateUser}
        className="form-control"
      >
        <div>
          <div>
            <label
              htmlFor="title"
              className="label"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={post.title ?? ""}
              className="input input-bordered w-full max-w-xs"
              required
              aria-required="true"
              minLength={3}
              maxLength={50}
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="label"
            >
              Content
            </label>
            <textarea
              name="content"
              cols={30}
              rows={10}
              defaultValue={post.content ?? ""}
              className="textarea textarea-bordered w-full"
              required
              aria-required="true"
              maxLength={10000}
              minLength={3}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4 w-full"
        >
          Save {isMutating && <span className="loading loading-spinner-small"></span>}
        </button>
      </form>
    </div>
  )
}
