import { Follows } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface Props {
  id: string
  name: string | null
  birthDate: Date | null
  image: string | null
  followedBy: Array<Follows>
  userId: string | null
}

export default function UserCard({ id, name, birthDate, image, followedBy, userId }: Props) {
  const age = birthDate ? new Date().getFullYear() - new Date(birthDate!).getFullYear() : "n/a"
  const followedByUser = followedBy.some((follow) => follow.followerId === userId)

  return (
    <Link
      href={`/users/${id}`}
      className="transition ease-in-out delay-50 card bg-neutral shadow-xl hover:scale-105"
    >
      <div className="card-body">
        <Image
          src={image ?? "/user.png"}
          alt={`${name}'s profile`}
          width="64"
          height="64"
          className="rounded-full"
        />
        <h2 className="card-title">{name}</h2>
        <p>Age: {age}</p>
        {followedByUser ? <p>You follow that person!</p> : null}
      </div>
    </Link>
  )
}
