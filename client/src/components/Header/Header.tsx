import { useState, useContext } from "react";
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
import { AuthContext } from "../Providers/AuthProvider";
import { CartContext } from "../Providers/CartProvider";
import styles from "./Header.module.scss";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, signout } = useContext(AuthContext);
  const { selectedCardItems } = useContext(CartContext);
  const { width } = useWindowSize();

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
            <Link to="/card">
              <div className={styles.shoppingCartIcon}>
                {selectedCardItems.length ? (
                  <span>{selectedCardItems.length}</span>
                ) : null}
                <ShoppingCartOutlined sx={{ color: "white", fontSize: 25 }} />
              </div>
            </Link>
          </div>
          <>
            {/* Here we display element below only if open is set to because of screen background of calc/} */}
            {open ? (
              <div onClick={() => setOpen(false)} className="calc"></div>
            ) : null}

            <div className={styles.headerDropdown}>
              <p
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {user.name}
                <ArrowDropDown />
              </p>
              {open ? (
                <ul className={`${styles.dropdownContent} ${styles.show}`}>
                  <li onClick={() => setOpen(!open)}>
                    <Link to="/profile">Compte</Link>
                  </li>
                  <li onClick={() => setOpen(!open)}>
                    <Link to="/" onClick={() => signout()}>
                      Se déconnecter
                    </Link>
                  </li>
                </ul>
              ) : null}
            </div>
          </>
          {/* </ClickOutside> */}
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
