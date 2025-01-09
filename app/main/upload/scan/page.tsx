"use client";

import { useScanImageState } from "@/store/scan.store";
import { Button, Input } from "@headlessui/react";
import Image from "next/image";
import styles from "@/styles/main.module.css";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackIcon from "@/public/icon_back.svg";
import { useCurrentRequestState } from "@/store/detail.store";

export default function ScanResultPage() {
  const currentRequestStore = useCurrentRequestState();
  const [containerNumber, setContainerNumber] = useState("");
  const scanImage = useScanImageState().scanImage;
  const router = useRouter();

  useEffect(() => {
    if (!scanImage) {
      router.push("/main/upload/camera");
    }
  }, [router, scanImage]);

  return (
    <div className="relative flex flex-col items-center justify-end h-full">
      {scanImage && typeof scanImage === "string" && (
        <Image
          src={scanImage}
          fill
          objectFit="cover"
          alt="Scan Image"
          // add black overlay to image
          className="filter brightness-50"
        />
      )}
      <div className="z-10 bg-white w-full h-fit rounded-t-3xl flex flex-col items-center">
        <div className="w-14 h-1 rounded-full bg-gray-600 mt-3"></div>
        <div className="flex px-5 justify-between w-full mt-5">
          <Button onClick={() => router.push("/main/upload")}>
            {scanImage && typeof scanImage === "string" ? (
              <Image
                src={
                  typeof scanImage === "string"
                    ? scanImage
                    : "/back-disabled.svg"
                }
                width={24}
                height={24}
                quality={30}
                className="rounded-full w-10 h-10 border-2 border-blue-500"
                objectFit="cover"
                alt="Back"
              />
            ) : (
              <BackIcon />
            )}
          </Button>
          <div className="flex gap-2">
            <Button
              className={classNames(styles.outlinedButton, "w-32")}
              onClick={() => router.push("/main/upload/camera")}
            >
              Take again
            </Button>
            <Button
              disabled={!containerNumber}
              className={classNames(styles.bigButton, "w-24")}
              onClick={() => {
                currentRequestStore.setCurrent({
                  ...currentRequestStore.current,
                  containerNumber: containerNumber,
                });
                router.push("/main/detail/edit");
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
        <div className="flex w-full">
          <Input
            defaultValue={containerNumber}
            className={classNames(styles.input, "mx-5 my-4 flex-1")}
            onInput={(e) => setContainerNumber(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
}
