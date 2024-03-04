'use client'

import { SessionProvider, signIn } from "next-auth/react";
import Image from "next/image";
import User from "./components/Auth/UserSession";

export default function Home() {


  return (
    <SessionProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <User />
      <button onClick={(e)=>{
          signIn("wakatime")
        }}>
        Login Wakatime
      </button>
    </main>
    </SessionProvider>
  );
}
