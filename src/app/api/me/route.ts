import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Server-side API route
 async function handler(req:NextApiRequest, res:NextApiResponse) {
  const data = await getServerSession(authOptions)
  console.log(data)
  
 return Response.json({"hello":"world"})
}

export { handler as GET }
