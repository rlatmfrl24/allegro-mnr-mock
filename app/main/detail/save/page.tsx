"use client";

import { useCurrentRequestState } from "@/store/detail.store";
import {
  Fieldset,
  Field,
  Label,
  Input,
  Legend,
  Button,
} from "@headlessui/react";
import classNames from "classnames";
import styles from "@/styles/main.module.css";
import DeleteIcon from "@/public/icon_delete.svg";
import { SummaryBox } from "../layout";
import { useRouter } from "next/navigation";
import ChevronDownIcon from "@/public/icon_chevron_down.svg";
import { useState } from "react";
import Image from "next/image";

const SaveDetailContainer = () => {
  const currentRequestStore = useCurrentRequestState();
  const router = useRouter();
  const [isImageListOpen, setIsImageListOpen] = useState(true);

  async function handleSave() {
    const response = await fetch("/api/request", {
      method: "POST",
      body: JSON.stringify(currentRequestStore.current),
    });

    if (response.ok) {
      console.log("Request saved");
    } else {
      console.error("Failed to save request");
    }
  }

  return (
    <>
      {currentRequestStore.current.state === "sent" && (
        <div>This request is already sent</div>
      )}
      <div className="flex-1 overflow-auto px-5 py-6">
        <Fieldset className="flex flex-col gap-3">
          <Field>
            <Label className={classNames(styles.field, styles.label)}>
              Container No.
            </Label>
            <Input
              className={styles.input}
              defaultValue={currentRequestStore.current.containerNumber}
              onInput={(e) => {
                currentRequestStore.setCurrent({
                  ...currentRequestStore.current,
                  containerNumber: e.currentTarget.value,
                });
              }}
            />
          </Field>
          <Legend className={classNames(styles.field, styles.legend)}>
            Summary
          </Legend>
          <SummaryBox data={currentRequestStore.current} />
          <div className="flex items-center justify-between">
            <Legend className={classNames(styles.field, styles.legend)}>
              Images
            </Legend>
            <Button
              className={`w-4 h-4 ${
                isImageListOpen
                  ? "transform transition-transform duration-300 ease-in-out"
                  : "rotate-180 transition-transform duration-300 ease-in-out"
              }`}
              onClick={() => setIsImageListOpen(!isImageListOpen)}
            >
              <ChevronDownIcon />
            </Button>
          </div>
          {isImageListOpen && (
            <div className="grid grid-cols-2 gap-2">
              {currentRequestStore.current.images.map((image, index) => (
                <div key={index} className="w-full flex flex-col gap-1">
                  {image.src && (
                    <div className="w-full h-52 relative">
                      <Image
                        src={image.src}
                        alt={`Image ${index + 1}`}
                        layout="fill"
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <span className="text-base font-semibold">{`Image ${
                    index + 1
                  }`}</span>
                </div>
              ))}
            </div>
          )}
        </Fieldset>
      </div>
      <footer className={classNames(styles.detail, styles.footer)}>
        <Button className={styles.iconButton}>
          <DeleteIcon />
        </Button>
        <div className="flex flex-1 gap-2">
          <Button
            className={classNames(styles.outlinedButton, "basis-1/2")}
            onClick={async () => {
              await handleSave();
              // router.push("/main/result/saved");
            }}
          >
            Save
          </Button>
          <Button
            className={classNames(styles.bigButton, "basis-1/2")}
            onClick={() => {
              router.push("/main/result/sent");
            }}
          >
            Send
          </Button>
        </div>
      </footer>
    </>
  );
};

export default SaveDetailContainer;
