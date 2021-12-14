import { useEffect, useState } from "react";
import { useCartState } from "../context/cart";
import commerce from "../lib/commerce";
import PayButton from "./PayButton";

const Checkout = () => {
  const [checkoutToken, setCheckoutToken] = useState();
  const cart = useCartState();

  const generateCheckoutToken = () => {
    if (cart.line_items.length) {
      commerce.checkout
        .generateToken(cart.id, { type: "cart" })
        .then(token => {
          setCheckoutToken(token);
        })
        .catch(err => {
          console.error("There was an error in generating a token", err);
        });
    }
  };

  const getPaypalButton = async () => {
    try {
      const paypalAuth = await commerce.checkout.capture(checkoutToken.id, {
        payment: {
          gateway: "paypal",
          paypal: {
            action: "authorize",
          },
        },
      });
      renderPaypalButton(paypalAuth);
      return;
    } catch (err) {
      console.error("There was an error sending to paypal");
      alert(err.message);
      return;
    }
  };

  const renderPaypalButton = () => {
    window.paypal.Button.render(
      {
        env: "sandbox",
        commit: true,
        payment: function () {},
        onAuthorize: function (data, actions) {
          //   captureOrder(data);
          alert("Payment Processed");
        },
        onCancel: function (data, actions) {},
      },
      "#paypal-button-container"
    );
  };

  const captureOrder = async data => {
    console.log(data);
    try {
      const order = await commerce.checkout.capture(checkoutToken, {
        payment: {
          gateway: "paypal",
          paypal: {
            action: "capture",
            payment_id: data.payment_id,
            payer_id: data.payer_id,
          },
        },
      });
      console.log(order);
      return;
    } catch (err) {
      console.error("There was an error completing checkout.", err);
      alert(err.message);
      return;
    }
  };

  useEffect(() => {
    generateCheckoutToken();
  }, []);

  return (
    <main>
      <h1>Checkout</h1>
      {/* <button onClick={getPaypalButton}>Checkout with Paypal</button> */}
      {cart.line_items && <PayButton amount={cart.subtotal.formatted} />}
    </main>
  );
};

export default Checkout;
