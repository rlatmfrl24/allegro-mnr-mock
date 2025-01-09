"use client";
import classNames from "classnames";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import BackIcon from "@/public/icon_back.svg";
import EstimatedIcon from "@/public/icon_estimated.svg";
import ExitIcon from "@/public/icon_exit.svg";
import ImageIcon from "@/public/icon_image.svg";
import LocationIcon from "@/public/icon_location.svg";
import ShopIcon from "@/public/icon_shop.svg";
import TimeIcon from "@/public/icon_time.svg";
import { useCurrentRequestState } from "@/store/detail.store";
import { DamageRequestProps } from "@/util/typeDefs";
import styles from "@/styles/main.module.css";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentRequestStore = useCurrentRequestState();

  const DetailHeader = ({
    type,
    ctNumber,
  }: {
    type?: string;
    ctNumber?: string;
  }) => {
    return (
      <header className="flex items-center justify-between px-2.5 py-2">
        <button className={styles.iconButton} onClick={() => router.back()}>
          <BackIcon />
        </button>
        {type === "edit" ? "Damage Info." : ctNumber || "-"}
        <button
          className={styles.iconButton}
          onClick={() => router.push("/main")}
        >
          <ExitIcon />
        </button>
      </header>
    );
  };

  return (
    <main className="w-full h-full flex flex-col max-w-lg mx-auto">
      <DetailHeader
        type={currentRequestStore.current.state}
        ctNumber={currentRequestStore.current.containerNumber}
      />
      {children}
    </main>
  );
}

export const SummaryBox = ({ data }: { data: DamageRequestProps }) => {
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
