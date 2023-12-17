import { useEffect, useContext, useState } from "react";
import CheckoutSteps from "@/components/CheckOutSteps/CheckoutSteps";
import { Link } from "react-router-dom";
import { CartContext } from "@/components/Providers/CartProvider";
import styles from "./PlaceHolderPage.module.scss";
import { getCurrentUser } from "@/apis/auth";
import { UserType, placeHolderCart } from "@/types/types";
import LoadingBox from "@/components/LoadingBox/LoadingBox";

const PlaceOrder = () => {
  const [user, setUser] = useState<null | UserType>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedCardItems } = useContext(CartContext);
  let cart = {} as placeHolderCart;

  useEffect(() => {
    async function getUserInfo() {
      setLoading(true);
      const userInfo = await getCurrentUser();
      setUser(userInfo);
      setLoading(false);
    }
    getUserInfo();
  }, []);

  Object.assign(cart, {
    selectedCardItems: [...selectedCardItems],
    itemsPrice: null,
    shippingPrice: null,
    taxPrice: null,
  });

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.selectedCardItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  const placeOrder = () => {
    alert("Achat effectué !");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <LoadingBox />
        </div>
      ) : (
        <div className={styles.rowContainer}>
          <div className={styles.col6}>
            <ul>
              <li>
                <div className={styles.cardBody}>
                  <h2>Acheteur</h2>
                  <p>
                    <strong>Nom:</strong> {user?.fullName}
                  </p>
                  <p>
                    <strong>Adresse: </strong> {user?.address},{user?.city},
                    {user?.postalCode},{user?.country}
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
                    {cart.selectedCardItems.map((item) => (
                      <li key={item._id}>
                        <div className={`${styles.row1} ${styles.orderRow1}`}>
                          <div className={styles.small}>
                            <img src={item.image} alt=""></img>
                          </div>

                          <div className={styles.min30}>
                            <Link to={`/products/product/${item._id}`}>
                              {item.name}
                            </Link>
                          </div>

                          <p>
                            {item.qty} x {item.price}€ = {item.price * item.qty}
                            €
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
                  <p>
                    {Number(cart.itemsPrice.toFixed(2)) -
                      Number(cart.taxPrice.toFixed(2))}
                    €
                  </p>
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
                    disabled={cart.selectedCardItems.length === 0}
                    className={styles.placeorderBtn}
                  >
                    Passer commande
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
