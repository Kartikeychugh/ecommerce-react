import { Sections } from "../../../models";

export type DirectoryReducerManagedState = {
  sections: Sections;
  isFetching: boolean;
};

export type DirectoryReducerAction = {
  type: DirectoryActionTypes;
  payload?: DirectoryPayloadType;
};

export type DirectoryActionTypes =
  | "UPDATE_SECTIONS"
  | "FETCH_SECTIONS_START"
  | "FETCH_SECTIONS_SUCCESS";
export type DirectoryPayloadType = Sections;

export type DirectoryReducerStateManagers = (
  prevState: DirectoryReducerManagedState,
  payload?: DirectoryPayloadType
) => DirectoryReducerManagedState;
