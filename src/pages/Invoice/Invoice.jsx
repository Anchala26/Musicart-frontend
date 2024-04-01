import React from "react";
import Header from "../../components/Header/Header";
import HeaderWithLogo from "../../components/Header_II/HeaderWithLogo";
import { useNavigate, Navigate } from "react-router-dom";

export default function Invoice() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/");
  };
  return (
    <div>
      <Header />
      <HeaderWithLogo />
      <button onClick={handleBackClick}>Back to Home</button>
    </div>
  );
}
