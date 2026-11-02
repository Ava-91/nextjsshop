//T به معنی این مباشد که استراپی یه قولی به ما داده یا همان promise که نمیدانیم چه چیزی قراره برای ما تحویل دهد اطلاعات محصول یا اطلاعات مشتری یا هرچیز دیگری که تعریف کرده باشیم
export async function strapiFetch<T>(
    path: string,
    token: string,
    options: RequestInit = {},
) {
    const strapiUrl = process.env.STRAPI_URL
    if (!strapiUrl) {
        throw new Error("STRAPI_URL is not defined")
    }

    const headers = new Headers(options.headers)
    headers.set("Content-Type", "application/json")
    headers.set("Authorization", `Bearer ${token}`)//حمل کننده

    const response = await fetch(`${strapiUrl}${path}`, {
        ...options,
        headers,
    })
    if (response.status === 401) {
        throw new Error("strapi_token_expired")
    }
    if (!response.ok) {
        throw new Error(`strapi request failed: ${response.status}`)
    }
    return response.json() as Promise<T>
}
