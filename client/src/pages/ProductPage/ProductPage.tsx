import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import styles from "./ProductPage.module.scss";
import { getProductDetails } from "../../apis/product";

interface ProductInterface {
  image: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  numRev: number;
  stock: number;
}

const ProductPage = (props) => {
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getProductsDetails() {
      setLoading(true);
      const productsDetails = await getProductDetails(productID);
      setProduct(productsDetails);
      setLoading(false);
    }
    getProductsDetails();
  }, []);

  const productID = props.match.params.id;

  const [qty, setQty] = useState(1);

  // const addToCart = () =>{
  //     props.history.push(`/cart/${productID}?qty=${qty}`)
  // }

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/" className={styles.backRes}>
            Back to result
          </Link>
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
                <li className={styles.pdPrice}>${product.price}</li>
                <li className={styles.pdDesc}>
                  Description :<p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className={styles.col3}>
              <div className={`${styles.card} ${styles.cardBody}`}>
                <ul>
                  <li>
                    <p>Total amount</p>
                    <div className={styles.price}>${product.price * qty}</div>
                  </li>
                  <li>
                    <p>Stock</p>
                    {product.stock > 10 ? (
                      <span className={styles.mSuccess}>In stock</span>
                    ) : product.stock < 10 && product.stock > 0 ? (
                      <span className={styles.mSuccess}>
                        Hurry! Few in stock
                      </span>
                    ) : (
                      <span className={styles.error}>Out of stock</span>
                    )}
                  </li>

                  {product.stock > 0 && (
                    <>
                      <li>
                        <p>Qty</p>
                        <div className={styles.qtySelect}>
                          <select value={qty} onChange={(e) => setQty(qty + 1)}>
                            <option>{qty}</option>
                          </select>
                        </div>
                      </li>
                      <li>
                        <button className={styles.addToCart}>
                          Add to cart
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
