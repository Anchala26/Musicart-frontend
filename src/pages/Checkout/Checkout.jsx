import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [username, setUsername] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Calculate order total whenever cart items change
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setOrderTotal(total);
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/cart/view", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCartItems(response.data);
    } catch (error) {
      console.error("Error getting cart items:", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Fetch cart items
      const response = await axios.get("http://localhost:3001/api/cart/view", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const cartItems = response.data;

      // Calculate order total
      const orderTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

      // Fetch username
      const storedUsername = localStorage.getItem("username");

      // Construct the request body
      const requestBody = {
        username: storedUsername,
        address: deliveryAddress,
        payment: paymentMethod,
        productIds: cartItems.map((item) => item._id),
        orderTotal: orderTotal,
      };

      // Make the POST request to store the order in the database
      const orderResponse = await axios.post(
        "http://localhost:3001/api/checkout",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(orderResponse.data);
      navigate("/success");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/api/checkout",
  //       { address: deliveryAddress, payment: paymentMethod },
  //       {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     navigate("/success");
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //   }
  // };
  return (
    <div>
      <button>Back to cart</button>
      <h3>Checkout</h3>
      <div>
        <div>
          <div>
            1. Delivery address
            <p>{username}</p>
            <input
              id="deliveryAddress"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>
          <div>
            2. Payment method
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              Mode of payment
              <option value="Pay on Delivery">Pay on Delivery</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div>
            3.Review items and Delivery
            {cartItems.map((item) => (
              <div key={item._id}>
                <div>{item.name}</div>
                <div>Price: ₹{item.price}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button onClick={handlePlaceOrder}>Place your order</button>
          <div> Order Total: {orderTotal}</div>
          <p>
            By placing your order, you agree to Musicart privacy notice and
            conditions of use.
          </p>
        </div>
      </div>
      <div>
        <button onClick={handlePlaceOrder}>Place your order</button>
        <p>
          By placing your order, you agree to Musicart privacy notice and
          conditions of use.
        </p>
        Order Summary Items: Delivery: 45 Order Total:{orderTotal}
      </div>
    </div>
  );
}
