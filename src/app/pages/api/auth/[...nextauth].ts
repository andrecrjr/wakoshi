import NextAuth from "next-auth"


// Crie um objeto de provedor para Wakatime
const wakatimeProvider = {
    id: "wakatime",
    name: "Wakatime",
    type: "oauth",
    version: "2.0",
    scope: "email,read_stats",
    token: "https://wakatime.com/oauth/token",
    authorization: "https://wakatime.com/oauth/authorize",
    userInfo: "https://wakatime.com/api/v1/users/current",
    profile(profile:{data:{id:string, email:string}}) {
      return {
        id: profile.data.id,
        email: profile.data.email,
      }
    },
    clientId: process.env.WAKATIME_CLIENT_ID,
    clientSecret: process.env.WAKATIME_CLIENT_SECRET
  }

export default NextAuth({
  providers: [
    {
      id: "wakatime",
      name: "Wakatime",
      type: "oauth",
      version: "2.0",
      scope: "email,read_stats",
      token: "https://wakatime.com/oauth/token",
      authorization: "https://wakatime.com/oauth/authorize",
      userInfo: "https://wakatime.com/api/v1/users/current",
      profile(profile:{data:{id:string, email:string}}) {
        return {
          id: profile.data.id,
          email: profile.data.email,
        }
      },
      clientId: process.env.WAKATIME_CLIENT_ID,
      clientSecret: process.env.WAKATIME_CLIENT_SECRET
    },
    ]
  // Você pode adicionar outros callbacks ou opções aqui
  // https://next-auth.js.org/configuration/options
})