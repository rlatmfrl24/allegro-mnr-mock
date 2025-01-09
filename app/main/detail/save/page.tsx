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
import styles from "../../main.module.css";
import DeleteIcon from "@/public/icon_delete.svg";
import { SummaryBox } from "../layout";

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

export default SaveDetailContainer;
