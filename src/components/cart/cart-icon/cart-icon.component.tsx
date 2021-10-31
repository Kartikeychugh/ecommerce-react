import "./cart-icon.styles.scss";

import {
  RootState,
  selectCartItemCount,
  selectCartOpenState,
  toggleCart,
} from "../../../core/redux";

import { CartDropdown } from "../cart-dropdown";
import { Dispatch } from "redux";
import { Popup } from "../../../core/ui/popup/popup.component";
import React from "react";
import { ShoppingBag } from "../../../assests";
import { connect } from "react-redux";

type CartIconProps = {
  toggleCart: () => void;
  cartCount: number;
  cartOpen: boolean;
};

const CartIconContentInternal = (props: CartIconProps) => (
  <div id="popup" className="cart-icon">
    <ShoppingBag className="shopping-icon" />
    <span className="item-count">{props.cartCount}</span>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  cartCount: selectCartItemCount(state),
  cartOpen: selectCartOpenState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
});

const CartIconContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIconContentInternal);

export const CartIcon = () => (
  <Popup content={() => <CartDropdown />} position="right">
    <CartIconContent />
  </Popup>
);
