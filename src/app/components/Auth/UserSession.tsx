import { getCurrentUser } from '@/app/api/auth/userSession'
import { useSession } from 'next-auth/react'

export default async function User() {
  const data = await getCurrentUser()
  console.log(data)
  if(!!data)
    return (
      <p>
        {JSON.stringify(data)}
      </p>
  )
}