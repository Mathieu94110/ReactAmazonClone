import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "@/components/MessageBox/MessageBox";
import { CartContext } from "@/components/Providers/CartProvider";
import { ArrowBack, Cancel } from "@mui/icons-material";
import styles from "./CartPage.module.scss";

const Cart = () => {
  const { selectedCardItems, setSelectedCardItems } = useContext(CartContext);
  const navigate = useNavigate();

  function removeItemFromCart(product): void {
    setSelectedCardItems(
      selectedCardItems.filter((c) => c._id !== product._id)
    );
  }

  function updateCartItemQty(item, qty): void {
    const selecteditem = selectedCardItems.find((c) => c._id === item._id);
    setSelectedCardItems(
      selectedCardItems.map((c) =>
        c === selecteditem ? { ...c, qty: qty } : c
      )
    );
  }

  function checkOut(): void {
    navigate("/shipping");
  }

  const numberOfProducts = selectedCardItems.reduce((a, c) => {
    return a + c.qty;
  }, 0);

  return (
    <div>
      <Link to="/" className={styles.backRes}>
        <ArrowBack /> <span>Revenir à l'accueil</span>
      </Link>
      <div className={styles.rowContainer}>
        <div className={styles.col4}>
          <h1>Panier</h1>
          {selectedCardItems.length === 0 ? (
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
              {selectedCardItems.map((item) => (
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
                  Prix total ( {numberOfProducts}{" "}
                  {numberOfProducts > 1 ? "produits" : "produit"} )
                </p>
                <p className={styles.price}>
                  {selectedCardItems
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
                  disabled={selectedCardItems.length === 0}
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
