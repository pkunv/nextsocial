import { User } from "@prisma/client"
import Link from "next/link"

interface Props {
  content: string | null
  createdAt: Date
  id: number
  slug: String | null
  title: String
  user: User
}

export default function PostCard({ content, createdAt, id, slug, title, user }: Props) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="transition ease-in-out delay-50 card bg-neutral shadow-xl hover:scale-110"
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content?.substring(0, 15)}...</p>
        <p>
          Author: {user.name} | Created at: {createdAt.toLocaleDateString()}
        </p>
      </div>
    </Link>
  )
}
