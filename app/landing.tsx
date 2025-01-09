"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Landing() {
  // after 3 seconds, redirect to the login page
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }, []);

  return (
    <main className="h-full flex flex-col justify-center items-center gap-5">
      <Image
        src="/logo-mnr.svg"
        alt="Next.js logo"
        width={160}
        height={134}
        priority
      />
      <Image
        src="/logo-text.svg"
        alt="Next.js logo"
        width={155}
        height={20}
        priority
      />
    </main>
  );
}
