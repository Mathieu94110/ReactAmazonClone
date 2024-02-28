import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
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
            <NavLink to="/">Amazon Clone</NavLink>
          </div>
          <div className={styles.headerMain}>
            <div className={styles.searchBar}>
              <Search />
            </div>
            <NavLink to="/cart">
              <div className={styles.shoppingCartIcon}>
                {selectedCardItems.length ? (
                  <span>{selectedCardItems.length}</span>
                ) : null}
                <ShoppingCartOutlined sx={{ color: "white", fontSize: 25 }} />
              </div>
            </NavLink>
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
                    <NavLink to="/profile">Compte</NavLink>
                  </li>
                  <li onClick={() => setOpen(!open)}>
                    <NavLink to="/" onClick={() => signout()}>
                      Se déconnecter
                    </NavLink>
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
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : ""
                }
                to="/category/téléphones-mobiles"
              >
                {width < 600 ? <PhoneIphone /> : "Téléphones mobiles"}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : ""
                }
                to="/category/ordinateurs-portables"
              >
                {width < 600 ? <LaptopMac /> : "Ordinateurs portables"}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : ""
                }
                to="/category/télévisions"
                replace={true}
              >
                {width < 600 ? <PersonalVideo /> : "Télévisions"}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : ""
                }
                to="/category/accessoires-d_ordinateurs"
              >
                {width < 600 ? <EarbudsBattery /> : "Accessoires d'ordinateurs"}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : ""
                }
                to="/category/écouteurs"
              >
                {width < 600 ? <Headphones /> : "Écouteurs"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
