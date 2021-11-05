import { Sections } from "../../../models";

export type DirectoryReducerManagedState = {
  sections: Sections;
};

export type DirectoryReducerAction<
  T extends DirectoryActionTypes,
  P extends DirectoryPayloadType
> = {
  type: T;
  payload: P;
};

export type DirectoryActionTypes = "UPDATE_SECTIONS";
export type DirectoryPayloadType = Sections;

export type DirectoryReducerStateManagers = (
  prevState: DirectoryReducerManagedState,
  payload: DirectoryPayloadType
) => DirectoryReducerManagedState;
