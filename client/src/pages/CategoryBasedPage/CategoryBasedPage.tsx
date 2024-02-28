import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "@/components/Product/Product";
import PriceCheckBox from "@/components/PriceCheckBox/PriceCheckBox";
import { prices } from "@/locales/priceRange";
import styles from "./CategoryBasedPage.module.scss";
import { CartContext } from "@/components/Providers/CartProvider";
import { CartItemsType } from "@/types/types";

const CategoryBasedPage = () => {
  const [range, setRange] = useState<[number, number]>([0, 50000]);
  const [checkedId, setCheckedId] = useState<number>(0);
  const { allCartItems } = useContext(CartContext);

  const { cat } = useParams<string>();

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
  function filteredProducts(): CartItemsType[] {
    return allCartItems.filter(
      (product) =>
        product.category.toLowerCase().includes(formatedCat(cat)) &&
        product.price <= range[1] &&
        product.price >= range[0]
    );
  }

  console.log(range);
  console.log("filtered =", filteredProducts());
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
        {filteredProducts().length ? (
          <>
            <h2 className={styles.secTitle}>
              Produits dans la catégorie <span>{formatedCat(cat)}</span>
            </h2>
            <div className={styles.searchProductContainer}>
              {filteredProducts().map((filteredProduct, index) => (
                <Product key={index} product={filteredProduct} />
              ))}
            </div>
          </>
        ) : (
          <h3 className={styles.secTitle}>
            Aucun <span className="secondary"> {formatedCat(cat)}</span> à{" "}
            {range[0] !== 851
              ? String(range[0]) + "-" + String(range[1])
              : "plus de 851"}
            euros
          </h3>
        )}
      </div>
    </div>
  );
};

export default CategoryBasedPage;
