import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/cart";
import "./index.css";
import App from "./app";
import About from "./about";
import Store from "./store";
import Home from "./home";
import Checkout from "./components/Checkout";
import ThankYou from "./components/ThankYou";

ReactDOM.render(
  <CartProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Store />} />
          <Route path="about" element={<About />} />
          <Route path="store" element={<Store />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="thankyou" element={<ThankYou />} />
        </Route>
      </Routes>
    </HashRouter>
  </CartProvider>,
  document.getElementById("root")
);
