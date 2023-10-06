import React, { useState } from "react";
import CheckoutSteps from "../../components/CheckOutSteps/CheckoutSteps";
import styles from "./PaymentMethod.module.scss";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("PayPal");

  const submitMethod = (e) => {
    e.preventDefault();

    console.log("payment method");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />

      <div className={styles.payMethodContainer}>
        <form className={styles.paymentForm} onSubmit={submitMethod}>
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
            ></input>
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
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>

          <div>
            <label />
            <button className={styles.submitBtn} type="submit">
              Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
