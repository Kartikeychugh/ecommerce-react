import { CollectionData, ICollectionData } from "../../../models";

export type ShopReducerManagedState = {
  collections: CollectionData;
  isFetching: boolean;
};

export type ShopReducerAction = {
  type: ShopActionTypes;
  payload?: ShopPayloadType;
};

export type ShopActionTypes =
  | "FETCH_COLLECTIONS_START"
  | "FETCH_COLLECTIONS_SUCCESS";
export type ShopPayloadType = ICollectionData | undefined;

export type ShopReducerStateManagers = (
  prevState: ShopReducerManagedState,
  payload: ShopPayloadType
) => ShopReducerManagedState;
