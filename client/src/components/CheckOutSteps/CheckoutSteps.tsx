import { CheckoutStepsProps } from "../../types/types";
import styles from "./CheckOutSteps.module.scss";

const CheckoutSteps = (props: CheckoutStepsProps) => {
  return (
    <div className={styles.stepsContainer}>
      <div className={props.step1 ? styles.active : ""}>Panier</div>
      <div className={props.step2 ? styles.active : ""}>Adresse</div>
      <div className={props.step3 ? styles.active : ""}>Paiement</div>
      <div className={props.step4 ? styles.active : ""}>
        En attente de paiement
      </div>
    </div>
  );
};

export default CheckoutSteps;
