"use client";

import { Button } from "@headlessui/react";
import styles from "@/styles/main.module.css";
import BackIcon from "@/public/icon_back.svg";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import ImageGrid from "./image-grid";

export default function UploadPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <div
        aria-label="header"
        className="flex items-center justify-between px-2.5 py-2"
      >
        <Button className={styles.iconButton} onClick={() => router.back()}>
          <BackIcon />
        </Button>
        <h2>Search with Pic</h2>
        <div className="w-14"></div>
      </div>
      <Button className={classNames(styles.bigButton, "m-5")}>
        Search by camera
      </Button>
      <ImageGrid />
      <footer className="flex items-center justify-center p-4 border-t border-gray-200">
        <Button className={classNames(styles.outlinedButton, "w-full")}>
          Upload from library
        </Button>
      </footer>
    </div>
  );
}
