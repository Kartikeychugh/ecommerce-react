import "./cart-icon.styles.scss";

import { Dispatch } from "redux";
import { ShoppingBag } from "../../../assests";
import { connect } from "react-redux";
import { toggleCart } from "../../../core/redux";

type CartIconProps = {
  toggleCart: () => void;
};

const CartIconInternal = (props: CartIconProps) => {
  return (
    <div className="cart-icon">
      <ShoppingBag
        onClick={() => props.toggleCart()}
        className="shopping-icon"
      />
      <span className="item-count">0</span>
    </div>
  );
};

export const CartIcon = connect(null, (dispatch: Dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
}))(CartIconInternal);
