import SavedResultImage from "@/public/image_result_data_saved.svg";
import { Button } from "@headlessui/react";
import styles from "@/styles/main.module.css";

export default function ResultPage() {
  return (
    <div className="flex flex-col h-full justify-center items-center px-11">
      <SavedResultImage />
      <h1>Data Saved</h1>
      <p>Your Request saved You may check it from Main lists</p>
      <div className="w-full flex mt-9">
        <Button className={styles.bigButton}>Done</Button>
      </div>
    </div>
  );
}
