"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import NotificationIcon from "@/public/icon_notification.svg";
import MakeNewDocumentIcon from "@/public/icon_make_new_document.svg";
import ScanIcon from "@/public/icon_footer_scan.svg";
import { useCurrentRequestState } from "@/store/detail.store";
import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { useScanImageState } from "@/store/scan.store";
import { DamageRequestProps } from "@/util/typeDefs";
import { format } from "date-fns";
import ImageRequestDocument from "@/public/image_request_document.svg";

export default function Main() {
  const router = useRouter();
  const currentRequestStore = useCurrentRequestState();
  const scanImageStore = useScanImageState();
  const [currentRequest, setCurrentRequest] = useState<DamageRequestProps[]>(
    []
  );

  async function getRequests() {
    const response = await fetch("/api/request", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data");
      return null;
    }
  }
  useEffect(() => {
    getRequests().then((data) => {
      if (data) {
        const formatData = data.map(
          (request: {
            container_number: string;
            vendor_shop: string;
            longitude: number;
            latitude: number;
            created_at: string;
            estimated_period: number;
            state: string;
            images: string[];
          }) => {
            return {
              containerNumber: request.container_number,
              vendorShop: request.vendor_shop,
              location: {
                longitude: request.longitude,
                latitude: request.latitude,
              },
              createdAt: request.created_at,
              estimatedPeriod: request.estimated_period,
              state: request.state,
              images: request.images.map((image) => {
                return {
                  encodedImage: "",
                  createdAt: request.created_at,
                  src: image,
                };
              }),
            } as unknown as DamageRequestProps;
          }
        );
        setCurrentRequest(formatData);
      }
    });
  }, []);

  useEffect(() => {
    console.log("current request", currentRequest);
  }, [currentRequest]);

  useEffect(() => {
    console.log("reset current request");
    currentRequestStore.resetCurrent();
    scanImageStore.resetScanImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full h-full flex flex-col">
      <header className="flex items-center justify-between px-2.5 py-2">
        <Image
          src="/logo-merged.svg"
          alt="Next.js logo"
          width={144}
          height={24}
          priority
          className="px-2"
        />
        <button className="rounded-full p-2 hover:bg-gray-100">
          <NotificationIcon />
        </button>
      </header>
      <div className="flex flex-col flex-1 px-2 py-2">
        <button
          className="text-left flex items-center gap-2 m-3 p-4 text-base font-semibold leading-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => router.push("/main/detail/edit")}
        >
          <MakeNewDocumentIcon />
          Make New
        </button>
        <div className="flex items-center justify-between my-3 mx-3">
          <p className="text-sm font-bold">Recent Lists</p>
          <button className="text-xs">See All</button>
        </div>
        <div className="flex-grow h-0 overflow-auto flex flex-col gap-4 p-3">
          {currentRequest.length > 0 ? (
            <>
              {currentRequest.map((request, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white cursor-pointer"
                  style={{
                    boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="flex gap-2 text-base font-semibold">
                      <ImageRequestDocument />
                      {request.containerNumber}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {format(new Date(request.createdAt), "dd/MM/yyyy")}
                    </span>
                    <span className="text-xs text-gray-400">|</span>
                    <span
                      className={`text-xs text-gray-400 px-2 py-1 rounded-full ${
                        request.state === "save" ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    >
                      {request.state}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <footer className="flex px-2.5 py-2 border-t border-gray-200">
        <FooterButton icon="/icon_footer_lists.svg" text="Lists" />
        <FooterButton icon="/icon_footer_progress.svg" text="Progress" />
        <div className="w-full flex items-center justify-center">
          <Button
            className="flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white"
            onClick={() => router.push("/main/upload")}
          >
            <ScanIcon />
          </Button>
        </div>
        <FooterButton icon="/icon_footer_history.svg" text="History" />
        <FooterButton icon="/icon_footer_profile.svg" text="Profile" />
      </footer>
    </main>
  );
}

const FooterButton = ({ icon, text }: { icon: string; text: string }) => (
  <button className="flex flex-col items-center justify-center w-full p-2 gap-0.5 hover:bg-gray-100">
    <Image src={icon} alt={text} width={24} height={24} priority />
    <span className="text-xs text-gray-500">{text}</span>
  </button>
);

const EmptyState = () => (
  <div className="flex gap-2 flex-col items-center justify-center h-full rounded-lg border border-dashed border-cyan-400">
    <Image
      src="/image_empty_requests.svg"
      alt="Empty State"
      width={240}
      height={240}
      priority
    />
    <p className="text-2xl font-semibold">No Request yet</p>
    <p className="text-base text-gray-400 font-medium">
      Please add Request document
    </p>
  </div>
);
