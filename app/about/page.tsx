import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "About NEXTsocial"
}

export default async function About() {
  return (
    <main className="prose lg:prose-xl">
      <h1>About</h1>
      <p>Simple social media web app, made using Next.JS, Tailwind CSS and Prisma.</p>
    </main>
  )
}
