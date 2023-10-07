import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import { getProductsList } from "../../apis/product";
import PriceCheckBox from "../../components/PriceCheckBox/PriceCheckBox";
import { prices } from "../../locales/priceRange";
import { useParams } from "react-router-dom";
import styles from "./CategoryBasedPage.module.scss";

const CategoryBasedPage = () => {
  const [productList, setProductList] = useState([]);
  const [range, setRange] = useState<[number, number]>([0, 50000]);
  const [checked, setChecked] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const products = await getProductsList();
      setProductList(products);
      setLoading(false);
    }
    getProducts();
  }, []);

  const { cat } = useParams();

  const handleFilters = (filters) => {
    const data = prices;
    let array = [] as any;

    for (let key in data) {
      if (data[key].id === parseInt(filters, 10)) {
        array = data[key].array;
      }
    }
    setRange(array);
  };

  function formatedCat(cat) {
    return cat.replaceAll("-", " ").replaceAll("_", "'");
  }

  function clearFilters() {
    setRange([0, 50000]);
    setChecked(0);
  }

  return (
    <div className={styles.searchPageContainer}>
      <div className={styles.filterOptionsContainer}>
        <button
          className={styles.clearFilterBtn}
          onClick={() => clearFilters()}
        >
          Effacer les filtres
        </button>
        <h3>Prix:</h3>

        <PriceCheckBox
          checked={checked}
          setChecked={(v) => setChecked(v)}
          list={prices}
          handleFilters={(filters) => handleFilters(filters)}
        />
      </div>

      <div className={styles.searchPageProductContainer}>
        {loading && <LoadingBox />}

        {!loading ? (
          productList.length > 0 ? (
            <>
              <h2 className={styles.secTitle}>
                Produits dans la catégorie <span>{formatedCat(cat)}</span>
              </h2>
              <div className={styles.searchProductContainer}>
                {productList
                  .filter(
                    (product) =>
                      product.category
                        .toLowerCase()
                        .includes(formatedCat(cat)) &&
                      product.price <= range[1] &&
                      product.price >= range[0]
                  )
                  .map((filteredProduct, index) => (
                    <Product key={index} product={filteredProduct} />
                  ))}
              </div>
            </>
          ) : (
            <h3 className={styles.secTitle}>
              Aucun produit dans {formatedCat(cat)}
            </h3>
          )
        ) : null}
      </div>
    </div>
  );
};

export default CategoryBasedPage;
