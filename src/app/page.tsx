'use client'

import { IHeartBeatData } from "@/types/wakatimeTypes";
import { signIn, useSession } from "next-auth/react";


export default function Home() {

  const data = useSession()

  
  return (
    <main className="flex min-h-screen flex-col items-center">
     { data.status !== "authenticated" &&  data.status !== "loading"   && <button onClick={(e)=>{
        signIn("wakatime")
      }}>
        Login Wakatime
      </button>}
          <p>{data.data?.user?.username}</p>
          <p>{data.data?.user?.full_name}</p>
          <ol>
            {data.data?.user?.heartBeats?.map((item:IHeartBeatData)=>{
            return (<li key={item.id}>{item.project} - {item.category} - {item.created_at}</li>)
          })}</ol>
    </main>
  );
}
