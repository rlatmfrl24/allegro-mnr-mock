"use client";

import { Button } from "@headlessui/react";
import styles from "@/styles/main.module.css";
import BackIcon from "@/public/icon_back.svg";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UploadPage() {
  const router = useRouter();

  const [files, setFiles] = useState<FileList | null>(null);

  const handleUpload = () => {
    console.log("upload");

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        setFiles(target.files);
      }
    };

    input.click();
  };

  useEffect(() => {
    if (files) {
      console.log(files);
    }
  }, [files]);

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
      <div>Recent</div>
      <div className="flex-1overflow-auto flex-1 overflow-auto">
        <div className="grid grid-cols-4">
          {files &&
            Array.from(files).map((file, index) => (
              <div
                key={index}
                className="relative w-full h-24 hover:opacity-80 cursor-pointer"
              >
                <Image
                  fill
                  src={URL.createObjectURL(file)}
                  alt="image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  objectFit="cover"
                />
              </div>
            ))}
        </div>
      </div>
      <footer className="flex items-center justify-center p-4 border-t border-gray-200">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.files);
          }}
        />
        <Button
          className={classNames(styles.outlinedButton, "w-full")}
          onClick={handleUpload}
        >
          Upload from library
        </Button>
      </footer>
    </div>
  );
}
