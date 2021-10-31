import { RootState } from "..";
import { createSelector } from "reselect";

const selectCart = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart: RootState["cart"]) => cart.cartItems
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems: RootState["cart"]["cartItems"]) =>
    cartItems.reduce<number>(
      (accCount, cartItem) => accCount + cartItem.quantity,
      0
    )
);

export const selectCartOpenState = createSelector(
  [selectCart],
  (cart: RootState["cart"]) => cart.cartOpen
);
