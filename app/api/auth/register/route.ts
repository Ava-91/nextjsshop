import { NextResponse } from "next/server"
// یک ابزاری هست که می‌توانیم با آن به وسیله API پیام دریافت و ارسال کنیم
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, email, password } = body
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        { message: "Something in the form is not quite right. Naturally." },
        { status: 400 }
      )
    }
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    )
    const data = await response.json()
    if (!response.ok) {
      return NextResponse.json(
        {
          message: data?.error?.message || "Registration did not work. The server has opinions.",
        },
        {
          status: response.status,
        }
      )
    }

    return NextResponse.json(data, {
      status: 201,
    })
  } catch (error) {//دوست try هست برخورد خطاها رو انجام میده یا اگر کد نتونست اجرا بشه اطلاع میده
    return NextResponse.json(
      {
        message: "The server seems to be unavailable. Excellent timing.",
      },
      {
        status: 500,
      }
    )
  }
}