import React from "react";
import { useCartDispatch } from "../context/cart";
import commerce from "../lib/commerce";
import style from "../styles/product.module.css";

const ProductItem = ({ product }) => {
  const { setCart } = useCartDispatch();

  const handleAddToCart = () => {
    commerce.cart.add(product.id).then(({ cart }) => setCart(cart));
  };
  return (
    <div className={style.product_card}>
      <img src={product.image.url} alt={product.name} />
      <div>
        <h4>{product.name}</h4>
        <p>{product.description.replace(/<[^>]+>/g, "")}</p>
        <div>
          <p>{product.price.formatted_with_symbol}</p>
          <button
            name="Add to cart"
            className="product_btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
