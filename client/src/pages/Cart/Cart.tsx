import React, { useContext, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MessageBox from "../../components/MessageBox/MessageBox";
import { ArrowBack, Cancel } from "@mui/icons-material";
import styles from "./Cart.module.scss";
import { getProductDetails } from "../../apis/product";
import { CartContext } from "../../components/Context/CartContext";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const qty = searchParams.get("qty");
  const navigate = useNavigate();

  console.log(id);

  function addToCart(product, quantity) {
    console.log("HereTwo= ", product, quantity);
    const existitem = cartItems.find((c) => c._id === product._id);
    if (existitem) {
      setCartItems(
        cartItems.map((c) =>
          c === existitem ? { ...c, qty: c.qty + quantity } : c
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: quantity }]);
    }
  }
  function updateQtyCartItem(product, quantity) {
    const selecteditem = cartItems.find((c) => c._id === product._id);
    setCartItems(
      cartItems.map((c) => (c === selecteditem ? { ...c, qty: quantity } : c))
    );
  }

  function removeItemFromCart(product) {
    console.log("Here Two= ", product);
    setCartItems(cartItems.filter((c) => c._id !== product._id));
  }

  useEffect(() => {
    if (id) {
      async function getCartItems(id) {
        const productsDetails = await getProductDetails(id);
        console.log(productsDetails);
        addToCart(productsDetails, Number(qty));
      }
      getCartItems(id);
    }
  }, [id, qty]);

  const checkOut = () => {
    navigate("/shipping");
  };

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
              Le panier est vide <Link to="/">Continuer vos achats</Link>
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
                          updateQtyCartItem(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option value={x + 1}>{x + 1}</option>
                        ))}
                      </select>
                    </div>
                    <p>{item.price * Number(qty)}€</p>
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
                  }, 0)}
                  produits) :
                </p>
                <p className={styles.price}>
                  {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}€
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
