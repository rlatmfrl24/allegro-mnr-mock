"use client";

import { useScanImageState } from "@/store/scan.store";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";

export default function CameraView() {
  const router = useRouter();
  const camera = useRef<CameraType | null>(null);
  const scanImageStore = useScanImageState();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  function ToggleFacingMode() {
    camera.current?.switchCamera();
  }

  return (
    <div className="h-full flex flex-col bg-black">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <span>
          {location.latitude}, {location.longitude}
        </span>

        <Button onClick={() => ToggleFacingMode()}>Swap</Button>
      </div>
      <div className="relative w-full h-full">
        <Camera
          ref={camera}
          errorMessages={{
            noCameraAccessible: "You need to allow camera access",
            permissionDenied: "Camera permission was denied",
            switchCamera: "Switching camera failed",
          }}
        />
      </div>
      <div className="flex items-center justify-center bg-black h-24">
        <Button
          onClick={() => {
            const photo = camera.current?.takePhoto();

            if (photo !== undefined) {
              scanImageStore.setScanImage(photo as string);
              scanImageStore.setCreatedAt(new Date());
              scanImageStore.setLocation(location.latitude, location.longitude);
            }
            router.push("/main/upload/scan");
          }}
          className="w-fit h-fit filter hover:brightness-75"
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
          </svg>
        </Button>
      </div>
    </div>
  );
}
