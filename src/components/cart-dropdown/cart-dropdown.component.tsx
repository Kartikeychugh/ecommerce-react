import { Button } from "../../core/ui";
import "./cart-dropdown.styles.scss";

export const CartDropdown = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};
