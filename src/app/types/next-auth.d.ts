import { DefaultSession } from "next-auth";
import { UserProfile } from "./wakatimeAPI";


declare module "next-auth" {
  interface Session {
    user?: UserProfile & DefaultSession["user"];
  }
}