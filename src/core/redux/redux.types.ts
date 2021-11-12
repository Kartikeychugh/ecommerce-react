import { CartReducerManagedState } from "./reducers/cart";
import { DirectoryReducerManagedState } from "./reducers/directory";
import { Dispatch } from "redux";
import { IFirebaseStoreService } from "../firebase";
import { ShopReducerManagedState } from "./reducers/shop";

export type Reducer<ReducerManagedState, ReducerAction> = (
  state: ReducerManagedState,
  action: ReducerAction
) => ReducerManagedState;

export type RootState = {
  cart: CartReducerManagedState;
  directory: DirectoryReducerManagedState;
  shop: ShopReducerManagedState;
};

export type ReducerThunk = (
  dispatch: Dispatch,
  getState: () => RootState,
  extraArgs: { firebaseStoreService: IFirebaseStoreService }
) => Promise<any>;
