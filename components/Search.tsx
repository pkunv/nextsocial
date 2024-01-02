"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export default function Search({
  search = true,
  searchBy = true
}: {
  search?: boolean
  searchBy?: boolean
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (!value) params.delete(name)
    switch (name) {
      case "q":
        params.set("q", value!)
        break
      case "searchBy":
        params.set("searchBy", value!)
        break
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <section className="card bg-neutral shadow-xl p-8 my-4 w-full text-center">
      <span>
        {search && (
          <input
            type="search"
            name="q"
            placeholder="Search..."
            className="input input-bordered"
            defaultValue={searchParams.get("q")?.toString()}
            onChange={(e) => {
              handleSearch(e.target.name, e.target.value)
            }}
          />
        )}
        {searchBy && (
          <>
            <label
              htmlFor="searchBy"
              className="mx-1"
            >
              Search by:
            </label>
            <select
              name="searchBy"
              className="input input-bordered"
              onChange={(e) => {
                handleSearch(e.target.name, e.target.value)
              }}
              defaultValue={searchParams.get("searchBy")?.toString()}
            >
              <option value="title">Title</option>
              <option value="content">Content</option>
              <option value="user">User</option>
            </select>
          </>
        )}
      </span>
    </section>
  )
}
