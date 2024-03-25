import { NextAuthOptions } from "next-auth";
import WakatimeProvider, { UserWakatimeProfile } from "wakatime-next-auth";
import NextAuth from "next-auth/next"
import { accountTokenWakatimeType } from "@/types/next-auth";
import axios from 'axios'
import { AllHeartBeatData, IAllTimeDataUser, IHeartBeatData } from "@/types/wakatimeTypes";
import { fetchHeartbeatsForNumberOfDays } from "@/app/services/Wakatime";
import { calcularProdutividade } from "@/utils";


export const authOptions:NextAuthOptions = NextAuth({
  providers: [WakatimeProvider({
        clientId:process.env.WAKATIME_CLIENT_ID!,
        clientSecret:process.env.WAKATIME_CLIENT_SECRET!,
        authorization: {
            url:"https://wakatime.com/oauth/authorize?response_type=code",
            params: {
              scope: "email,read_stats,read_summaries,read_heartbeats", // DON'T FORGET this is Required scopes in the code to work
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
        user && (token.user = user, token.accountToken=account);
       return Promise.resolve(token);
     },
      async session({session, token, user}) {
        // data from server side
        const userData = token.user  as UserWakatimeProfile;
        const userToken = token.accountToken as accountTokenWakatimeType
        const api = "https://api.wakatime.com/api/v1/users/current/"

        const {data:allTime} = await axios.get<IAllTimeDataUser>(`${api}all_time_since_today`, {headers:{
          "Authorization":`Bearer ${userToken.access_token}`
        }});
        const heartbeats:IHeartBeatData[] = await fetchHeartbeatsForNumberOfDays(userToken.access_token)
        console.log(calcularProdutividade(heartbeats), "linhas por hora")

          if(userData){
              session.user = {...userData, heartBeats:heartbeats, allTime:allTime}
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
