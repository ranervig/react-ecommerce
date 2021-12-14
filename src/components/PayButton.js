import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useCartDispatch } from "../context/cart";
import commerce from "../lib/commerce";

const PaypalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const PayButton = ({ amount }) => {
  const navigate = useNavigate();
  const { setCart } = useCartDispatch();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(() => {
      commerce.cart
        .empty()
        .then(({ cart }) => setCart(cart))
        .catch(err => {
          console.error("There was an error emptying the cart", err);
        })
        .then(navigate("../thankyou"));
    });
  };
  return (
    <PaypalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PayButton;
