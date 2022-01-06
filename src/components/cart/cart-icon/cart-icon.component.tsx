import "./cart-icon.styles.scss";

import {
  selectCartItemCount,
  selectCartOpenState,
  useCartActions,
} from "../../../core/redux";

import { CartDropdown } from "../cart-dropdown";
import { Popup } from "../../../core/ui";
import { ShoppingBag } from "../../../assests";
import { useSelector } from "react-redux";

export const CartIcon = () => {
  const { toggleCart } = useCartActions();
  const cartOpen = useSelector(selectCartOpenState);
  const cartCount = useSelector(selectCartItemCount);

  return (
    <Popup
      open={cartOpen}
      onClose={() => toggleCart(false)}
      onClick={() => toggleCart()}
      width={240}
      content={() => <CartDropdown />}
      position="left">
      <div id="popup" className="cart-icon">
        <ShoppingBag className="shopping-icon" />
        <span className="item-count">{cartCount}</span>
      </div>
    </Popup>
  );
};
