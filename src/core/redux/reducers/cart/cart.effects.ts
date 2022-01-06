import { CartActions } from "./cart.actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const [cartActions] = useState(CartActions(dispatch));
  return cartActions;
};
