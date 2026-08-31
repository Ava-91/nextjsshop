import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            strapiToken: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        strapiToken: string
    }
}