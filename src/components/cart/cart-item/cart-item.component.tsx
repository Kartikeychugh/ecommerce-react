import "./cart-item.styles.scss";

import { CartItem as CartItemType } from "../../../models";

type CartItemProps = { item: CartItemType };

export const CartItem = (props: CartItemProps) => {
  return (
    <div className="cart-item">
      <img src={props.item.imageUrl} />
      <div className="item-details">
        <span className="name">{props.item.name}</span>
        <span className="price">
          {props.item.quantity} x ${props.item.price}
        </span>
      </div>
    </div>
  );
};
