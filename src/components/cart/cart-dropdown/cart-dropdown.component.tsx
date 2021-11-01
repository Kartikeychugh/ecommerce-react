import "./cart-dropdown.styles.scss";

import { RootState, selectCartItems, toggleCart } from "../../../core/redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Button } from "../../../core/ui";
import { CartItem } from "../cart-item";
import { CartItem as CartItemType } from "../../../models";
import { Dispatch } from "redux";
import React from "react";
import { connect } from "react-redux";

type CartDropdownProps = {
  cartItems: CartItemType[];
  toggleCart: (cartOpen?: boolean) => void;
} & RouteComponentProps;

const CartDropdownInternal = (props: CartDropdownProps) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {props.cartItems.length ? (
        props.cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Ek paisa nahi kharcha tune.</span>
      )}
      {}
    </div>
    <Button
      onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        props.toggleCart();
        props.history.push("/checkout");
      }}>
      GO TO CHECKOUT
    </Button>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleCart: (cartOpen?: boolean) => dispatch(toggleCart(cartOpen)),
  };
};

export const CartDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartDropdownInternal));
