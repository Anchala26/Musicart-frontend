import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import HeaderWithLogo from "../Header_II/HeaderWithLogo";
import styles from "./ProductDetails.module.css";
import Footer from "../footer/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(""); // State for userId
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${id}`);

      setProduct(response.data);
    } catch (err) {
      console.log("error fetching data", err);
    }
  };
  const handleAddtoCart = async () => {
    try {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem("token");
      console.log("Token", token);
      if (!token) {
        throw new Error("JWT token not found");
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      console.log("Request Headers:", headers);
      const response = await axios.post(
        "http://localhost:3001/api/cart/add",
        {
          productId: product._id,
          quantity,
        },
        { headers }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkLoginStatus = () => {
    const username = localStorage.getItem("username");
    if (username) setIsLoggedIn(true);
  };

  // Log the product object and its properties for debugging
  // console.log("Product:", product);
  // console.log("Product name:", product.name);

  if (!product) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className={styles.ProductDetailContainer}>
      <div>
        <Header isLoggedIn={isLoggedIn} />
        <HeaderWithLogo isLoggedIn={isLoggedIn} />

        <div className={styles.DetailPage}>
          <button onClick={() => navigate("/")} className={styles.backButton}>
            Back to products
          </button>
          <div>
            <div className={styles.overview}>{product.overview}</div>
            <div className={styles.pageLayout}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.imgProduct}
              />
              <div className={styles.details}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.review}>
                  ⭐⭐⭐⭐⭐(50 Customer reviews)
                </div>
                <div className={styles.price}>Price - ₹ {product.price}</div>
                <div className={styles.colour}>
                  {product.colour}
                  <span className={styles.seprate}>|</span>
                  {product.type}
                </div>
                <div className={styles.desc}>
                  About this item<br></br>{" "}
                  <span className={styles.seprate}></span>*{product.description}
                </div>
                <div className={styles.available}>
                  <span className={styles.label}>Available -</span>{" "}
                  {product.availability}
                </div>
                <div className={styles.brand}>
                  <span className={styles.label}>Brand -</span> {product.brand}
                </div>
                <div>
                  <button className={styles.cartBtn} onClick={handleAddtoCart}>
                    Add to cart
                  </button>
                  <br></br>
                  <button className={styles.buyBtn}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
