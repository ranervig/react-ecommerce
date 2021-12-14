import { useContext } from "react";
import CartItem from "./CartItem";
import { useCartState, useCartDispatch } from "../context/cart";
import commerce from "../lib/commerce";
import style from "../styles/cart.module.css";
import { cartVisibility } from "../context/cartVisibility";
import { Link } from "react-router-dom";

const Cart = () => {
  const { isCartVisible, setIsCartVisible } = useContext(cartVisibility);
  const handleToggle = event => setIsCartVisible(!isCartVisible);
  const cart = useCartState();
  const { setCart } = useCartDispatch();
  const handleEmptyCart = () => {
    commerce.cart
      .empty()
      .then(({ cart }) => setCart(cart))
      .catch(err => {
        console.error("There was an error emptying the cart", err);
      });
  };
  const renderEmptyCart = () => {
    if (cart.total_unique_items === 0) {
      return (
        <p className="cart_none">
          You have no items in your shopping cart, start adding some!
        </p>
      );
    }
  };

  const renderCart = () => {
    if (cart.total_unique_items > 0) {
      return (
        <>
          {cart.line_items.map(lineItem => (
            <CartItem item={lineItem} key={lineItem.id} />
          ))}
          <button className={style.empty} onClick={handleEmptyCart}>
            Empty Cart
          </button>
          <div className="cart_total">
            <p className="cart_total-title">Subtotal:</p>
            <p className="cart_total-price">
              {cart.subtotal.formatted_with_symbol}
            </p>
          </div>
          <Link to="/checkout">
            <button onClick={handleToggle}>Checkout</button>
          </Link>
        </>
      );
    }
  };

  return (
    <div className={style.cart}>
      <h4 className={style.head}>
        Your Shopping Cart<button onClick={handleToggle}>X</button>
      </h4>

      {renderEmptyCart()}
      {renderCart()}
    </div>
  );
};

export default Cart;
