import { auth } from "@/auth"
import LogoutButton from "./Logoutbutton"
import Link from "next/link"
export default async function Navbar() {
  const session = await auth()
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="font-semibold">
        Main Page
      </Link>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <span className="text-gray-600">
              {session.user.name}
            </span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}