import Product from "../Product/Product";
import LoadingBox from "../LoadingBox/LoadingBox";
import { CartItemsType } from "@/types/types";
import styles from "./ProductList.module.scss";

const ProductList = ({ products }: { products: CartItemsType[] }) => {
  return (
    <div className={styles.homeProductContainer}>
      {!products ? (
        <LoadingBox />
      ) : (
        <>
          <h2 className={styles.secTitle}>Produits</h2>
          <div className={styles.productContainer}>
            {products.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
