"use client";

import classNames from "classnames";
import { format } from "date-fns";

import DeleteIcon from "@/public/icon_delete.svg";
import EstimatedIcon from "@/public/icon_estimated.svg";
import ImageIcon from "@/public/icon_image.svg";
import LocationIcon from "@/public/icon_location.svg";
import ShopIcon from "@/public/icon_shop.svg";
import TimeIcon from "@/public/icon_time.svg";
import { useCurrentRequestState } from "@/store/detail.store";
import { DamageRequestProps } from "@/util/typeDefs";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";

import styles from "../main.module.css";

export default function DetailPage() {
  const type = useCurrentRequestState().current.state;

  switch (type) {
    case "edit":
      return <EditDetailContainer />;
    case "save":
    case "sent":
      return <SaveDetailContainer />;
    default:
      return <ErrorContainer />;
  }
}

const EditDetailContainer = () => {
  const currentRequestStore = useCurrentRequestState();

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
          className={styles.bigButton}
          onClick={() => {
            currentRequestStore.setCurrent({
              ...currentRequestStore.current,
              state: "save",
            });
          }}
        >
          Confirm
        </Button>
      </footer>
    </>
  );
};

const SaveDetailContainer = () => {
  const currentRequestStore = useCurrentRequestState();

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
          <Legend className={classNames(styles.field, styles.legend)}>
            Images
          </Legend>
        </Fieldset>
      </div>
      <footer className={classNames(styles.detail, styles.footer)}>
        <Button className={styles.iconButton}>
          <DeleteIcon />
        </Button>
        <div className="flex flex-1 gap-2">
          <Button className={styles.outlinedButton}>Save</Button>
          <Button className={styles.bigButton}>Send</Button>
        </div>
      </footer>
    </>
  );
};

const ErrorContainer = () => {
  return <div className="flex-1">error main</div>;
};

const SummaryBox = ({ data }: { data: DamageRequestProps }) => {
  return (
    <div className={classNames(styles.box, styles.shadow, styles.summary)}>
      <span className={styles.label}>
        <ShopIcon />
        MNR Vendor Shop
      </span>
      <span className={styles.value}>{data.vendorShop || "-"}</span>
      <span className={styles.label}>
        <EstimatedIcon />
        Estimated
      </span>
      <span className={styles.value}>{data.estimatedPeriod || "-"}</span>
      <span className={styles.label}>
        <LocationIcon />
        Location
      </span>
      <span className={styles.value}>
        {data.location.latitude}, {data.location.longitude}
      </span>
      <span className={styles.label}>
        <TimeIcon />
        Time
      </span>
      <span className={styles.value}>
        {format(data.createdAt, "dd/MM/yyyy | HH:mm:ss")}
      </span>
      <div className={styles.label}>
        <ImageIcon height="20" />
        Images
      </div>
      <span className={styles.value}>
        {`${data.images.length} images added`}
      </span>
    </div>
  );
};
