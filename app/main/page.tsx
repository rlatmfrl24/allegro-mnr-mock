import Image from "next/image";

export default function Main() {
  return (
    <main className="w-full h-full flex flex-col">
      <header className="flex items-center justify-between p-4">
        <Image
          src="/logo-merged.svg"
          alt="Next.js logo"
          width={126}
          height={24}
          priority
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
      <div className="flex-1"></div>
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
        <FooterButton icon="/icon_footer_profile.svg" text="Progress" />
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
