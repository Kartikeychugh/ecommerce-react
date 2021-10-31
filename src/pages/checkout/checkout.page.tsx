import "./checkout.styles.scss";

import { RootState, selectCartItems, selectCartTotal } from "../../core/redux";

import { CartItem } from "../../models";
import { CheckoutItem } from "../../components";
import { connect } from "react-redux";

type CheckoutPageProps = {
  cartItems: CartItem[];
  cartTotal: number;
};

const CheckoutPageInternal = (props: CheckoutPageProps) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {props.cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} item={cartItem} />
      ))}
      <div className="total">TOTAL: ${props.cartTotal}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    cartItems: selectCartItems(state),
    cartTotal: selectCartTotal(state),
  };
};

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {};
// };

export const CheckoutPage = connect(
  mapStateToProps,
  null
)(CheckoutPageInternal);
