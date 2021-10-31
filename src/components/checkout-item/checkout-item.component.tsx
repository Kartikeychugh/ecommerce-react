import "./checkout-item.styles.scss";

import { addToCart, reduceFromCart, removeFromCart } from "../../core/redux";

import { CartItem } from "../../models";
import { Dispatch } from "redux";
import { connect } from "react-redux";

type CheckoutItemProps = {
  item: CartItem;
  addItem: (item: CartItem) => void;
  reduceFromCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
};

const CheckoutItemInternal = (props: CheckoutItemProps) => {
  const { item } = props;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={item.imageUrl} alt="item" />
      </div>
      <span className="name">{item.name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => {
            props.reduceFromCart(item);
          }}>
          {" "}
          &#10094;
        </div>
        <span className="value">{item.quantity}</span>
        <div
          className="arrow"
          onClick={() => {
            props.addItem(item);
          }}>
          {" "}
          &#10095;
        </div>
      </span>
      <span className="price">{item.price}</span>
      <div
        className="remove-button"
        onClick={() => {
          props.removeFromCart(item);
        }}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addItem: (item: CartItem) => dispatch(addToCart(item)),
    reduceFromCart: (item: CartItem) => dispatch(reduceFromCart(item)),
    removeFromCart: (item: CartItem) => dispatch(removeFromCart(item)),
  };
};

export const CheckoutItem = connect(
  null,
  mapDispatchToProps
)(CheckoutItemInternal);
