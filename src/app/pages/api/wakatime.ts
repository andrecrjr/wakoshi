import { CredentialsConfig } from "next-auth/providers/credentials"
import { OAuthConfig } from "next-auth/providers/oauth"

export const wakatimeProvider:OAuthConfig<any> = {
      id: "wakatime",
      name: "WakaTime",
      type: "oauth",
      version: "2.0",
      clientId: process.env.WAKATIME_CLIENT_ID,
      clientSecret: process.env.WAKATIME_CLIENT_SECRET,
      authorization: "https://wakatime.com/oauth/authorize",
      token: "https://wakatime.com/oauth/token",
      profileUrl: "https://wakatime.com/api/v1/users/current",
      profile(profile:{id:string, username:string, email:string, avatar:string}) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.avatar
        }
      }
    }