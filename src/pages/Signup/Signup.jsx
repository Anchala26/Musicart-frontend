import React, { useState } from "react";
import styles from "./Signup.module.css";
import logo from "../../assets/logo.png";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { name, email, mobile, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        // Successful signup
        console.log("User registered successfully");
        localStorage.setItem("username", data.username);
        navigate("/");
      } else {
        // Failed signup

        console.error("Signup failed:");
        setErrorMessage("Please enter all the fields");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Something went wrong, Please try again");
    }
  };

  return (
    <div className={styles.signupPage}>
      <Logo />
      <div className={styles.signupForm}>
        <h1>Create Account</h1>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <label htmlFor="name">Your name</label>
            <br></br>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            ></input>
          </div>
          <div className={styles.fields}>
            <label htmlFor="number">Mobile number</label>
            <br></br>
            <input
              type="number"
              name="mobile"
              value={mobile}
              onChange={handleChange}
            ></input>
          </div>
          <div className={styles.fields}>
            <label htmlFor="email">Email Id</label>
            <br></br>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            ></input>
          </div>
          <div className={styles.fields}>
            <label htmlFor="password">Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            ></input>
          </div>
          <p id={styles.text}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply.
          </p>
          <button id={styles.btn} onClick={handleSubmit}>
            Continue
          </button>
        </form>
        <p className={styles.para} type="submit">
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </div>
      <p>
        Already have an account? <Link to="/login">Signup</Link>
      </p>
      <Footer />
    </div>
  );
}
