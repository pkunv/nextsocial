import { SignInButton } from "@/components/buttons"
import Image from "next/image"
import Link from "next/link"

export default function NavMenu() {
  return (
    <nav className="navbar bg-base-100 mb-2 sticky top-0">
      {/* mobile nav menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/blog"}>Blog</Link>
            </li>
            <li>
              <Link href={"/users"}>Users</Link>
            </li>
            <li>
              <SignInButton />
            </li>
          </ul>
        </div>
        <Link
          href={"/"}
          className="btn btn-ghost text-xl"
        >
          <Image
            src="/next.svg"
            width={216}
            height={30}
            alt="Next.js Logo"
          />
          social
        </Link>
      </div>
      {/* desktop nav menu */}
      <div className="navbar-end hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <Link href={"/about"}>About</Link>
          </li>
          <li>
            <Link href={"/blog"}>Blog</Link>
          </li>
          <li>
            <Link href={"/users"}>Users</Link>
          </li>
        </ul>
        <SignInButton />
      </div>
    </nav>
  )
}
