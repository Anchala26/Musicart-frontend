import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import "./App.css";
import ViewCart from "./pages/ViewCart/ViewCart";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/Successful/Success";
import Invoice from "./pages/Invoice/Invoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
