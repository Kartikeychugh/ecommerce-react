import { CollectionData, ICollectionData } from "../../../models";

export type ShopReducerManagedState = { collections: CollectionData };

export type ShopReducerAction<
  T extends ShopActionTypes,
  P extends ShopPayloadType
> = {
  type: T;
  payload: P;
};

export type ShopActionTypes = "FETCH_COLLECTIONS";
export type ShopPayloadType = ICollectionData;

export type ShopReducerStateManagers = (
  prevState: ShopReducerManagedState,
  payload: ShopPayloadType
) => ShopReducerManagedState;
