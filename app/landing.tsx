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
        width={180}
        height={38}
        priority
      />
      <Image
        src="/logo-text.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </main>
  );
}
