import { prisma } from "@/lib/prisma"
import { Metadata } from "next"
import Image from "next/image"

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
  if (!user) throw new Error("This user does not exist!")
  const { name, bio, image, birthDate, id } = user ?? {}
  const age = birthDate ? new Date().getFullYear() - new Date(birthDate!).getFullYear() : "n/a"

  return (
    <div className="prose">
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
    </div>
  )
}
//<FollowButton targetUserId={id} />
