import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "@/components/Rating/Rating";
import LoadingBox from "@/components/LoadingBox/LoadingBox";
import { ArrowBack } from "@mui/icons-material";
import { ProductType } from "@/types/types";
import styles from "./ProductPage.module.scss";
import { CartContext } from "@/components/Providers/CartProvider";

const ProductPage = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);
  const { id } = useParams();
  const { allCartItems, selectedCardItems, setSelectedCardItems } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    function getProductDetails(): void {
      setLoading(true);
      const productsDetails = allCartItems.find((card) => card._id === id);
      setProduct(productsDetails);
      setLoading(false);
    }
    getProductDetails();
  }, [id]);

  const addToCart = (): void => {
    const existitem = selectedCardItems.find((c) => c._id === id);
    if (existitem) {
      //we modify item quantity
      setSelectedCardItems(
        selectedCardItems.map((c) =>
          c === existitem ? { ...c, qty: c.qty + qty } : c
        )
      ); // we add item on cartItems list
    } else {
      setSelectedCardItems([...selectedCardItems, { ...product, qty: qty }]);
    }
    navigate(`/card`);
  };

  return (
    <div>
      {loading || !product ? (
        <LoadingBox />
      ) : (
        <div>
          <div onClick={() => navigate(-1)} className={styles.backRes}>
            <ArrowBack /> <span>Revenir aux résultats</span>
          </div>
          <div className={styles.row}>
            <div className={styles.col1}>
              <img className={styles.large} src={product.image} alt="" />
            </div>
            <div className={styles.col2}>
              <ul>
                <li className={styles.pdName}>{product.name}</li>
                <li className={styles.pdRating}>
                  <Rating rating={product.rating} numRev={product.numRev} />
                </li>
                <li className={styles.pdPrice}>{product.price}€</li>
                <li className={styles.pdDesc}>
                  Description :<p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className={styles.col3}>
              <div className={`${styles.card} ${styles.cardBody}`}>
                <ul>
                  <li>
                    <p>Montant total</p>
                    <div className={styles.price}>{product.price * qty}€</div>
                  </li>
                  <li>
                    <p>Stock</p>
                    {product.stock >= 10 ? (
                      <span className={styles.supplySuccess}>
                        Beaucoup de stock
                      </span>
                    ) : product.stock < 10 && product.stock > 0 ? (
                      <span className={styles.supplySuccess}>En stock</span>
                    ) : (
                      <span className={styles.supplyError}>
                        En rupture de stock
                      </span>
                    )}
                  </li>

                  {product.stock > 0 && (
                    <>
                      <li>
                        <p>Quantitée</p>
                        <div className={styles.qtySelect}>
                          <select
                            value={qty}
                            onChange={(e) => setQty(parseInt(e.target.value))}
                          >
                            {[...Array(product.stock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </li>
                      <li>
                        <button className="submit-btn" onClick={addToCart}>
                          Ajouter au panier
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
