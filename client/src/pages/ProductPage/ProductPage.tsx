import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import { getProductDetails } from "../../apis/product";
import { ArrowBack } from "@mui/icons-material";
import styles from "./ProductPage.module.scss";

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

const ProductPage = () => {
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getProductsDetails() {
      setLoading(true);
      const productsDetails = await getProductDetails(id);
      setProduct(productsDetails);
      setLoading(false);
    }
    getProductsDetails();
  }, [id]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  const [qty, setQty] = useState(1);

  return (
    <div>
      {loading || !product ? (
        <LoadingBox />
      ) : (
        <div>
          <Link to="/" className={styles.backRes}>
            <ArrowBack /> <span>Revenir aux résultats</span>
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
                    {product.stock > 10 ? (
                      <span className={styles.mSuccess}>En stock</span>
                    ) : product.stock < 10 && product.stock > 0 ? (
                      <span className={styles.mSuccess}>Beaucoup de stock</span>
                    ) : (
                      <span className={styles.error}>En rupture de stock</span>
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
                        <button className={styles.addToCart}>
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
