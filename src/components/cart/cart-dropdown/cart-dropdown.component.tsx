import "./cart-dropdown.styles.scss";

import { selectCartItems, useCartActions } from "../../../core/redux";

import { Button } from "../../../core/ui";
import { CartItem } from "../cart-item";
import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const CartDropdown = () => {
  const history = useHistory();
  const cartItems = useSelector(selectCartItems);
  const { toggleCart } = useCartActions();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Ek paisa nahi kharcha tune.</span>
        )}
      </div>
      <Button
        onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          toggleCart();
          history.push("/checkout");
        }}>
        GO TO CHECKOUT
      </Button>
    </div>
  );
};
