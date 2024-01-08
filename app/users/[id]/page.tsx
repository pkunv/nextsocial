import FollowButton from "@/components/FollowButton/FollowButton"
import { prisma } from "@/lib/prisma"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } })
  return { title: `User profile of ${user?.name}` }
}

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } })
  if (!user) notFound()
  const { name, bio, image, birthDate, id } = user ?? {}
  const age = birthDate ? new Date().getFullYear() - new Date(birthDate!).getFullYear() : "n/a"

  return (
    <div className="prose w-1/2 card card-body">
      <h1>{name}</h1>

      <Image
        src={image ?? "/user.png"}
        alt={`${name}'s profile`}
        width="180"
        height="180"
      />
      <p>Age: {age}</p>
      <h3>Bio</h3>
      <p>{bio}</p>
      <FollowButton targetUserId={id} />
    </div>
  )
}
