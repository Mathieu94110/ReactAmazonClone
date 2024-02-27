import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "@/components/CheckOutSteps/CheckoutSteps";
import styles from "./PaymentMethodPage.module.scss";

const PaymentMethod: React.FC = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<string>("PayPal");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    localStorage.setItem("payment-method", method);
    navigate("/placeholder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />

      <div className={styles.payMethodContainer}>
        <form className={styles.paymentForm} onSubmit={handleSubmit}>
          <div>
            <h1>Méthode de paiement</h1>
          </div>

          <div className={styles.selectMethodIp}>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>

          <div className={styles.selectMethodIp}>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>

          <div>
            <label />
            <button className="submit-btn" type="submit">
              Continuer
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentMethod;
