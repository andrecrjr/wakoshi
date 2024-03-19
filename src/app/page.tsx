'use client'

import { SessionProvider, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import User from "./components/Auth/UserSession";

export default function Home() {

  const data = useSession()
  console.log(data)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
     { data.status !== "authenticated" &&  data.status !== "loading"   && <button onClick={(e)=>{
        signIn("wakatime")
      }}>
        Login Wakatime
      </button>}
          <p>{data.data?.user?.name}</p>
    </main>
  );
}
