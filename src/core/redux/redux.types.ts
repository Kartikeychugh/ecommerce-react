import { CartReducerManagedState } from "./reducers/cart";
import { DirectoryReducerManagedState } from "./reducers/directory";
import { Dispatch } from "redux";
import { IFirebaseAuthService } from "../firebase/services";
import { IFirebaseStoreService } from "../firebase";
import { IServices } from "./init/services.init";
import { ShopReducerManagedState } from "./reducers/shop";
import { UserReducerManagedState } from "./reducers/user/user.types";

export type Reducer<ReducerManagedState, ReducerAction> = (
  state: ReducerManagedState,
  action: ReducerAction
) => ReducerManagedState;

export type RootState = {
  cart: CartReducerManagedState;
  directory: DirectoryReducerManagedState;
  shop: ShopReducerManagedState;
  user: UserReducerManagedState;
};

export type ReducerThunk = (
  dispatch: Dispatch,
  getState: () => RootState,
  extraArgs: IServices
) => Promise<any>;
