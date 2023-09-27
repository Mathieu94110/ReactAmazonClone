import styles from "./ProductList.module.scss";
import Product from "../Product/Product";
import LoadingBox from "../LoadingBox/LoadingBox";

const ProductList = ({products}) => {
  return (
    <div className={styles.homeProductContainer}>
      {!products ? (
        <LoadingBox />
      )  : (
        <>
          <h2 className={styles.secTitle}>Products</h2>
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
