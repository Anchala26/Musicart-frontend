import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import HeaderWithLogo from "../../components/Header_II/HeaderWithLogo";
import { useNavigate } from "react-router-dom";
import styles from "./ViewCart.module.css";
// view cart page
export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/cart/view", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCartItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error getting products", error);
    }
  };
  return (
    <div>
      <Header />
      <HeaderWithLogo />
      <button onClick={handleClick}>Back to products</button>
      <div>
        <img />
        <h2>My Cart</h2>
      </div>
      <div className={styles.layout}>
        <div>
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className={styles.productDetails}>
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.productImg}
                  />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>Colour : {item.colour}</p>
                  <p>{item.availability}</p>
                </div>
                <div>
                  <h4>Price</h4> ₹{item.price}
                </div>
                <div>
                  <select>
                    {Array.from({ length: 9 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>Total: ₹{item.price}</div>
              </div>
            ))}
          </div>
          <div className={styles.itemsPrice}>
            <div> {cartItems.length} Item</div>
            <div>
              ₹{cartItems.reduce((total, item) => total + item.price * 1, 0)}
            </div>
          </div>
        </div>
        <div>
          <h4> PRICE DETAILS</h4>
          <p>
            <span>Total MRP</span>
            <span>
              {cartItems.reduce((total, item) => total + item.price, 0)}
            </span>
          </p>
          <p>
            <span>Discount on MRP</span>
            <span>0</span>
          </p>
          <p>
            <span>Convenience Fee</span>
            <span>45</span>
          </p>
          <p>
            <span> Total Amount </span>
            <span>
              {cartItems.reduce((total, item) => 45 + total + item.price, 0)}
            </span>
          </p>
          <button> PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
}
