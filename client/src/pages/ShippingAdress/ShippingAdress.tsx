import React, { useContext, useState } from "react";
import styles from "./ShippingAdress.module.scss";
import CheckoutSteps from "../../components/CheckOutSteps/CheckoutSteps";
import { updateUserProfile } from "../../apis/users";
import { AuthContext } from "../../components/Context/AuthContext";

const ShippingAddress = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState<number | null>(null);
  const [country, setCountry] = useState("");

  const { user } = useContext(AuthContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(postalCode);
    // if (password !== confirmpassword) {
    //   alert("Le mot de passe ne correspond pas!");
    // } else {
    try {
      const response = await updateUserProfile({
        userId: user._id,
        fullName,
        address,
        city,
        postalCode,
        country,
      });
      if (response.ok) {
        console.log("success");
        console.log(response.json());
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log("error");
    }
    // }
    // props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>

      <div className={styles.shippingFormContainer}>
        <form className={styles.shippingForm} onSubmit={submitHandler}>
          <h2 className="mb-10 text-primary">Adresse de livraison</h2>
          <div className={styles.formIpSecContainer}>
            <div className={styles.formIpSec}>
              <label htmlFor="fullName">Nom complet:</label>
              <input
                type="text"
                id="fullName"
                placeholder="Indiquer un nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              ></input>
            </div>

            <div className={styles.formIpSec}>
              <label htmlFor="address">Adresse:</label>
              <input
                type="text"
                id="address"
                placeholder="Entrer une adresse"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></input>
            </div>

            <div className={styles.formIpSec}>
              <label htmlFor="city">Ville:</label>
              <input
                type="text"
                id="city"
                placeholder="Entrer une ville"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              ></input>
            </div>

            <div className={styles.formIpSec}>
              <label htmlFor="postalcode">Code postal:</label>
              <input
                type="text"
                id="postalcode"
                placeholder="Entrer un code postal"
                value={postalCode}
                onChange={(e) => setPostalCode(Number(e.target.value))}
                required
              ></input>
            </div>

            <div className={styles.formIpSec}>
              <label htmlFor="country">Pays:</label>
              <input
                type="text"
                id="country"
                placeholder="Entrer un pays"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className={styles.continueBtnContainer}>
            <button type="submit" className={styles.continueBtn}>
              Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddress;
