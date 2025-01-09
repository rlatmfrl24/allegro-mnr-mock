"use client";
import classNames from "classnames";
import ImageIcon from "@/public/icon_image.svg";
import { useCurrentRequestState } from "@/store/detail.store";
import {
  Button,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";

import { SummaryBox } from "../layout";
import { useRouter } from "next/navigation";
import styles from "@/styles/main.module.css";
import { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import ChevronDownIcon from "@/public/icon_chevron_down.svg";

const EditDetailContainer = () => {
  const currentRequestStore = useCurrentRequestState();
  const router = useRouter();
  const [vendorQuery, setVendorQuery] = useState("");

  const vendorList = useMemo(() => {
    return Array.from({ length: 20 }).map(() => faker.company.name());
  }, []);

  const filteredVendorList = useMemo(() => {
    return vendorQuery === ""
      ? vendorList
      : vendorList.filter((vendor) =>
          vendor.toLowerCase().includes(vendorQuery.toLowerCase())
        );
  }, [vendorList, vendorQuery]);

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
          <Field className="relative">
            <Label className={classNames(styles.field, styles.label)}>
              Vendor Shop
            </Label>
            <Combobox
              onChange={(value: string) => {
                currentRequestStore.setCurrent({
                  ...currentRequestStore.current,
                  vendorShop: value,
                });
              }}
            >
              <div className="relative">
                <ComboboxInput
                  className={styles.input}
                  onInput={(e) => {
                    setVendorQuery(e.currentTarget.value);
                  }}
                />
                <ComboboxButton className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                  <ChevronDownIcon />
                </ComboboxButton>
              </div>
              <ComboboxOptions
                anchor="bottom"
                className="w-[var(--input-width)] bg-white border empty:invisible p-2"
              >
                {filteredVendorList.map((vendor) => (
                  <ComboboxOption
                    key={vendor}
                    value={vendor}
                    className="data-[focus]:bg-blue-100"
                    onClick={() => {
                      currentRequestStore.setCurrent({
                        ...currentRequestStore.current,
                        vendorShop: vendor,
                      });
                    }}
                  >
                    {vendor}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
            {/* <Input
              className={styles.input}
              defaultValue={currentRequestStore.current.vendorShop}
              onInput={(e) => {
                currentRequestStore.setCurrent({
                  ...currentRequestStore.current,
                  vendorShop: e.currentTarget.value,
                });
              }}
            /> */}
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
