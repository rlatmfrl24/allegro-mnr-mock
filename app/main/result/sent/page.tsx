import SentRequestImage from "@/public/image_result_request_sent.svg";
import { Button } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import styles from "@/styles/main.module.css";

export default function ResultPage() {
  return (
    <div className="flex flex-col h-full justify-center items-center px-11">
      <SentRequestImage />
      <h1 className="text-2xl font-semibold mt-6">Request Sent</h1>
      <p className="font-medium text-gray-400 text-center mt-2">
        Your request sent successfully
      </p>
      <div className="w-full flex mt-9">
        <Link href="/main" className="w-full">
          <Button className={classNames(styles.bigButton, "w-full")}>
            Done
          </Button>
        </Link>
      </div>
    </div>
  );
}
