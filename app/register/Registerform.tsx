"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registerform() {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  async function handlesubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    seterror("");
    setloading(true);

    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        seterror(data.message || "registration failed.");
        return;
      }

      const loginresult = await signIn("credentials", {
        email, password, redirect: false,
      });

      if (!loginresult || loginresult.error) {
        router.push("/login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      seterror("error in reaching the server");
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="form-page">
      <form onSubmit={handlesubmit} className="form-box">
        <h1>register</h1>
        <div className="form-field">
          <label>username</label>
          <input type="text" value={username} onChange={(event) => setusername(event.target.value)} />
        </div>
        <div className="form-field">
          <label>email</label>
          <input type="email" value={email} onChange={(event) => setemail(event.target.value)} />
        </div>
        <div className="form-field">
          <label>password</label>
          <input type="password" value={password} onChange={(event) => setpassword(event.target.value)} />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={loading} className="form-submit">{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}