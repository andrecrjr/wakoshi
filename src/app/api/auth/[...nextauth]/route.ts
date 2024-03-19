import { RootUserProfile, UserProfile } from "@/app/types/wakatimeAPI";
import { tokenConverter } from "@/utils";
import axios from "axios";
import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next"


export const authOptions:NextAuthOptions = NextAuth({
  providers: [
    {
      id: "wakatime",
      name: "Wakatime",
      type: "oauth",
      clientId: process.env.WAKATIME_CLIENT_ID,
      clientSecret: process.env.WAKATIME_CLIENT_SECRET,
      version: "2.0",
      token: {url:"https://wakatime.com/oauth/token",
      async request(context) {
        const response = await axios.post("https://wakatime.com/oauth/token",
              {...context.params, redirect_uri:context.provider.callbackUrl},
            );
            const tokenWaka = tokenConverter(response.data)
        return {tokens:tokenWaka}
      }, 
      params:{
        client_id:process.env.WAKATIME_CLIENT_ID,
        client_secret:process.env.WAKATIME_CLIENT_SECRET,
        grant_type:"authorization_code"
      }},
      authorization: {url:"https://wakatime.com/oauth/authorize?response_type=code", params:
      {
        scope:"email,read_stats,read_summaries",
        "grant_type":"authorization_code"
      }
    },
    userinfo: {
      async request(context){
        const response = await axios.get("https://wakatime.com/api/v1/users/current", {
          headers: {Authorization: `Bearer ${context.tokens.access_token}`}
        })
        return response.data
      }
    },
    idToken:false,
    profile(profile) {
      const data: UserProfile = profile.data
      console.log(data)
      return data
    },
    accessTokenUrl: "https://wakatime.com/oauth/token",
    },

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
        //user && (token.user = user);
        console.log(user)
       return Promise.resolve(token);
     },
      async session({session, token, user}) {
       //const userData = token.user;
       //verify if data that comes from jwt
       /* if(userData){
            session.user = userData as UserProfile
        }*/
      return session
    },
    },
    session:{
      strategy: "jwt"
    }
    }
  )

export { authOptions as GET, authOptions as POST}
