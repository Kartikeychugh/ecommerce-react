import { Sections } from "../../../../models";

export type DirectoryReducerManagedState = {
  sections: Sections;
};

export type DirectoryReducerAction = {
  type: DirectoryActionTypes;
  payload?: DirectoryPayloadType;
};

export type DirectoryActionTypes = "FETCH_SECTIONS_SUCCESS";
export type DirectoryPayloadType = Sections;

export type DirectoryReducerStateManagers = (
  prevState: DirectoryReducerManagedState,
  payload?: DirectoryPayloadType
) => DirectoryReducerManagedState;
