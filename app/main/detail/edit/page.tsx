"use client";
import classNames from "classnames";
import ImageIcon from "@/public/icon_image.svg";
import { useCurrentRequestState } from "@/store/detail.store";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";

import { SummaryBox } from "../layout";
import { useRouter } from "next/navigation";
import styles from "@/styles/main.module.css";

const EditDetailContainer = () => {
  const currentRequestStore = useCurrentRequestState();
  const router = useRouter();

  return (
    <>
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
          <Field>
            <Label className={classNames(styles.field, styles.label)}>
              Vendor Shop
            </Label>
            <Input
              className={styles.input}
              defaultValue={currentRequestStore.current.vendorShop}
              onInput={(e) => {
                currentRequestStore.setCurrent({
                  ...currentRequestStore.current,
                  vendorShop: e.currentTarget.value,
                });
              }}
            />
          </Field>
          <Legend className={classNames(styles.field, styles.legend)}>
            Images
          </Legend>
          <Button className="flex items-center justify-start w-full bg-blue-500 p-4 rounded-xl font-semibold text-white gap-2 hover:bg-blue-600">
            <ImageIcon height="24" />
            Add New Image
          </Button>
          <Legend className={classNames(styles.field, styles.legend)}>
            Summary
          </Legend>
          <SummaryBox data={currentRequestStore.current} />
        </Fieldset>
      </div>
      <footer className={classNames(styles.detail, styles.footer)}>
        <Button
          disabled={
            !currentRequestStore.current.containerNumber ||
            !currentRequestStore.current.vendorShop
          }
          className={classNames(styles.bigButton, "flex-1")}
          onClick={() => {
            currentRequestStore.setCurrent({
              ...currentRequestStore.current,
              state: "save",
            });
            router.push("/main/detail/save");
          }}
        >
          Confirm
        </Button>
      </footer>
    </>
  );
};

export default EditDetailContainer;
