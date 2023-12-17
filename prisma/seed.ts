import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
  await prisma.post.deleteMany({ where: { user: { email: { contains: "example.com" } } } })
  await prisma.user.deleteMany({ where: { email: { contains: "example.com" } } })
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      bio: "I like turtles",
      birthDate: new Date("1998-01-01"),
      posts: {
        create: [{ content: "Hello World", published: true }]
      }
    }
  })
  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
      bio: "I grew up in the mountains.",
      birthDate: new Date("1987-12-20"),
      posts: {
        create: [
          {
            content: "Hello! This is my first post, made by me, Bob.",
            published: true
          },
          {
            content: "Second post. I am getting the hang of this now.",
            published: true
          }
        ]
      }
    }
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
