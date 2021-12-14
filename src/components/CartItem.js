import React from "react";
import commerce from "../lib/commerce";
import { useCartDispatch } from "../context/cart";
import style from "../styles/cartItem.module.css";

const CartItem = ({ item }) => {
  const { setCart } = useCartDispatch();
  const handleUpdateCartQty = quantity => {
    commerce.cart
      .update(item.id, { quantity })
      .then(({ cart }) => setCart(cart))
      .catch(err => {
        console.error("There was an error updating the cart items", err);
      });
  };

  const handleRemoveFromCart = () => {
    commerce.cart
      .remove(item.id)
      .then(({ cart }) => setCart(cart))
      .catch(err => {
        console.error(
          "There was an error removing the item from the cart",
          err
        );
      });
  };
  return (
    <div className={style.cartItem}>
      <img className="cart-item__image" src={item.image.url} alt={item.name} />
      <div className={style.details}>
        <h4 className="cart-item__details-name">{item.name}</h4>
        <div className={style.qty}>
          <button
            type="button"
            title="Reduce quantity"
            onClick={() => handleUpdateCartQty(item.quantity - 1)}
          >
            -
          </button>
          <p>{item.quantity}</p>
          <button
            type="button"
            title="Increase quantity"
            onClick={() => handleUpdateCartQty(item.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="cart-item__details-price">
          {item.line_total.formatted_with_symbol}
        </div>
      </div>
      <button type="button" onClick={handleRemoveFromCart}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
