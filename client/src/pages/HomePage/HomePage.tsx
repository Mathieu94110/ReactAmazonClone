import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductList from "../../components/ProductList/ProductList";
import Product from "../../components/Product/Product";
import { getProductsList } from "../../apis";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartItemsType } from "@/types/types";
import { settings, settings2 } from "../../locales/slidersConfig";
import styles from "./HomePage.module.scss";

const Home = () => {
  const [productList, setProductList] = useState<CartItemsType[]>([]);

  useEffect(() => {
    async function getProducts(): Promise<void> {
      const products = await getProductsList();
      setProductList(products);
    }
    getProducts();
  }, []);

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.bannerContainer}>
        <Slider {...settings}>
          <div className={styles.banners}>
            <img
              src="https://m.media-amazon.com/images/S/aplus-media/vc/342b936a-69f1-4e59-89ba-7ddb98c1acda.jpg"
              alt=""
            />
          </div>
          <div className={styles.banners}>
            <img
              src="https://cdn.shopify.com/s/files/1/1780/7915/files/Thermaltake_Level_20_RGB_Titanium_Gaming_Keyboard_From_The_Peripheral_Store_Banner_01.jpg?v=1598266526"
              alt=""
            />
          </div>
          <div className={styles.banners}>
            <img
              src="https://cdn.shopify.com/s/files/1/1780/7915/files/Game_Monitor_6a7a1deb-2d61-4307-99ac-f8c5a18d298f.jpg?8000210842524768871"
              alt=""
            />
          </div>
        </Slider>
      </div>

      <ProductList products={productList} />

      <div className={styles.homeProductSlider}>
        <h2 className={styles.secTitle}>Plus de produits</h2>
        <Slider {...settings2}>
          {productList.length > 0
            ? productList.map((product) => (
                <Product key={product._id} product={product} />
              ))
            : null}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
