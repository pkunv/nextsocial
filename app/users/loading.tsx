export default async function LoadingUsers() {
  return (
    <span>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Loading user data...
      </h1>
      <span className="loading loading-spinner loading-md"></span>
    </span>
  )
}
