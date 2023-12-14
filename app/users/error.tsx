"use client" // Error components must be Client components

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Oops! We got a problem: {error.message}</h2>
      <button
        className="btn"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
