'use client'

import { SessionProvider, signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={(e)=>{
          signIn("wakatime")
        }}>
        Login Wakatime
      </button>
    </main>
  );
}
