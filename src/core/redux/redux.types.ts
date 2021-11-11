import { CartReducerManagedState } from "./reducers/cart";
import { DirectoryReducerManagedState } from "./reducers/directory";
import { Dispatch } from "redux";
import { Firestore } from "@firebase/firestore";
import { ShopReducerManagedState } from "./reducers/shop";
import { UserReducerManagedState } from "./reducers/user";

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

export type ReducerThunk = (
  dispatch: Dispatch,
  getState: () => RootState,
  extraArgs: { firebaseStore: Firestore }
) => Promise<any>;
