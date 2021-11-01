import { UserReducerStateManagers } from "./cart.types";

export const toggleCart: UserReducerStateManagers = (state, payload) => {
  if (payload === null || typeof payload === "boolean") {
    if (payload === null) {
      return { ...state, cartOpen: !state.cartOpen };
    } else {
      return { ...state, cartOpen: payload };
    }
  } else {
    return { ...state };
  }
};

export const addItemToCart: UserReducerStateManagers = (state, payload) => {
  if (payload === null || typeof payload === "boolean") {
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

export const reduceFromCart: UserReducerStateManagers = (state, payload) => {
  if (payload === null || typeof payload === "boolean") {
    return { ...state };
  }

  const { cartItems } = state;
  let newCartItems = cartItems.map((cartItem) => {
    if (cartItem.id === payload.id) {
      return {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      };
    } else {
      return cartItem;
    }
  });

  newCartItems = newCartItems.filter((cartItem) => cartItem.quantity > 0);
  return { ...state, cartItems: newCartItems };
};

export const removeFromCart: UserReducerStateManagers = (state, payload) => {
  if (payload === null || typeof payload === "boolean") {
    return { ...state };
  }

  const { cartItems } = state;

  const newCartItems = cartItems.filter(
    (cartItem) => cartItem.id !== payload.id
  );

  return { ...state, cartItems: newCartItems };
};
