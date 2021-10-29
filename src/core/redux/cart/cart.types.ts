export type ReducerManagedState = { cartOpen: boolean };
export type ReducerAction = {
  type: "TOGGLE_CART";
  payload: Partial<ReducerManagedState>;
};
