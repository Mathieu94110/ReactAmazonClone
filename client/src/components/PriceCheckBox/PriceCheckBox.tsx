import { PriceCheckBoxProps } from "@/types/types";
import styles from "./PriceCheckBox.module.scss";

const PriceCheckBox = (props: PriceCheckBoxProps) => {
  const handleToggle = (value: number): void => {
    props.setCheckedId(value);
    props.handleFilters(value);
  };

  return (
    <div className={styles.priceRangeContainer}>
      {props.list.map((price, index) => (
        <span className={styles.priceRangeCheckbox} key={index}>
          <input
            type="radio"
            checked={props.checkedId === index}
            onChange={() => handleToggle(price.id)}
          />
          <label>{price.name}</label>
        </span>
      ))}
    </div>
  );
};

export default PriceCheckBox;
