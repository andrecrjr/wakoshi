
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'

export default async function User() {
  const data = await getServerSession(authOptions)
  console.log(data)
  if(!!data)
    return (
      <p>
        {JSON.stringify(data)}
      </p>
  )
}