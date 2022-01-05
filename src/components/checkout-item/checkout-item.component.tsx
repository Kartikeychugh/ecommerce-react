import "./checkout-item.styles.scss";

import { CartItem } from "../../models";
import { useCartActions } from "../../core/redux";

type CheckoutItemProps = {
  item: CartItem;
};

export const CheckoutItem = (props: CheckoutItemProps) => {
  const { item } = props;
  const { addToCart, reduceFromCart, removeFromCart } = useCartActions();

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
            reduceFromCart(item);
          }}>
          {" "}
          &#10094;
        </div>
        <span className="value">{item.quantity}</span>
        <div
          className="arrow"
          onClick={() => {
            addToCart(item);
          }}>
          {" "}
          &#10095;
        </div>
      </span>
      <span className="price">{item.price}</span>
      <div
        className="remove-button"
        onClick={() => {
          removeFromCart(item);
        }}>
        &#10005;
      </div>
    </div>
  );
};
