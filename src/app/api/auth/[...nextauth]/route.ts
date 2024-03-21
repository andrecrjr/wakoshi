import { RootUserProfile, UserProfile } from "@/types/wakatimeAPI";
import { tokenConverter } from "@/utils";
import axios from "axios";
import { NextAuthOptions, User } from "next-auth";
import WakatimeProvider from "wakatime-next-auth";
import NextAuth from "next-auth/next"


export const authOptions:NextAuthOptions = NextAuth({
  providers: [WakatimeProvider({
        clientId:process.env.WAKATIME_CLIENT_ID!,
        clientSecret:process.env.WAKATIME_CLIENT_SECRET!,
        authorization: {
        params: {
          scope: "email,read_stats,read_summaries", // DON'T FORGET this is Required scopes in the code to work
        }
      }})
    ], 
    secret: process.env.NEXTAUTH_SECRET,
    debug:process.env.NODE_ENV !== "production",
    callbacks: {
      async signIn() {
        return true
      },
      //jwt is the first callback tthats called when the session iss uodated
      async jwt({ token, account, user }) {
        // add user data only when updates the session (click in sign in on front-end)
        user && (token.user = user);
       return Promise.resolve(token);
     },
      async session({session, token, user}) {
       const userData = token.user;
       //vberify if data that comes from jwt
        if(userData){
            session.user = userData as UserProfile
        }
      return session
    },
    },
    session:{
      strategy: "jwt"
    }
    }
  )

export { authOptions as GET, authOptions as POST}
