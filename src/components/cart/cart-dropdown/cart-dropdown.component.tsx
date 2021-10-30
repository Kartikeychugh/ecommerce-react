import "./cart-dropdown.styles.scss";

import { Button } from "../../../core/ui";

export const CartDropdown = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};
