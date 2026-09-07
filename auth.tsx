//handlers واکنش ها در پروژه مثل اشتباه وارد کردن اطلاعات یا اشتباه ثبت نام کردن
//auth اطلاعات رو مدیریت کنه یا همون احراز هویت
// providers مشحض میکنیم نحوه ورود به چه شکلی میباشد یعنی ایمیل میخواد یا نمیخواد
import NextAuth from "next-auth"

import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                if (
                    typeof credentials?.email !== "string" ||
                    typeof credentials?.password !== "string"
                ) {
                    return null
                }

                const response = await fetch(
                    `${process.env.STRAPI_URL}/api/auth/local`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            identifier: credentials.email,
                            password: credentials.password,
                        }),
                    },
                )
                if (!response.ok) {
                    return null
                }
                const data = await response.json()
                return {
                    id: String(data.user.id),
                    name: data.user.username,
                    email: data.user.email,
                    strapiToken: data.jwt, //اطلاعاتی که فرستاده را در اینجا ذخیره میکنیم
                    //استراپی یه strapitoken به ما میده
                }
            },
        }),
    ],
    //jwt که برای ما فرستاده یه سری اطلاعات داره من میخوام داخلش دوتا آیتم اضافه کنم به اسم آیدی د استراپی توکن
    callbacks: {
        async jwt({ token, user }) {
            console.log("BEFORE JWT:", token)
            console.log("USER:", user)
            if (user) {
                token.id = user.id!
                token.strapiToken = user.strapiToken
            }
            return token
        },
        //ما برای اولین بار زمانی که لاگین میشیم برای یکبار اطلاعات را استراپی پر میکند و میفرستد

        //اگر یوزر از قبل بوده باشه اگر ما تعریفی نکنیم برای ما یا null میزنه یا undefind
        //برای همین ما آیدی را برابر با استراپی توکن میکتیم

        async session({ session, token }) {
            console.log("session")
            console.log("SESSION BEFORE:", session)
            console.log("TOKEN:", token)

            session.user.id = token.id as string
            session.user.strapiToken = token.strapiToken as string

            console.log("SESSION AFTER:", session)

            return session
        },
    },
})