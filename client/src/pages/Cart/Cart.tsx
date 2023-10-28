import React, { useContext, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MessageBox from "@/components/MessageBox/MessageBox";
import { CartContext } from "@/components/Providers/CartProvider";
import { ArrowBack, Cancel } from "@mui/icons-material";
import { getProductDetails } from "../../apis/product";
import { CartItemsType } from "@/types/types";
import styles from "./Cart.module.scss";
const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const qty = searchParams.get("qty");
  const navigate = useNavigate();

  useEffect(() => {
    async function getCartItems(id): Promise<void> {
      const productsDetails = await getProductDetails(id);
      addToCart(productsDetails);
    }
    getCartItems(id);
  }, [id]);

  function addToCart(product: CartItemsType): void {
    const existitem = cartItems.find((c) => c._id === product._id);
    if (existitem) {
      //we modify item quantity
      setCartItems(
        cartItems.map((c) =>
          c === existitem ? { ...c, qty: c.qty + parseInt(qty) } : c
        )
      ); // we add item on cartItems list
    } else {
      setCartItems([...cartItems, { ...product, qty: parseInt(qty) }]);
    }
  }

  function removeItemFromCart(product): void {
    setCartItems(cartItems.filter((c) => c._id !== product._id));
  }

  function updateCartItemQty(item, qty): void {
    const selecteditem = cartItems.find((c) => c._id === item._id);
    setCartItems(
      cartItems.map((c) => (c === selecteditem ? { ...c, qty: qty } : c))
    );
  }

  function checkOut(): void {
    navigate("/shipping");
  }

  return (
    <div>
      <Link to="/" className={styles.backRes}>
        <ArrowBack /> <span>Revenir à l'accueil</span>
      </Link>
      <div className={styles.rowContainer}>
        <div className={styles.col4}>
          <h1>Panier</h1>
          {cartItems.length === 0 ? (
            <MessageBox>
              Le panier est vide
              <Link to="/">
                <span className={styles.continueShopping}>
                  Continuer vos achats
                </span>
              </Link>
            </MessageBox>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div className={styles.row1}>
                    <div className={styles.small}>
                      <img src={item.image} alt=""></img>
                    </div>

                    <div className={styles.min30}>
                      <Link to={`/products/product/${item._id}`}>
                        {item.name}
                      </Link>
                    </div>
                    <div className={styles.qtySelect}>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          updateCartItemQty(item, parseInt(e.target.value))
                        }
                      >
                        {[...Array(item.stock).keys()].map((x, i) => (
                          <option key={i} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p>{(item.price * item.qty).toFixed(2)}€</p>
                    <div className={styles.removeBtn}>
                      <button
                        type="button"
                        onClick={() => removeItemFromCart(item)}
                      >
                        <Cancel />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.col5}>
          <div className={`${styles.card} ${styles.cardBody}`}>
            <ul>
              <li>
                <p>
                  Prix total (
                  {cartItems.reduce((a, c) => {
                    return a + c.qty;
                  }, 0)}{" "}
                  produit(s)) :
                </p>
                <p className={styles.price}>
                  {cartItems
                    .reduce((a, c) => a + c.price * c.qty, 0)
                    .toFixed(2)}
                  €
                </p>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkOut}
                  className={styles.checkoutBtn}
                  disabled={cartItems.length === 0}
                >
                  Procéder au paiement
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
