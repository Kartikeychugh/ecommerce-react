import { CartReducerManagedState } from "./cart";
import { DirectoryReducerManagedState } from "./directory";
import { Dispatch } from "redux";
import { FirebaseApp } from "firebase/app";
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

export type ReducerThunk = (
  dispatch: Dispatch,
  getState: () => RootState,
  extraArguments: {
    firebase_app: FirebaseApp;
  }
) => Promise<any>;
