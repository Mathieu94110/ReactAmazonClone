import { Loop } from "@mui/icons-material";
import styles from "./LoadingBox.module.scss";

const LoadingBox = () => {
  return (
    <div className={styles.loadingBox}>
      <Loop />
    </div>
  );
};

export default LoadingBox;
