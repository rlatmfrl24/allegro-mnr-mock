"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import styles from "../main.module.css";

export default function DetailLayout() {
  const query = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    console.log("query", query);
  }, [query]);

  const DetailHeader = ({ type, reqId }: { type?: string; reqId?: string }) => {
    return (
      <header className="flex items-center justify-between px-2.5 py-2">
        <button className={styles.iconButton} onClick={() => router.back()}>
          <Image
            src="/icon_back.svg"
            alt="Back"
            width={24}
            height={24}
            priority
          />
        </button>
        {type === "edit" ? "Damage Info." : reqId || "-"}
        <button
          className={styles.iconButton}
          onClick={() => router.push("/main")}
        >
          <Image
            src="/icon_exit.svg"
            alt="Exit"
            width={24}
            height={24}
            priority
          />
        </button>
      </header>
    );
  };

  return (
    <main className="w-full h-full flex flex-col max-w-lg mx-auto">
      <DetailHeader
        type={query.get("type") || ""}
        reqId={query.get("reqId") || ""}
      />
      <div className="flex-1">body</div>
      <footer>footer</footer>
    </main>
  );
}
