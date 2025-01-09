"use client";

import { useScanImageState } from "@/store/scan.store";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Camera, CameraType } from "react-camera-pro";

export default function CameraView() {
  const router = useRouter();
  const camera = useRef<CameraType | null>(null);
  const scanImageStore = useScanImageState();

  return (
    <div className="h-full flex flex-col bg-black">
      <div className="relative w-full h-full mt-24">
        <Camera
          ref={camera}
          errorMessages={{
            noCameraAccessible: "You need to allow camera access",
            permissionDenied: "Camera permission was denied",
            switchCamera: "Switching camera failed",
          }}
        />
      </div>
      <div className="flex justify-center bg-black h-24">
        <button
          onClick={() => {
            const photo = camera.current?.takePhoto();
            if (photo !== undefined) {
              scanImageStore.setScanImage(photo);
              scanImageStore.setCreatedAt(new Date());
            }
            router.push("/main/upload/scan");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="11" fill="white" />
            <circle cx="12" cy="12" r="10" fill="black" />
            <circle cx="12" cy="12" r="7" fill="white" />
            <circle
              cx="12"
              cy="12"
              r="11.8"
              fill="black"
              className="opacity-0 hover:opacity-40"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
