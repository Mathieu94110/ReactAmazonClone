import styles from "./PriceCheckBox.module.scss";

const PriceCheckBox = (props) => {
  const handleToggle = (value) => {
    props.setChecked(value);
    props.handleFilters(value);
  };

  return (
    <div className={styles.priceRangeContainer}>
      {props.list.map((price, index) => (
        <span className={styles.priceRangeCheckbox} key={index}>
          <input
            type="radio"
            checked={props.checked === index}
            onChange={() => handleToggle(price.id)}
          />
          <label>{price.name}</label>
        </span>
      ))}
    </div>
  );
};

export default PriceCheckBox;