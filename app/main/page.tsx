"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();

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
          <Image
            src="/icon_notification.svg"
            alt="Next.js logo"
            width={24}
            height={24}
            priority
          />
        </button>
      </header>
      <div className="flex flex-col flex-1 px-5 py-6">
        <button
          className="text-left flex items-center gap-2 p-4 text-base font-semibold leading-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => router.push("/main/detail?type=edit")}
        >
          <Image
            src="/icon_make_new_document.svg"
            alt="Search"
            width={24}
            height={24}
            priority
          />
          Make New
        </button>
        <div className="flex items-center justify-between my-3">
          <p className="text-sm font-bold">Recent Lists</p>
          <button className="text-xs">See All</button>
        </div>
        <div className="flex-grow h-0 overflow-auto">
          <EmptyState />
        </div>
      </div>
      <footer className="flex px-2.5 py-2 border-t border-gray-200">
        <FooterButton icon="/icon_footer_lists.svg" text="Lists" />
        <FooterButton icon="/icon_footer_progress.svg" text="Progress" />
        <div className="w-full flex items-center justify-center">
          <button className="flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white">
            <Image
              src="/icon_footer_scan.svg"
              alt="Scan"
              width={24}
              height={24}
              priority
            />
          </button>
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
