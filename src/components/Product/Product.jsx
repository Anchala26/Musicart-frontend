import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Product.module.css";
import cart from "../../assets/addcart.png";
import axios from "axios";

export default function Product({ product, displayMode }) {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [productId, setPRoductId] = useState("");

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

  // const handleAddtoCart = async () => {
  //   try {
  //     if (!userId) {
  //       console.error("User ID not set");
  //       return;
  //     }
  //     if (!product._id) {
  //       console.error("Product ID not set");
  //       return;
  //     }
  //     const response = await fetch("http://localhost:3001/api/cart/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: userId,
  //         productId: product._id,
  //         quantity: quantity,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log("Response from server", data);
  //     console.log(data.message);
  //   } catch (error) {
  //     console.error("Error adding to cart", error);
  //   }
  // };

  if (displayMode === "list") {
    return (
      <div className={styles.listItem}>
        <div className={styles.imgDiv}>
          <img src={product.image} alt="img" className={styles.productImg} />

          <img
            src={cart}
            alt="cart"
            className={styles.cartIcon}
            onClick={handleAddtoCart}
          />
        </div>
        <div className={styles.productDetail}>
          <h4 className={styles.name}>{product.name}</h4>
          <p className={styles.price}>Price- Rs. {product.price}</p>
          <span>{product.colour}</span>
          <span>|</span>
          <span>{product.type}</span>
          <p className={styles.overview}>{product.overview}</p>
          <button
            className={styles.detailButton}
            onClick={() => navigate(`/details/${product._id}`)}
          >
            Details
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={styles.gridItem}
      key={product._id}
      onClick={() => navigate(`/details/${product._id}`)}
    >
      <div className={styles.gridImgDiv}>
        <img src={product.image} alt="img" className={styles.productImg} />
        <img
          src={cart}
          alt="cart"
          className={styles.gridCart}
          onClick={handleAddtoCart}
        />
      </div>
      <div className={styles.gridInfoProduct}>
        <h4 className={styles.name}>{product.name}</h4>
        <p className={styles.price}>Price-₹{product.price}</p>
        <span>{product.colour}</span>
        <span>|</span>
        <span>{product.type}</span>
      </div>
    </div>
  );
}
