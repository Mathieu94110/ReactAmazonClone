import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import styles from "./SearchInput.module.scss";

const SearchInput = ({ query, setQuery, handleSearch, products }) => {
  const [dropdDownOpen, setDropDownOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    let query = e.currentTarget.value;
    setQuery(query);
    if (query.length > 0) {
      handleSearch(query.toLowerCase());
      setDropDownOpen(true);
    }
  };

  return (
    <div className={styles.searchInputFormContainer}>
      <form className={styles.searchInputForm}>
        <div style={{ display: "flex" }}>
          <input
            className={styles.searchInput}
            onChange={handleChange}
            placeholder="Chercher des produits"
            value={query}
          />

          <div className={styles.searchBtn}>
            <Link to={`/`}>
              <Search />
            </Link>
          </div>
        </div>
      </form>
      {products.length > 0 && query && dropdDownOpen ? (
        <>
          {/* Other way to detect click outside*/}
          <div onClick={() => setDropDownOpen(false)} className="calc"></div>
          {/* */}
          <ul className={styles.searchInputResults}>
            {products.map((p, index) => (
              <li
                key={index}
                className={styles.searchInputResultsItems}
                onClick={() => {
                  setDropDownOpen(false);
                  setQuery(p.name);
                  navigate(`/products/product/${p._id}`);
                }}
              >
                <span>{p.name.slice(0, 1)}</span>
                <span style={{ fontWeight: 600 }}>{p.name.slice(1)}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default SearchInput;
