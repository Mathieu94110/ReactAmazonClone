import { Link } from "react-router-dom";
import { cartItemsType } from "../../types/types";
import Rating from "../Rating/Rating";
import styles from "./Product.module.scss";

const Product = ({ product }: { product: cartItemsType }) => {
  return (
    <Link to={`/products/product/${product._id}`}>
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <img src={product.image} alt={product.name} />
        </div>
        <h2>{product.name}</h2>
        <Rating rating={product.rating} numRev={product.numRev} />
        <p>{product.price}€</p>
      </div>
    </Link>
  );
};

export default Product;
