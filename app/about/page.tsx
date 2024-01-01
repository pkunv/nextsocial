import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About NEXTsocial",
  description: "Simple social media web app, made using Next.JS, Tailwind CSS and Prisma."
}

export default async function About() {
  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        About
      </h1>
      <p>Simple social media web app, made using Next.JS, Tailwind CSS and Prisma.</p>
    </>
  )
}
