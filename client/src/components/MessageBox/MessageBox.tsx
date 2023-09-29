import styles from "./MessageBox.module.scss";

const MessageBox = (props) => {
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
