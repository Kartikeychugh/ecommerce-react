import { CartActions } from "./cart.actions";
import { useDispatch } from "react-redux";

export const useCartActions = () => {
  const dispatch = useDispatch();
  return CartActions(dispatch);
};
