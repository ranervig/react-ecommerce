import React, { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { cartVisibility } from "./context/cartVisibility";
import Cart from "./components/Cart";
const App = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const value = useMemo(
    () => ({ isCartVisible, setIsCartVisible }),
    [isCartVisible]
  );
  return (
    <cartVisibility.Provider value={value}>
      <Nav />
      <Outlet />
      {isCartVisible && <Cart />}
      <Footer />
    </cartVisibility.Provider>
  );
};

export default App;
