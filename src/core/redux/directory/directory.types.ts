import { ISection } from "../../../models";

export type DirectoryReducerManagedState = { sections: ISection[] };

export type DirectoryReducerAction<
  T extends DirectoryActionTypes,
  P extends DirectoryPayloadType
> = {
  type: T;
  payload: P;
};

export type DirectoryActionTypes = "FETCH_SECTIONS";
export type DirectoryPayloadType = null;

export type DirectoryReducerStateManagers = (
  prevState: DirectoryReducerManagedState,
  payload: DirectoryPayloadType
) => DirectoryReducerManagedState;
