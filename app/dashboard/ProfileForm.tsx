"use client"

export function ProfileForm({ user }: any) {
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const body = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      age: formData.get("age"),
      image: formData.get("image")
    }

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    await res.json()
  }

  return (
    <div>
      <h2>Edit Your Profile</h2>
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
                Age
              </label>
              <input
                type="text"
                name="age"
                defaultValue={user?.age ?? 0}
                className="input input-bordered w-full max-w-xs"
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
          Save
        </button>
      </form>
    </div>
  )
}
