import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const data = await req.json()
  // Convert the date string to a Date object, prisma requires this
  data.birthDate = new Date(data.birthDate).toISOString()

  const user = await prisma.user.update({
    where: { email: currentUserEmail },
    data
  })

  return NextResponse.json(user)
}
