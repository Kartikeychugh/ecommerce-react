import "./cart-dropdown.styles.scss";

import { Button } from "../../../core/ui";
import { CartItem } from "../cart-item";
import { CartItem as CartItemType } from "../../../models";
import { RootState } from "../../../core/redux";
import { connect } from "react-redux";

type CartDropdownProps = {
  cartItems: CartItemType[];
};

const CartDropdownInternal = (props: CartDropdownProps) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {props.cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export const CartDropdown = connect(mapStateToProps)(CartDropdownInternal);
