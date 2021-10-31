import "./checkout-item.styles.scss";

import { CartItem } from "../../models";
import { Dispatch } from "redux";
import { addToCart } from "../../core/redux";
import { connect } from "react-redux";

type CheckoutItemProps = {
  item: CartItem;
  addItem: (item: CartItem) => void;
};

const CheckoutItemInternal = (props: CheckoutItemProps) => {
  const { item } = props;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={item.imageUrl} alt="item" />
      </div>
      <span className="name">{item.name}</span>
      <span className="quantity">{item.quantity}</span>
      <span className="price">{item.price}</span>
      <div className="remove-button">&#10005;</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addItem: (item: CartItem) => dispatch(addToCart(item)),
  };
};

export const CheckoutItem = connect(
  null,
  mapDispatchToProps
)(CheckoutItemInternal);
