import { DefaultSession } from "next-auth"
 //برای اینکه نخواهیم اطلاعات قبلی از بین برود از این روش استفاده میکنیم و میگیم قبلی ها بمونه یه آیدی هم بهش اصافه کن
declare module "next-auth" { //توسعه دادن یک بخش از یک واحد کلی
    interface Session {
        user: {
            id: string
            strapiToken: string
        } & DefaultSession["user"]
    }

    interface User {
        strapiToken: string
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        id: string
        strapiToken: string
    }
}