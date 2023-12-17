import Welcome from "@/components/Welcome"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return session ? <main></main> : <Welcome />
}
