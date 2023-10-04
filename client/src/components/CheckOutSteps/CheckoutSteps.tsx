import styles from "./CheckOutSteps.module.scss";

const CheckoutSteps = (props) => {
  return (
    <div className={styles.stepsContainer}>
      <div className={props.step1 ? styles.active : ""}>Se connecter</div>
      <div className={props.step2 ? styles.active : ""}>Achats</div>
      <div className={props.step3 ? styles.active : ""}>Paiement</div>
      <div className={props.step4 ? styles.active : ""}>
        En attente de paiement
      </div>
    </div>
  );
};

export default CheckoutSteps;
