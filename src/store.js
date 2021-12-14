import React, { useState, useEffect, useContext } from "react";
import commerce from "./lib/commerce";
import ProductList from "./components/ProductList";
import { useCartDispatch } from "./context/cart";
import Cart from "./components/Cart";
import { cartVisibility } from "./context/cartVisibility";

function Store() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCart } = useCartDispatch();

  const fetchProducts = () => {
    commerce.products
      .list()
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("There was an error fetching the products.", err);
      });
  };

  const fetchCart = () => {
    commerce.cart
      .retrieve()
      .then(response => {
        setCart(response);
      })
      .catch(err => {
        console.error("There was an error fetching the cart", err);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <main>
      {isLoading && <div>Loading....</div>}
      {products && <ProductList products={products} />}
    </main>
  );
}

export default Store;
