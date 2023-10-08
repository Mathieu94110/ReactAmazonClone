import { PropsWithChildren } from "react";
import styles from "./MessageBox.module.scss";
import { MessageBoxProps } from "@/types/types";

const MessageBox = (props: PropsWithChildren<MessageBoxProps>) => {
  return (
    <div
      className={`${styles.alert} ${
        props.variant === "success"
          ? styles.alertSuccess
          : props.variant === "danger"
          ? styles.alertError
          : styles.alertInfo
      }`}
    >
      {props.children}
    </div>
  );
};

export default MessageBox;
