import { auth } from "auth"
import SessionData from "./Session"

export default async function Page() {
  const session = await auth()
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">React Server Component Usage</h1>

      <SessionData session={session} />
    </div>
  )
}