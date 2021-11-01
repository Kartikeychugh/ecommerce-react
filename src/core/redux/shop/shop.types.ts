import { ICollectionData } from "../../../models";

export type ShopReducerManagedState = { items: ICollectionData[] };

export type ShopReducerAction<
  T extends ShopActionTypes,
  P extends ShopPayloadType
> = {
  type: T;
  payload: P;
};

export type ShopActionTypes = "";
export type ShopPayloadType = null;

export type ShopReducerStateManagers = (
  prevState: ShopReducerManagedState,
  payload: ShopPayloadType
) => ShopReducerManagedState;
