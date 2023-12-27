"use client"

import { useState, useTransition } from "react"
import { toast } from "react-toastify"

export function PostForm() {
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFetching(true)

    const formData = new FormData(e.currentTarget)

    const body = {
      title: formData.get("title"),
      content: formData.get("content")
    }

    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok)
      toast.success("You created a post successfully!", {
        autoClose: 1500
      })
    else
      toast.error(`There is a problem with your request: ${res.statusText}`, {
        autoClose: 3500
      })
    setIsFetching(false)
  }

  return (
    <div>
      <h2>Add a new post</h2>
      <form
        onSubmit={submitForm}
        className="form-control"
      >
        <div>
          <div className="grid grid-cols-2 gap-2">
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
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
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
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-4 w-full"
        >
          Create {isMutating && <span className="loading loading-spinner-small"></span>}
        </button>
      </form>
    </div>
  )
}
