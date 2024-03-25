import { DefaultSession } from "next-auth";
import { UserWakatimeProfile} from "wakatime-next-auth";
import { AllHeartBeatData, IAllTimeDataUser } from "./wakatimeTypes";

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

export interface UserWakoshiSessionData extends UserWakatimeProfile{
  allTime?: IAllTimeDataUser,
  heartBeats?: IHeartBeatData[] | []
} 

declare module "next-auth" {
  interface Session {
    user?: UserWakoshiSessionData & DefaultSession["user"] ;
  }
}