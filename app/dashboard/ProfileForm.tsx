"use client"

import { useState, useTransition } from "react"
import { toast } from "react-toastify"

export function ProfileForm({ user }: any) {
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFetching(true)

    const formData = new FormData(e.currentTarget)

    const body = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      birthDate: formData.get("birthDate"),
      image: formData.get("image")
    }

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok)
      toast.success("You updated your profile succesfully!", {
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
      <h2 className="text-4xl font-extrabold">Edit your profile</h2>
      <form
        onSubmit={updateUser}
        className="form-control"
      >
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="name"
                className="label"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name ?? ""}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <label
                htmlFor="age"
                className="label"
              >
                Birth date
              </label>
              <input
                type="date"
                name="birthDate"
                defaultValue={
                  user?.birthDate ? new Date(user?.birthDate).toISOString().split("T")[0] : ""
                }
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="bio"
              className="label"
            >
              Bio
            </label>
            <textarea
              name="bio"
              cols={30}
              rows={10}
              defaultValue={user?.bio ?? ""}
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="image"
              className="label"
            >
              Profile Image URL
            </label>
            <input
              type="text"
              name="image"
              defaultValue={user?.image ?? ""}
              className="input input-bordered w-full"
            />
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
