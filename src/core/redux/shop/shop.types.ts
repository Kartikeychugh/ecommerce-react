import { CollectionData, ICollectionData } from "../../../models";

export type ShopReducerManagedState = { collections: CollectionData };

export type ShopReducerAction = {
  type: ShopActionTypes;
  payload: ShopPayloadType;
};

export type ShopActionTypes = "FETCH_COLLECTIONS";
export type ShopPayloadType = ICollectionData;

export type ShopReducerStateManagers = (
  prevState: ShopReducerManagedState,
  payload: ShopPayloadType
) => ShopReducerManagedState;
