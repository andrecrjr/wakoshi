import NextAuth from "next-auth"

export default NextAuth({
  providers: [
    {
      id: "wakatime",
      name: "Wakatime",
      type: "oauth",
      version: "2.0",
      token: "https://wakatime.com/oauth/token",
      authorization: {url:"https://wakatime.com/oauth/authorize", params:
      {
        scope:"email,read_stats"
      }
    },
    userinfo: "https://wakatime.com/api/v1/users/current",
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