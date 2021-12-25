import { Action } from "../../../redux.types";

export const FirebaseStoreSagaActions: {
  FETCH_SECTIONS: FirebaseStoreSagaActionType;
  FETCH_COLLECTIONS: FirebaseStoreSagaActionType;
} = {
  FETCH_SECTIONS: "SAGA/FIREBASE_STORE/FETCH_SECTIONS",
  FETCH_COLLECTIONS: "SAGA/FIREBASE_STORE/FETCH_COLLECTIONS",
};

export type FirebaseStoreSagaActionType =
  | "SAGA/FIREBASE_STORE/FETCH_SECTIONS"
  | "SAGA/FIREBASE_STORE/FETCH_COLLECTIONS";

export type FirebaseStoreSagaAction<P> = Action<FirebaseStoreSagaActionType, P>;
