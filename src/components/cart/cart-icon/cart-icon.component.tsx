import "./cart-icon.styles.scss";

import {
  RootState,
  selectCartItemCount,
  selectCartOpenState,
  toggleCart,
} from "../../../core/redux";

import { CartDropdown } from "../cart-dropdown";
import { Dispatch } from "redux";
import { Popup } from "../../../core/ui";
import { ShoppingBag } from "../../../assests";
import { connect } from "react-redux";

type CartIconProps = {
  toggleCart: (cartOpen?: boolean) => void;
  cartCount: number;
  cartOpen: boolean;
};

const CartIconInternal = (props: CartIconProps) => (
  <Popup
    open={props.cartOpen}
    onClose={() => props.toggleCart(false)}
    onClick={() => props.toggleCart()}
    width={240}
    content={() => <CartDropdown />}
    position="left">
    <div id="popup" className="cart-icon">
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">{props.cartCount}</span>
    </div>
  </Popup>
);

const mapStateToProps = (state: RootState) => ({
  cartCount: selectCartItemCount(state),
  cartOpen: selectCartOpenState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCart: (cartOpen?: boolean) => dispatch(toggleCart(cartOpen)),
});

export const CartIcon = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIconInternal);
