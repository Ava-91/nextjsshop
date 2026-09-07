import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/login" })} className="bg-pink-700 border-2 p-3 m-3 rounded-2xl">
      Logout
    </button>
  )
}