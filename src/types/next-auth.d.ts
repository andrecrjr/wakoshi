import { DefaultSession } from "next-auth";
import { UserWakatimeProfile} from "wakatime-next-auth";

export type accountTokenWakatimeType = {
      provider: 'wakatime',
      type: 'oauth',
      providerAccountId:string,
      access_token: string,
      refresh_token: string,
      uid: string,
      token_type: 'bearer',
      expires_at: number,
      scope: string
    }

declare module "next-auth" {
  interface Session {
    user?: UserWakatimeProfile & DefaultSession["user"];
    account?: accountTokenWakatimeType
  }
}