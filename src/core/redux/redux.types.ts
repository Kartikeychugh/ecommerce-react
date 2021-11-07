import { CartReducerManagedState } from "./cart";
import { DirectoryReducerManagedState } from "./directory";
import { ShopReducerManagedState } from "./shop";
import { UserReducerManagedState } from "./user";

export type Reducer<ReducerManagedState, ReducerAction> = (
  state: ReducerManagedState,
  action: ReducerAction
) => ReducerManagedState;

export type RootState = {
  user: UserReducerManagedState;
  cart: CartReducerManagedState;
  directory: DirectoryReducerManagedState;
  shop: ShopReducerManagedState;
};
