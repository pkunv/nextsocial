"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export function SignInButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <span className="loading loading-spinner loading-md"></span>
  }
  if (status === "authenticated") {
    return (
      <Link
        href={"/dashboard"}
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
      </Link>
    )
  }

  return (
    <button
      className="btn btn-ghost mx-2 "
      id="sign-in"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  )
}

export function SignOutButton() {
  return (
    <button
      className="btn btn-warning w-full"
      onClick={() => {
        signOut()
      }}
    >
      Sign out
    </button>
  )
}
