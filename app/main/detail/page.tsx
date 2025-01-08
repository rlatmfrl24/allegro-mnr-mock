import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import styles from "../main.module.css";
import classNames from "classnames";
import { DamageRequestProps } from "@/util/typeDefs";
import ImageIcon from "@/public/icon_image.svg";
import TimeIcon from "@/public/icon_time.svg";
import LocationIcon from "@/public/icon_location.svg";
import EstimatedIcon from "@/public/icon_estimated.svg";
import ShopIcon from "@/public/icon_shop.svg";

export default function DetailPage({ type }: { type: string }) {
  switch (type) {
    case "edit":
      return <EditDetailContainer />;
    case "save":
      return <SaveDetailContainer />;
    case "sent":
      return <SentDetailContainer />;
    default:
      return <ErrorContainer />;
  }
}

const EditDetailContainer = () => {
  return (
    <>
      <div className="flex-1 overflow-auto px-5 py-6">
        <Fieldset className="flex flex-col gap-3">
          <Field>
            <Label className={classNames(styles.field, styles.label)}>
              Container No.
            </Label>
            <Input className={styles.input} />
          </Field>
          <Field>
            <Label className={classNames(styles.field, styles.label)}>
              Vendor Shop
            </Label>
            <Input className={styles.input} />
          </Field>
          <Legend className={classNames(styles.field, styles.legend)}>
            Images
          </Legend>
          <Button className="flex items-center justify-start w-full bg-blue-500 p-4 rounded-xl font-semibold text-white gap-2">
            <ImageIcon height="24" />
            Add New Image
          </Button>
          <Legend className={classNames(styles.field, styles.legend)}>
            Summary
          </Legend>
          <SummaryBox
            data={{
              containerNumber: "123123",
              vendorShop: "A Shop",
              estimatedPeriod: "1 week",
              location: { latitude: 0, longitude: 0 },
              createdAt: new Date(),
              images: [],
            }}
          />
        </Fieldset>
      </div>
      <footer className={classNames(styles.detail, styles.footer)}>
        <Button className={styles.bigButton}>Confirm</Button>
      </footer>
    </>
  );
};

const SaveDetailContainer = () => {
  return <div className="flex-1">save main</div>;
};

const SentDetailContainer = () => {
  return <div className="flex-1">sent main</div>;
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
      <span className={styles.value}>{data.vendorShop}</span>
      <span className={styles.label}>
        <EstimatedIcon />
        Estimated
      </span>
      <span className={styles.value}>{data.estimatedPeriod}</span>
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
      <span className={styles.value}>{data.createdAt.toISOString()}</span>
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
