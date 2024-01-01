import { SignOutButton } from "@/components/buttons"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { ProfileForm } from "./ProfileForm"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const currentUserEmail = session.user?.email ?? ""
  const user = await prisma.user.findUnique({ where: { email: currentUserEmail } })

  return (
    <div className="w-1/2">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Dashboard
      </h1>
      <ProfileForm user={user} />
      <div className="divider"></div>
      <section>
        <SignOutButton />
      </section>
    </div>
  )
}
