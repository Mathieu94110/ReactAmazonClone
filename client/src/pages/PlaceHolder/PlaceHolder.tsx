import React, { useContext } from "react";
import CheckoutSteps from "../../components/CheckOutSteps/CheckoutSteps";
import { Link } from "react-router-dom";
import styles from "./PlaceHolder.module.scss";
import { AuthContext, CartContext } from "../../components/Context";

const PlaceOrder = () => {
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  let cart = {} as any;
  Object.assign(cart, {
    cartItems: [...cartItems],
    itemsPrice: null,
    shippingPrice: null,
    taxPrice: null,
  });

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

  const placeOrder = () => {
    console.log("place order");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <div className={styles.rowContainer}>
        <div className={styles.col6}>
          <ul>
            <li>
              <div className={styles.cardBody}>
                <h2>Acheteur</h2>
                <p>
                  <strong>Nom:</strong> {user.fullName}
                </p>
                <p>
                  <strong>Adresse: </strong> {user.address},{user.city},
                  {user.postalCode},{user.country}
                </p>
              </div>
            </li>

            <li>
              <div className={styles.cardBody}>
                <h2>Type de paiement</h2>
                <p>
                  <strong>Methode: </strong>{" "}
                  {localStorage.getItem("payment-method")} <br />
                </p>
              </div>
            </li>

            <li>
              <div className={styles.cardBody}>
                <h2>Articles</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className={`${styles.row1} ${styles.orderRow1}`}>
                        <div className={styles.small}>
                          <img src={item.image} alt=""></img>
                        </div>

                        <div className={styles.min30}>
                          <Link to={`/products/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <p>
                          {item.qty} x {item.price}€ = {item.price * item.qty}€
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.col7}>
          <div className={styles.cardBody}>
            <ul>
              <li>
                <h2>Récapitulatif de la commande</h2>
              </li>
              <li>
                <p>HT</p>
                <p>{cart.itemsPrice.toFixed(2) - cart.taxPrice.toFixed(2)}€</p>
              </li>
              <li>
                <p>Vos achats</p>
                <p>{cart.shippingPrice.toFixed(2)}€</p>
              </li>
              <li>
                <p>Taxe</p>
                <p>{cart.taxPrice.toFixed(2)}€</p>
              </li>
              <li>
                <p>
                  <strong>TTC</strong>
                </p>
                <p>
                  <strong>{cart.itemsPrice.toFixed(2)}€</strong>
                </p>
              </li>

              <li>
                <button
                  type="button"
                  onClick={placeOrder}
                  disabled={cart.cartItems.length === 0}
                  className={styles.placeorderBtn}
                >
                  Passer commande
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
