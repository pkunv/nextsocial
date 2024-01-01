"use client"
import { useRouter } from "next/navigation"

export function GoBackButton() {
  const router = useRouter()
  return (
    <button
      className="btn btn-primary w-full"
      onClick={() => {
        router.back()
      }}
    >
      Go back
    </button>
  )
}
