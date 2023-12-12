import Welcome from "@/components/Welcome"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession()

  return session ? <main></main> : <Welcome />
}
