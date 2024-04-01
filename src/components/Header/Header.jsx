import React from "react";
import styles from "./Header.module.css";
import phone from "../../assets/phone.png";
import { Link } from "react-router-dom";

export default function Header({ isLoggedIn }) {
  return (
    <div>
      {/* --for desktop mode--  */}

      <div className={styles.header}>
        <div className={styles.contactNo}>
          <img src={phone} alt="phone" id={styles.phone} />
          <p>912121131313</p>
        </div>
        <div>
          <p>Get 50% off on selected items | Shop Now</p>
        </div>
        <div className={styles.buttonStyle}>
          {isLoggedIn ? (
            <div>{/* Logout */}</div>
          ) : (
            <>
              <Link to="/login" className={styles.button}>
                Login
              </Link>
              <span> | </span>
              <Link to="/signup" className={styles.button}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
