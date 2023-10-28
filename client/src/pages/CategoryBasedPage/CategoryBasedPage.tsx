import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "@/components/Product/Product";
import LoadingBox from "@/components/LoadingBox/LoadingBox";
import PriceCheckBox from "@/components/PriceCheckBox/PriceCheckBox";
import { getProductsList } from "../../apis/product";
import { prices } from "@/locales/priceRange";
import { CartItemsType } from "@/types/types";
import styles from "./CategoryBasedPage.module.scss";

const CategoryBasedPage = () => {
  const [productList, setProductList] = useState<CartItemsType[]>([]);
  const [range, setRange] = useState<[number, number]>([0, 50000]);
  const [checkedId, setCheckedId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getProducts(): Promise<void> {
      setLoading(true);
      const products = await getProductsList();
      setProductList(products);
      setLoading(false);
    }
    getProducts();
  }, []);

  const { cat } = useParams();

  const handleFilters = (filter: number): void => {
    const data = prices;
    let array: [number, number] = [0, 50000];

    for (let key in data) {
      if (data[key].id === filter) {
        array = data[key].array;
      }
    }
    setRange(array);
  };

  function formatedCat(cat): string {
    return cat.replaceAll("-", " ").replaceAll("_", "'");
  }

  function clearFilters(): void {
    setRange([0, 50000]);
    setCheckedId(0);
  }

  return (
    <div className={styles.searchPageContainer}>
      <div className={styles.filterOptionsContainer}>
        <button className="submit-btn" onClick={() => clearFilters()}>
          Effacer les filtres
        </button>
        <h3>Prix:</h3>

        <PriceCheckBox
          checkedId={checkedId}
          setCheckedId={(v) => setCheckedId(v)}
          list={prices}
          handleFilters={(filter) => handleFilters(filter)}
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
