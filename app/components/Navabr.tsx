import { auth } from "@/auth"
import LogoutButton from "./Logoutbutton"
import Link from "next/link"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="site-nav flex items-center justify-between">
      <Link href="/" className="nav-link">Main Page</Link>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <span className="nav-user">{session.user.name}</span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}