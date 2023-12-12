"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export function SignInButton() {
  const { data: session, status } = useSession()
  console.log(session, status)

  if (status === "loading") {
    return <span className="loading loading-spinner loading-md"></span>
  }
  if (status === "authenticated") {
    return (
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost m-1"
        >
          <Image
            src={session.user?.image ?? `/user.png`}
            width={32}
            height={32}
            alt="User profile picture"
            className="rounded-full"
          />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
    )
  }

  return (
    <button
      className="btn btn-ghost mx-2"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  )
}

export function SignOutButton() {
  return (
    <button
      onClick={() => {
        signOut()
      }}
    >
      Sign out
    </button>
  )
}
