import { UserReducerStateManagers } from "./cart.types";

export const addItemToCart: UserReducerStateManagers = (state, payload) => {
  if (payload === null) {
    return { ...state };
  }

  const { cartItems } = state;
  const exists = cartItems.find((item) => item.id === payload.id);

  if (exists) {
    const updatedcartItems = cartItems.map((cartItem) =>
      cartItem.id === payload.id
        ? { ...payload, quantity: cartItem.quantity + 1 }
        : cartItem
    );

    return { ...state, cartItems: updatedcartItems };
  }

  return { ...state, cartItems: [...cartItems, { ...payload, quantity: 1 }] };
};
