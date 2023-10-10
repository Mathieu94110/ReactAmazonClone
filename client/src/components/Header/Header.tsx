import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";
import { useWindowSize } from "@/hooks/useWindowDimensions";
import {
  ArrowDropDown,
  Headphones,
  PersonalVideo,
  PhoneIphone,
  LaptopMac,
  EarbudsBattery,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import styles from "./Header.module.scss";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, signout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { width } = useWindowSize();

  // creating ref and useEffect below in order to close dropdown on click outside
  const headerDropdownRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (headerDropdownRef.current.contains(e.target)) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.innerContent}>
          <div className={styles.headerBrand}>
            <Link to="/">Amazon Clone</Link>
          </div>
          <div className={styles.headerMain}>
            <div className={styles.searchBar}>
              <Search />
            </div>
            <Link to="/cart">
              <div className={styles.shoppingCartIcon}>
                {cartItems.length ? <span>{cartItems.length}</span> : null}
                <ShoppingCartOutlined sx={{ color: "white", fontSize: 25 }} />
              </div>
            </Link>
          </div>
          <div className={styles.headerDropdown} ref={headerDropdownRef}>
            <p onClick={() => setOpen(!open)}>
              {user.name}
              <ArrowDropDown />
            </p>
            {open ? (
              <ul className={`${styles.dropdownContent} ${styles.show}`}>
                <li onClick={() => setOpen(!open)}>
                  <Link to="/profile">Compte</Link>
                </li>
                <li onClick={() => setOpen(!open)}>
                  <Link to="/orderhistory">Historique des commandes</Link>
                </li>
                <li onClick={() => setOpen(!open)}>
                  <Link to="/" onClick={() => signout()}>
                    Se déconnecter
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>

        <div className={styles.categoryContainer}>
          <ul>
            <li>
              <Link to="/category/téléphones-mobiles">
                {width < 600 ? <PhoneIphone /> : "Téléphones mobiles"}
              </Link>
            </li>
            <li>
              <Link to="/category/ordinateurs-portables">
                {width < 600 ? <LaptopMac /> : "Ordinateurs portables"}
              </Link>
            </li>
            <li>
              <Link to="/category/télévisions">
                {width < 600 ? <PersonalVideo /> : "Télévisions"}
              </Link>
            </li>
            <li>
              <Link to="/category/accessoires-d_ordinateurs">
                {width < 600 ? <EarbudsBattery /> : "Accessoires d'ordinateurs"}
              </Link>
            </li>
            <li>
              <Link to="/category/écouteurs">
                {width < 600 ? <Headphones /> : "Écouteurs"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
