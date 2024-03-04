'use client'

import { SessionProvider, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import User from "./components/Auth/UserSession";

export default function Home() {

  const data = useSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={(e)=>{
        signIn("wakatime")
      }}>
        Login Wakatime
      </button>
          <p>{data.data?.user?.username}</p>
    </main>
  );
}
