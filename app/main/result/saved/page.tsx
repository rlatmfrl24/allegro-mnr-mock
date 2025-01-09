import SavedResultImage from "@/public/image_result_data_saved.svg";
import { Button } from "@headlessui/react";
import styles from "@/styles/main.module.css";
import classNames from "classnames";
import Link from "next/link";

export default function ResultPage() {
  return (
    <div className="flex flex-col h-full justify-center items-center px-11">
      <SavedResultImage />
      <h1 className="text-2xl font-semibold mt-6">Data Saved</h1>
      <p className="font-medium text-gray-400 text-center mt-2">
        Your Request saved
        <br /> You may check it from Main lists
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
