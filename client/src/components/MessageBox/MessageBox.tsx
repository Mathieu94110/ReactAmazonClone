import styles from "./MessageBox.module.scss";

const MessageBox = (props) => {
  return (
    <div className={`${styles.alert + "-" + props.variant || "info"}`}>
      {props.children}
    </div>
  );
};

export default MessageBox;
