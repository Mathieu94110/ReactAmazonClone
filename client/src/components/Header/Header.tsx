import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowDropDown, Search } from "@mui/icons-material";
import styles from "./Header.module.scss";

const Header = () => {
  const [dropdown, setDropDown] = useState(false);
  const { user, signout } = useContext(AuthContext);
  const showDropDown = () => {
    if (dropdown) setDropDown(false);
    else setDropDown(true);
  };

  const [query, setQuery] = useState("");

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

          <ul className={styles.navLinks}>
            <li>
              <div className={styles.headerDropdown}>
                <p onClick={showDropDown}>
                  {user.name}
                  <ArrowDropDown />
                </p>

                <ul
                  className={
                    dropdown
                      ? `${styles.dropdownContent} ${styles.show}`
                      : `${styles.dropdownContent}`
                  }
                >
                  <li>
                    <Link to="/profile">Compte</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Historique des commandes</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={() => signout()}>
                      Se déconnecter
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.categoryContainer}>
          <ul>
            <li>
              <Link to="/category/mobile">Téléphones</Link>
            </li>
            <li>
              <Link to="/category/laptop">Ordinateurs</Link>
            </li>
            <li>
              <Link to="/category/monitor">Télévisions</Link>
            </li>
            <li>
              <Link to="/category/accessories">Accesoires d'ordinateurs</Link>
            </li>
            <li>
              <Link to="/category/earphones">Écouteurs</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
