import { ReducerAction } from "./cart.types";

export const toggleCart = (): ReducerAction => {
  return {
    type: "TOGGLE_CART",
    payload: {},
  };
};
