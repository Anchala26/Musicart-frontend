import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import Footer from "../../components/footer/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    // console.log("Logged in");
    e.preventDefault();
    if (!email || !password) {
      console.log("Wrong");
      setErrorMessage("Please enter details");
    } else {
      try {
        const res = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        // if (res.ok) {
        //   console.log("logged in");
        //   const userData = await res.json();
        //   localStorage.setItem("username", userData.name);
        //   navigate("/");
        // }
        if (res.ok) {
          console.log("logged in");
          const { token, name } = await res.json();

          // Store the token securely in local storage
          localStorage.setItem("token", token);

          // Store the user's name in local storage
          localStorage.setItem("username", name);

          navigate("/");
        } else {
          setErrorMessage("Invalid email or password");
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("Invalid Credentials");
      }
    }
  };
  const handleClick = () => {
    navigate("/signup");
  };
  return (
    <div className={styles.loginPage}>
      {/* <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span>Musicart</span>
      </div> */}

      <Logo />
      <div>
        <div className={styles.loginForm}>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <h1>Sign in</h1>
          <div className={styles.fields}>
            <label htmlFor="email">Enter your email or mobile number</label>
            <br></br>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className={styles.fields}>
            <label htmlFor="password">Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button id={styles.btn} onClick={handleSubmit}>
            Continue
          </button>
          <p className={styles.para}>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </div>

        <div className={styles.new}>
          <p>New to Musicart?</p>
        </div>
        <div className={styles.divButton}>
          <button className={styles.signupPageBtn} onClick={handleClick}>
            Create your Musicart account
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
