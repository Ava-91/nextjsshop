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

  async function handlesubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();//معمولا به صورت پیش فرض یه کارهایی مثل رفرش کردن ما با این دستور جلوگیری میکنیم از انجام کارهای پیش فرض
    seterror("");
    setloading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,//همین جا بمون نرو یجای دیگه هدایت نکن به صفحه دیگه
    });

    setloading(false);

    if (!result || result.error) {
      seterror("email or password is incorrect knucklehead");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }
  return(
    <form onSubmit={handlesubmit} className="">
      <h1>login</h1>
      <div className="">
        <label className="">email</label>
        <input type="email" className="" value={email} onChange={(event)=>setemail(event.target.value)}/>
      </div>
      <div className="">
        <label className="">password</label>
        <input type="password" className="" value={password} onChange={(event)=>setpassword(event.target.value)}/>
      </div>
      {error && (
        <>
          <p className="">{error}</p>
        </>
      )}
      <button type="submit" disabled={loading} className="">{loading ? "ورود" : "... ورود"}</button>
    </form>
  )
}