import React from "react";
import Logo from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
// import styles from "./Success.module.css";

export default function Success() {
  return (
    <div>
      <Logo />
      <div>
        <img src="" alt="celebration" />
        <h1>Order is placed successfully</h1>
        <p>You will be receiving a confirmation email with order details</p>
        <Link to="/">
          <button>Go back to Home page</button>
        </Link>
      </div>
    </div>
  );
}
