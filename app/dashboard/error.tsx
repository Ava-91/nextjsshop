"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & {
   digest?: string// كد شناسه براى خطا // ميتواند باشد ميتواند نباشد 
  };
  reset: () => void;
}) {
  useEffect(() => {
    if (error.message === "strapi_token_expired") {
      signOut({
        callbackUrl: "/login",
      });
    }
  }, [error]);

  return (
    <main className="">
      <h1 className="">خطايى رخ داد</h1>
      <p className="">دريافت اطلاعات با مشكل مواجه شد</p>
      <button className="" onClick={() => reset()}>
        تلاش دوباره
      </button>
    </main>
  );
}