"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "react-toastify"

export function PostForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFetching(true)

    const formElement = e.currentTarget

    const formData = new FormData(formElement)
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

    if (res.ok) {
      toast.success("You created a post successfully!", {
        autoClose: 1500
      })
      startTransition(() => {
        router.refresh()
      })
      // reset the form after successful submission
      formElement.reset()
    } else
      toast.error(`There is a problem with your request: ${res.statusText}`, {
        autoClose: 3500
      })
    setIsFetching(false)
  }

  return (
    <section className="my-2 w-1/2">
      <h2 className="text-4xl font-extrabold">Add a new post</h2>
      <form
        onSubmit={submitForm}
        className="form-control"
      >
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                className="label"
                htmlFor="title"
              >
                Title
              </label>
              <input
                aria-required="true"
                className="input input-bordered w-full max-w-xs"
                maxLength={50}
                minLength={3}
                name="title"
                required
                type="text"
              />
            </div>
          </div>
          <div>
            <label
              className="label"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              aria-required="true"
              className="textarea textarea-bordered w-full"
              cols={30}
              maxLength={10000}
              minLength={3}
              name="content"
              required
              rows={10}
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
    </section>
  )
}
