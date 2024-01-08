import Progress from "@/components/Progress"

export default async function Loading() {
  return (
    <span>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Loading...
      </h1>
      <Progress />
    </span>
  )
}
