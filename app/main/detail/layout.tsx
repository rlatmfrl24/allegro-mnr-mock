"use client";
import { useRouter } from "next/navigation";
import styles from "../main.module.css";
import DetailPage from "./page";
import BackIcon from "@/public/icon_back.svg";
import ExitIcon from "@/public/icon_exit.svg";
import { useCurrentRequestState } from "@/store/detail.store";

export default function DetailLayout() {
  const router = useRouter();
  const currentRequestStore = useCurrentRequestState();

  const DetailHeader = ({
    type,
    ctNumber,
  }: {
    type?: string;
    ctNumber?: string;
  }) => {
    return (
      <header className="flex items-center justify-between px-2.5 py-2">
        <button className={styles.iconButton} onClick={() => router.back()}>
          <BackIcon />
        </button>
        {type === "edit" ? "Damage Info." : ctNumber || "-"}
        <button
          className={styles.iconButton}
          onClick={() => router.push("/main")}
        >
          <ExitIcon />
        </button>
      </header>
    );
  };

  return (
    <main className="w-full h-full flex flex-col max-w-lg mx-auto">
      <DetailHeader
        type={currentRequestStore.current.state}
        ctNumber={currentRequestStore.current.containerNumber}
      />
      <DetailPage />
    </main>
  );
}
