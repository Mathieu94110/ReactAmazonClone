import React, { useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks/windowDimensions";
import {
  ArrowDropDown,
  Search,
  Headphones,
  PersonalVideo,
  PhoneIphone,
  LaptopMac,
  EarbudsBattery,
} from "@mui/icons-material";
import styles from "./Header.module.scss";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { user, signout } = useContext(AuthContext);

  const { width } = useWindowSize();

  // creating ref and useEffect below in order to close dropdown on click outside
  const headerDropdownRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!headerDropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.addEventListener("mousedown", handler);
    };
  });

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.innerContent}>
          <div className={styles.brand}>
            <Link to="/">Amazon Clone</Link>
          </div>

          <div className={styles.searchBar}>
            <input
              className={styles.searchInput}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Chercher des produits"
              value={query}
            ></input>

            <div className={styles.searchBtn}>
              <Link to={`/searchresults/${query}`}>
                <Search />
              </Link>
            </div>
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
                {width < 600 ? <EarbudsBattery /> : "Télévisions"}
              </Link>
            </li>
            <li>
              <Link to="/category/écouteurs">
                {width < 600 ? <Headphones /> : "Télévisions"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
