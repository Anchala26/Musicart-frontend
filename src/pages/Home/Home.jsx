import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/Header";
import Product from "../../components/Product/Product";
import HeaderWithLogo from "../../components/Header_II/HeaderWithLogo";
import styles from "./Home.module.css";

import logo from "../../assets/header_img.png";
import grid from "../../assets/grid.png";
import list from "../../assets/list.png";
import searchIcon from "../../assets/search.png";
import axios from "axios";

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayMode, setDisplayMode] = useState("grid");
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    fetchData();
    checkLoginStatus();
  }, [search, searchParams]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products", {
        params: { ...searchParams, search },
      });
      setProducts(response.data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

  const checkLoginStatus = () => {
    const username = localStorage.getItem("username");
    if (username) setIsLoggedIn(true);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const toggleDisplayMode = (mode) => {
    setDisplayMode(mode);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  // const addToCart = (product) => {
  //   console.log("Product added");
  // };
  return (
    <div className={styles.homeContainer}>
      <div>
        <Header isLoggedIn={isLoggedIn} />

        <HeaderWithLogo isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className={styles.banner}>
          <div className={styles.offerText}>
            <h1>Grab upto 50% off on</h1>
            <h1>Selected headphones</h1>
          </div>
          <img src={logo} alt="img" id={styles.banner_img} />
        </div>
        {/* --searchbar  */}
        <div className={styles.searchBar}>
          <img src={searchIcon} id={styles.searchIcon} />
          <input
            placeholder="Search by Product Name"
            className={styles.inputBar}
            name="search"
            onChange={handleSearch}
            value={search}
          />
        </div>

        <div className={styles.features}>
          <div className={styles.logoAndFilter}>
            <img
              src={grid}
              alt="grid"
              id={styles.grid}
              onClick={() => {
                console.log("Grid icon clicked");
                toggleDisplayMode("grid");
              }}
            />
            <img
              src={list}
              alt="list"
              id={styles.list}
              onClick={() => {
                console.log("List icon clicked");
                toggleDisplayMode("list");
              }}
            />
            <div className={styles.filterMethod}>
              <div>
                <select
                  name="HeadphoneType"
                  onChange={handleFilterChange}
                  className={styles.filterProducts}
                >
                  <option>Headphone type</option>
                  <option>In-ear headphone</option>
                  <option>On-ear headphone</option>
                  <option>Over-ear headphone</option>
                </select>
              </div>
              <div>
                <select
                  name="Company"
                  onChange={handleFilterChange}
                  className={styles.filterProducts}
                >
                  <option>Company</option>
                  <option>JBL</option>
                  <option>Sony</option>
                  <option>Boat</option>
                  <option>Zebronics</option>
                  <option>Marshall</option>
                  <option>Ptron</option>
                </select>
              </div>
              <div>
                <select
                  name="color"
                  onChange={handleFilterChange}
                  className={styles.filterProducts}
                >
                  <option>Colour</option>
                  <option>Blue</option>
                  <option>Black</option>
                  <option>White</option>
                  <option>Brown</option>
                </select>
              </div>
              <div>
                <select
                  name="price"
                  onChange={handleFilterChange}
                  className={styles.filterProducts}
                >
                  <option>Price</option>
                  <option>₹0 - ₹1,000</option>
                  <option>₹1,000 - ₹10,000</option>
                  <option>₹10,000 - ₹20,000</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <select
              name="sorting"
              className={styles.sortProducts}
              onChange={handleFilterChange}
            >
              <option>Sort by</option>
              <option>Price: Lowest</option>
              <option>Price: Highest</option>
              <option>Name : (A-Z)</option>
              <option>Name : (Z-A)</option>
            </select>
          </div>
        </div>

        <div className={displayMode === "grid" ? styles.productLayout : ""}>
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              displayMode={displayMode}
              // addToCart={addToCart}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
