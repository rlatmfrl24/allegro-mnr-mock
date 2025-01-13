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
import { DamageRequestImageProps } from "@/util/typeDefs";
import Image from "next/image";
import DeleteIcon from "@/public/icon_delete.svg";
import { format } from "date-fns";

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

  function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  const captureDamageImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.multiple = true;
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const images = await Promise.all(
          Array.from(target.files).map(async (file) => {
            const src = URL.createObjectURL(file);
            const encodedImage = await getBase64(file);
            return {
              createdAt: new Date(),
              encodedImage,
              src,
            } as DamageRequestImageProps;
          })
        );
        currentRequestStore.setCurrent({
          ...currentRequestStore.current,
          images: [...currentRequestStore.current.images, ...images],
        });
      }
    };

    input.click();
  };

  const DamageImageCard = ({
    image,
    index,
  }: {
    image: DamageRequestImageProps;
    index: number;
  }) => {
    return (
      <div className="flex items-center gap-3 p-2 bg-white rounded-xl shadow-md">
        {image.src && (
          <Image
            src={image.src}
            alt="image"
            width="48"
            height="48"
            className="object-cover w-12 h-12 rounded-lg"
          />
        )}
        <div className="flex-1 flex flex-col gap-1">
          <span className="text-base font-semibold">{`Image ${
            index + 1
          }`}</span>
          <span className="text-xs text-gray-500">
            {format(image.createdAt, "dd-MM-yyyy | HH:mm:ss")}
          </span>
        </div>
        <Button
          className={styles.iconButton}
          onClick={() => {
            currentRequestStore.setCurrent({
              ...currentRequestStore.current,
              images: currentRequestStore.current.images.filter(
                (_, i) => i !== index
              ),
            });
          }}
        >
          <DeleteIcon />
        </Button>
      </div>
    );
  };

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
                  <ChevronDownIcon className="w-6 h-6" />
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
          </Field>
          <Legend className={classNames(styles.field, styles.legend)}>
            Images
          </Legend>
          <Button
            className="flex items-center justify-start w-full bg-blue-500 p-4 rounded-xl font-semibold text-white gap-2 hover:bg-blue-600"
            onClick={captureDamageImage}
          >
            <ImageIcon height="24" />
            Add New Image
          </Button>
          {currentRequestStore.current.images.map((image, index) => (
            <DamageImageCard key={index} image={image} index={index} />
          ))}

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
