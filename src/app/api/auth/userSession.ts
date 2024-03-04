import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";


export default async function Api(req:NextApiRequest, res:NextApiResponse){
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}