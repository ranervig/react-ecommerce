import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartVisibility } from "../context/cartVisibility";
import { useCartState } from "../context/cart";
import style from "../styles/nav.module.css";

const Nav = () => {
  const cart = useCartState();
  const { isCartVisible, setIsCartVisible } = useContext(cartVisibility);
  const handleToggle = event => setIsCartVisible(!isCartVisible);
  return (
    <nav className={style.header}>
      <Link to="/">
        <h1>Astro Supply</h1>
      </Link>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="store">Store</Link>
        </li>
        <li>
          <button onClick={handleToggle}>
            Cart
            <span className={style.count}>{cart.total_items}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
