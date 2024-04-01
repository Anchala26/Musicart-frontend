import React, { useState, useEffect } from "react";
import styles from "./Headerwithlogo.module.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import cart from "../../assets/cart.png";

export default function HeaderWithLogo({ isLoggedIn, setIsLoggedIn }) {
  const [userInitials, setUserInitials] = useState("");
  const [fullName, setFullName] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      // Extract initials from the username
      const initials = storedUsername
        .split(" ")
        .map((namePart) => namePart.charAt(0))
        .join("")
        .toUpperCase();
      setUserInitials(initials);
      setFullName(storedUsername);
    }
  }, []);

  const handleInitialsClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={styles.headerBar}>
      <div className={styles.leftContain}>
        <Logo />
        <div className={styles.links}>
          <Link to="/" className={styles.homeButton}>
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/invoice" className={styles.invoiceButton}>
              Invoice
            </Link>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <div className={styles.rightContain}>
          <Link to="/viewcart" className={styles.viewCart}>
            <img src={cart} alt="cart" id={styles.cartLogo} />
            View Cart 0
          </Link>
          <div>
            <button id={styles.userLogo} onClick={handleInitialsClick}>
              {userInitials}
            </button>
            {showOptions && (
              <div className={styles.logoOptions}>
                <p className={styles.fullname}>{fullName}</p>
                <div onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
