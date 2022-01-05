import "./cart-icon.styles.scss";

import {
  RootState,
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
  const cartOpen = useSelector((state: RootState) =>
    selectCartOpenState(state)
  );
  const cartCount = useSelector((state: RootState) =>
    selectCartItemCount(state)
  );
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
