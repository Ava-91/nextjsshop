"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Loginform() {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  async function handlesubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    seterror("");
    setloading(true);

    const result = await signIn("credentials", {
      email, password, redirect: false,
    });

    setloading(false);

    if (!result || result.error) {
      seterror("email or password is incorrect knucklehead");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="form-page">
      <form onSubmit={handlesubmit} className="form-box">
        <h1>login</h1>
        <div className="form-field">
          <label>email</label>
          <input type="email" value={email} onChange={(event)=>setemail(event.target.value)}/>
        </div>
        <div className="form-field">
          <label>password</label>
          <input type="password" value={password} onChange={(event)=>setpassword(event.target.value)}/>
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={loading} className="form-submit">{loading ? "ورود" : "... ورود"}</button>
      </form>
    </div>
  )
}