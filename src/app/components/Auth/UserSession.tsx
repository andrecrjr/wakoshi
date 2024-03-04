import { useSession } from 'next-auth/react'

export default function User() {
  const { data:session } = useSession()
  console.log(session)
  return (
    <div>
      {session && <p className='text-white'>Olá, {session?.user?.name}</p>}
    </div>
  )
}