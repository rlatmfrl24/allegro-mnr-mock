"use client";

import { Button } from "@headlessui/react";
import styles from "@/styles/main.module.css";
import BackIcon from "@/public/icon_back.svg";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUploadPicture from "@/public/image_upload_picture.svg";
import { useScanImageState, useUploadImageListState } from "@/store/scan.store";
import CameraIcon from "@/public/icon_camera.svg";

export default function UploadPage() {
  const router = useRouter();
  const scanImageStore = useScanImageState();
  const uploadImageListStore = useUploadImageListState();
  const images = uploadImageListStore.uploadImageList;

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        uploadImageListStore.setUploadImageList(
          Array.from(target.files).map((file) => URL.createObjectURL(file))
        );
      }
    };

    input.click();
  };

  return (
    <div className="flex flex-col h-full">
      <div
        aria-label="header"
        className="flex items-center justify-between px-2.5 py-2"
      >
        <Button className={styles.iconButton} onClick={() => router.back()}>
          <BackIcon />
        </Button>
        <h2 className="font-medium">Search with Pic</h2>
        <div className="w-14"></div>
      </div>
      <Button
        className={classNames(
          styles.bigButton,
          "m-5 flex items-center gap-2 justify-center"
        )}
        onClick={() => {
          router.push("/main/upload/camera");
        }}
      >
        <CameraIcon />
        Search by camera
      </Button>
      {images.length > 0 && <div>Recent</div>}
      <div className="flex-1 flex flex-col overflow-auto">
        {images.length > 0 ? (
          <div className="grid grid-cols-4">
            {Array.from(images).map((image, index) => (
              <div
                key={index}
                className="relative w-full h-24 hover:opacity-80 cursor-pointer"
                onClick={() => {
                  scanImageStore.setScanImage(image);
                  router.push("/main/upload/scan");
                }}
              >
                <Image
                  fill
                  src={image}
                  alt="image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyImageGrid />
        )}
      </div>
      <footer className="flex items-center justify-center px-5 py-4 border-t border-gray-200">
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

const EmptyImageGrid = () => {
  return (
    <div className="flex flex-col items-center justify-center border-dashed border-2 border-cyan-400 rounded-lg m-4 flex-1 gap-3">
      <ImageUploadPicture />
      <h2 className="text-2xl font-semibold">Upload Picture</h2>
      <p className="font-medium text-gray-400">
        Upload pictures from your library
      </p>
    </div>
  );
};
