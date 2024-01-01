import { User } from "@prisma/client"
import Link from "next/link"

interface Props {
  content: string
  createdAt: Date
  id: number
  slug: String | null
  title: String
  user: User
  currentUserId: String | null
}

export default function PostCard({
  content,
  createdAt,
  id,
  slug,
  title,
  user,
  currentUserId
}: Props) {
  return (
    <article className="card bg-neutral shadow-xl p-8">
      <h3 className="card-title text-3xl font-bold">{title}</h3>
      <span className="text-sm bg-neutral m-2">
        {user.name} | {createdAt.toLocaleDateString()}
      </span>
      <p>
        {content.substring(0, 32)}
        {content.length > 32 ? "..." : null}
      </p>
      <div className="card-actions mt-2">
        {currentUserId === user.id && <EditPostButton slug={slug} />}
        <Link
          href={`/blog/${slug}`}
          className="btn btn-sm btn-primary"
        >
          Read more
        </Link>
      </div>
    </article>
  )
}

function EditPostButton({ slug }: { slug: String | null }) {
  return (
    <Link
      href={`/blog/${slug}/manage`}
      className="btn btn-sm btn-secondary"
    >
      Edit
    </Link>
  )
}
