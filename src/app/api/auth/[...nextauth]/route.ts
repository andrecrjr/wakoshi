import NextAuth from "next-auth/next"

const handler = NextAuth({
  providers: [
    {
      id: "wakatime",
      name: "Wakatime",
      type: "oauth",
      version: "2.0",
      token: "https://wakatime.com/oauth/token",
      authorization: {url:"https://wakatime.com/oauth/authorize", params:
      {
        scope:"email,read_stats,read_summaries"
      }
    },
    checks:["state"],
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
    ], 
    secret: process.env.NEXTAUTH_SECRET,
    debug:true,
    callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('user', user, account, profile)
      return true
    },
    }
    }
  )

export { handler as GET, handler as POST}